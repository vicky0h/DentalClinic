const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const moment = require("moment");

const User = require("./models/User");
const Dentist = require("./models/Dentist");
const Booking = require("./models/Booking");
const bookingModel = require("./models/Booking");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bookingapp";

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:5173",
    origin: "https://dentalclinic-booking.netlify.app",
  })
);

mongoose.connect(process.env.MONGO_URI);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      resolve(userData);
      console.log(userData);
    });
  });
}

app.get("/", (req, res) => {
  res.json("test ok");
});

// USER SECTION (i.e. login, logout, register)

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name,
        },
        jwtSecret,
        {},
        (error, token) => {
          if (error) {
            throw error;
          }
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Wrong password.");
      return;
    }
  } else {
    res.json("username not found");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

// PHOTO SECTION

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json("uploads/" + newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath);
  }
  res.json(uploadedFiles);
});

// DENTIST SECTION

app.post("/dentists", (req, res) => {
  const { token } = req.cookies;
  const { dentist, location, profilePhotos, description, services, timings } =
    req.body;
  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const dentistDoc = await Dentist.create({
      owner: userData.id,
      dentist,
      location,
      photos: profilePhotos,
      description,
      services,
      timings,
    });
    res.json(dentistDoc);
  });
});

app.put("/dentists", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    dentist,
    location,
    profilePhotos,
    description,
    services,
    timings,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const dentistDoc = await Dentist.findById(id);
    if (userData.id === dentistDoc.owner.toString()) {
      dentistDoc.set({
        dentist,
        location,
        photos: profilePhotos,
        description,
        services,
        timings,
      });
      await dentistDoc.save();
      res.json("dentist profile updated successfully");
    }
  });
});

app.get("/dentists/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Dentist.findById(id));
});

app.get("/admin-dentists", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    res.json(await Dentist.find({ owner: userData.id }));
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "error while fetching dentist profiles",
        error,
      });
  }
});

app.delete("/delete-dentist/:id", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { id } = req.params;
  res.json(
    await Dentist.deleteOne({ _id: id, owner: userData.id })
      .then(function () {
        console.log("Dentist profile deleted successfully");
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while deleting dentist profiles",
          error,
        });
      })
  );
});

app.get("/all-dentists", async (req, res) => {
  res.json(await Dentist.find());
});

// GET SINGLE DENTIST PER ID
app.get("/dentist/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Dentist.find({ _id: id }));
});

// BOOKING SECTION
// BOOK APPOINTMENT
app.post("/book-appointment", async (req, res) => {
  req.body.date = moment(req.body.date).format("YYYY-MM-DD");
  req.body.time = moment(req.body.time, "HH:mm").format("HH:mm");
  const userData = await getUserDataFromReq(req);
  const {
    dentistId,
    dentistInfo,
    date,
    time,
    service,
    location,
    name,
    phone,
    email,
  } = req.body;

  const appointments = await bookingModel.find({
    dentistId,
    date: date,
    time: time,
  });

  try {
    if (appointments.length > 0) {
      res.status(500).send({
        success: false,
        message: "Error while booking appointment",
      });
    }
    const newAppointment = new bookingModel({
      dentistId,
      dentistInfo,
      name,
      email,
      phone,
      date,
      time,
      service,
      location,
      user: userData.id,
      userEmail: userData.email,
    });
    await newAppointment.save();
    console.log("Appointment booked successfully.");
    res.status(200).send({
      success: true,
      message: "Appointment booked successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking appointment",
    });
    throw error;
  }
});


// CHECK AVAILABILITY
app.post("/booking-availability", async (req, res) => {
  try {
    const date = moment(req.body.date).format("YYYY-MM-DD");
    const fromTime = moment(req.body.time, "HH:mm").format("HH:mm");
    const toTime = moment(req.body.time, "HH:mm")
      .add(1, "hours")
      .format("HH:mm");
    const dentistId = req.body.dentistId;

    const curr = Date.now();
    const currDate = moment(curr).format("YYYY-MM-DD");
    const currTime = moment(curr).format("HH:mm");
    // TO ENSURE THE TIMESLOT IS VALID (CURRENT TIME MUST BE AFTER THE FROM TIME)
    if (currDate == date) {
      if (currTime >= fromTime || currTime >= toTime) {
        return res.status(201).send({
          message:
            "Appointment is not available, please try another date / timeslot",
          success: true,
        });
      }
    }
    const appointments = await bookingModel.find({
      dentistId,
      date: date,
      time: fromTime,
    });

    if (appointments.length > 0) {
      return res.status(201).send({
        message:
          "Appointment is not available at this time, please try another date / timeslot",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointment is available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in checking availability",
    });
  }
});

// GET ALL BOOKINGS CREATED BY USER
app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }));
});

// GET ALL BOOKINGS (ADMIN ONLY)
app.get("/all-bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    if (userData.email != "admin@email.com") {
      res.status(500).send({
        success: false,
        message: "You do not have the authorization.",
      });
      return;
    }
    res.json(await Booking.find().populate("dentistId"));
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error while fetching bookings",
        error,
      });
  }
});

// DELETE BOOKING PER ID
app.delete("/delete-booking/:id", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { id } = req.params;

  const curr = Date.now();
  const comparedDate = moment(curr).add(48, "hours").format("YYYY-MM-DD");

  const appointment = await bookingModel.findById({ _id: id });

  if (appointment.date < comparedDate) {
    res.status(204).send({
      success: false,
      message:
        "Free cancellation upto 2 days before the scheduled time. Please contact the clinic for more inforamtion.",
    });
    return;
  } else {
    res.json(
      // USER CAN ONLY DELETE APPOINT CREATED BY HIMSELF / HERSELF
      await Booking.deleteOne({ _id: id, user: userData.id })
        .then(function () {
          console.log("Booking (id:" + id + ") deleted successfully");
          res.send({
            success: true,
            message: "Booking (id:" + id + ") deleted successfully",
          })
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error while deleting booking",
            error,
          });
        })
    );
  }
});

// DELETE BOOKING (ADMIN ONLY)
app.delete("/admin-delete-booking/:id", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  // TO ENSURE ONLY THE ADMIN HAS THE AUTHORIZATION TO DELETE ALL BOOKINGS
  if (userData.email != "admin@email.com") {
    res.status(204).send({
      success: false,
      message: "You do not have the authorization.",
    });
    return;
  }
  const { id } = req.params;
  try {
    const appointment = await bookingModel.deleteOne({ _id: id });
    res.status(203).send({
      success: true,
      message: "Appointment (" + id + ") deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting the appointment",
      error,
    });
  }
});

app.listen(4000);
