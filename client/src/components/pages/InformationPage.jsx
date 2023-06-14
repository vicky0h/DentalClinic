import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Footer from "../Footer";
import { Navigate } from "react-router-dom";

export default function InformationPage() {
  const {
    user,
    selectedTimeSlot,
    selectedDate,
    selectedLocation,
    selectedService,
    selectedDentist,
    selectedAvailable,
  } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectBooking, setRedirectBooking] = useState("");

  const backLink = "/dateandtime";
  const nextLink = "/staff";

  if (user.email != "admin@email.com") {
    useEffect(() => {
      setName(user.name);
      setEmail(user.email);
    }, []);
  }
  const handleBooking = async () => {
    if (!user) {
      if (confirm("Please log in first before booking")) {
        setRedirect(true);
      }
      return;
    }

    if (
      !selectedDentist ||
      !selectedLocation ||
      !selectedService ||
      !selectedDate ||
      !selectedTimeSlot ||
      !name ||
      !email ||
      !phone
    ) {
      return alert(
        "All fields are required. Please click 'BACK' button to update."
      );
    }

    if (!selectedAvailable) {
      return alert(
        "Selected date and time slot are not available, please try another date / time slot."
      );
    } else {
      const res = axios
        .post("/book-appointment", {
          dentistId: selectedDentist._id,
          dentistInfo: selectedDentist.dentist,
          name,
          email,
          phone: phone,
          date: selectedDate,
          time: selectedTimeSlot,
          service: selectedService,
          location: selectedLocation,
        })
        .then(function () {
          alert("Appointment booked successfully.");
        })
        .catch(function (error) {
          alert(error);
        });
    }
    setRedirectBooking("/account/bookings");
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirectBooking) {
    return <Navigate to={redirectBooking} />;
  }

  return (
    <div className="mx-auto">
      <h1 className="relative text-xl mt-8 flex gap-2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
        >
          <path
            d="M14 11.0001V4.00006L1 4.00006L1 11.0001H14ZM15 4.00006V11.0001C15 11.5523 14.5523 12.0001 14 12.0001H1C0.447715 12.0001 0 11.5523 0 11.0001V4.00006C0 3.44778 0.447715 3.00006 1 3.00006H14C14.5523 3.00006 15 3.44778 15 4.00006ZM2 5.25C2 5.11193 2.11193 5 2.25 5H5.75C5.88807 5 6 5.11193 6 5.25V9.75C6 9.88807 5.88807 10 5.75 10H2.25C2.11193 10 2 9.88807 2 9.75V5.25ZM7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H7.5ZM7 9.5C7 9.22386 7.22386 9 7.5 9H12.5C12.7761 9 13 9.22386 13 9.5C13 9.77614 12.7761 10 12.5 10H7.5C7.22386 10 7 9.77614 7 9.5ZM7.5 5C7.22386 5 7 5.22386 7 5.5C7 5.77614 7.22386 6 7.5 6H11.5C11.7761 6 12 5.77614 12 5.5C12 5.22386 11.7761 5 11.5 5H7.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        Please update your contact information:
        <div className="absolute flex-col top-4 right-10 gap-1 text-sky-500 bold text-sm inline-flex"></div>
      </h1>
      <hr />
      <br />
      <div className="w-[600px] border mb-8 bg-gray-100 flex gap-2 p-3">
        <div className="w-1/2 text-sky-500 bg-white rounded-lg border border-dashed border-sky-500">
          <h3 className="p-3">You have selected:</h3>
          <div className="p-3 px-4">
            <span className="capitalize text-lg text-white bg-sky-500 px-3 py-2 rounded-md">
              {selectedService}
            </span>
          </div>
          <div className="py-2 px-4">
            Location:&nbsp;
            {selectedLocation}
          </div>
          <div className="py-2 px-4">
            Dentist / Hygienist: &nbsp;
            {selectedDentist.dentist}
          </div>
          <div className="py-2 px-4">
            Date : &nbsp;
            {selectedDate}
          </div>
          <div className="py-3 px-4">
            Time: &nbsp;
            {selectedTimeSlot}
          </div>
        </div>
        <div className="w-1/2 gap-1">
          <div className="py-3 px-4">
            <label className="ml-2">
              Name <span className="bold text-red-500">&#42;</span>{" "}
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="py-3 px-4">
            <label className="ml-2">
              Email <span className="bold text-red-500">&#42;</span>{" "}
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="py-3 px-4">
            <label className="ml-2">
              Phone <span className="bold text-red-500">&#42;</span>{" "}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </div>
      </div>
      <button onClick={handleBooking} className="btn bg-primary mt-2 mb-5">
        Confirm and Book Now
      </button>
      <Footer back={backLink} />
    </div>
  );
}
