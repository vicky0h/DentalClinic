import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import Services from "../Services";
import PhotoUploader from "../PhotoUploader";
import Availability from "../Availability";

export default function ServicesFormPage() {
  const { id } = useParams();

  const [dentist, setDentist] = useState("");
  const [location, setLocation] = useState("");
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);
  const [timings, setTimings] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [timingOk, setTimingOk] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get("/dentists/" + id).then((response) => {
      const { data } = response;
      setDentist(data.dentist);
      setLocation(data.location);
      setProfilePhotos(data.photos);
      setDescription(data.description);
      setServices(data.services);
      setTimings(data.timings);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4 text-sky-500">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveDentist(event) {
    event.preventDefault();
    const dentistData = {
      dentist,
      location,
      profilePhotos,
      description,
      services,
      timings,
    };

    if (
      !dentist ||
      !location ||
      !profilePhotos ||
      profilePhotos.length == 0 ||
      !description ||
      !services ||
      services.length == 0 ||
      !timings ||
      timings.length == 0
    ) {
      alert("All fields are required, please check your input.");
      return;
    } else if (!timingOk) {
      alert("Please click on [OK] to confirm the availability.");
      return;
    }

    try {
      if (id) {
        await axios.put("/dentists", { id, ...dentistData });
        setRedirect(true);
        console.log("profile updated successfully");
      } else {
        await axios.post("/dentists", dentistData);
        setRedirect(true);
        console.log("profile created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/dentists"} />;
  }

  return (
    <div className="flex flex-col items-center">
      <AccountNav/>
      <form
        className="flex flex-col items-center md:w-[800px] lg:w-[1000px]"
        onSubmit={saveDentist}
      >
        <div className="w-[808px]">
          {preInput("Dentist Name", "Dentist first name and last name")}
          <input
            type="text"
            value={dentist}
            placeholder="Dr. John Doe"
            onChange={(event) => setDentist(event.target.value)}
          />
        </div>
        <div className="w-[808px]">
          {preInput("Location", "Location of dental services provided")}
          <input
            type="text"
            value={location}
            placeholder="Toronto"
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        <div className="w-[808px]">
          {preInput("Photo", "Dentist profile photo")}
          <PhotoUploader
            profilePhotos={profilePhotos}
            id={id}
            onChange={setProfilePhotos}
          />
        </div>
        <div>
          {preInput(
            "Professional Information",
            "Professional information about the dentist"
          )}
          <textarea
            className="w-[808px]"
            value={description}
            placeholder="Doctor Doe is specialized in..."
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="w-[808px]">
          {preInput("Services", "Services provided by the dentist")}
          <Services selected={services} onChange={setServices} />
        </div>
        <div className="w-[808px]">
          {preInput("Availability", "Working hours (e.g. 9:00 - 17:00)")}
          <Availability
            start={timings[0]}
            end={timings[timings.length - 1]}
            timings={timings}
            onChange={setTimings}
            timingOk={timingOk}
            setTimingOk={setTimingOk}
          />
        </div>
        <button className="my-5 max-w-xs">Submit</button>
      </form>
    </div>
  );
}
