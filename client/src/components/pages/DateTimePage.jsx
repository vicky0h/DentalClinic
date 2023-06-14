import React, { useContext, useEffect, useState } from "react";
// import { DatePicker, TimePicker, Calendar } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import Calendar from "react-calendar";
import { UserContext } from "../UserContext";
import Footer from "../Footer";
import { Navigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

export default function DateTimePage() {
  const {
    user,
    selectedLocation,
    selectedService,
    selectedDentist,
    setDate,
    setTimeSlot,
    setPickedAvailable,
  } = useContext(UserContext);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [redirectBooking, setRedirectBooking] = useState(false);

  const selectedTimings = selectedDentist?.timings;
  const len = selectedTimings?.length;
  const backLink = "/staff";
  const nextLink = "/information";

  function getClasses(timing) {
    let classes =
      "inline-flex items-center justify-center bg-gray-100 border px-2 py-1 text-small rounded-md cursor-pointer";
    if (timing == selectedTime) {
      classes += " bg-sky-500 text-white";
    } else {
      classes += "";
    }
    return classes;
  }

  const handleTimeSlotClick = async (timing) => {
    setSelectedTime(timing);
    handleAvailability();
  };

  const onDateChange = async (event) => {
    let date = dayjs(event).format("YYYY-MM-DD");
    setSelectedDate(date);
    handleAvailability();
  };

  const handleAvailability = async () => {
    if (!selectedTime) {
      return alert("Timeslot cannot be empty.");
    } else if (!selectedDate) {
      return alert("Date cannot be empty.");
    }
    const res = await axios.post("/booking-availability", {
      dentistId: selectedDentist._id,
      date: selectedDate,
      time: selectedTime,
    });
    if (res.data.success) {
      setIsAvailable(true);
      alert(res.data.message + " (" + selectedDate + ", " + selectedTime + ")");
      setPickedAvailable(true);
    } else {
      setIsAvailable(false);
      alert(res.data.message + " (" + selectedDate + ", " + selectedTime + ")");
    }
  };

  const handleBooking = async (event) => {
    if (!user) {
      if (confirm("Please log in first before booking")) {
        setRedirect(true);
      }
      return;
    }
    if (!selectedDate && !selectedTime) {
      return alert("Date and time are required.");
    }
    if (!isAvailable) {
      return alert(
        "This timeslot is not available, please choose another timeslot."
      );
    } else {
      setDate(selectedDate);
      setTimeSlot(selectedTime);
      setPickedAvailable(isAvailable);
      setRedirectBooking(`/information`);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirectBooking) {
    return <Navigate to={redirectBooking} />;
  }

  return (
    <div className="mx-auto">
      <h1 className="relative text-xl my-8 flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          <path
            fillRule="evenodd"
            d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
            clipRule="evenodd"
          />
        </svg>
        Select your preferred date and time slot:
        <div className="absolute flex-col top-4 right-10 gap-1 text-sky-500 bold text-sm inline-flex">
          <div className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {selectedLocation}
          </div>
          <div className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <span className="capitalize">{selectedService}</span>
          </div>
          <div className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            {selectedDentist.dentist}
          </div>
        </div>
      </h1>
      <p>
        You have selected:{" "}
        {selectedTime.length > 0 && (
          <span className="text-sky-500">
            Date: {selectedDate}, Time: {selectedTime}{" "}
          </span>
        )}
      </p>
      <hr />
      <br />
      <div className="w-[600px] border mt-5 mb-8 bg-gray-100 flex">
        <div className="w-50 p-5">
          <Calendar
            onChange={onDateChange}
            fullscreen={false}
            minDate={new Date()}
            className="w-[300px] h-[300px] mb-5"
          />
        </div>
        <div className="w-1/2 bg-white border m-2 p-2 grid grid-cols-3 grid-rows-6 gap-2">
          <h3 className="col-span-3 mt-2">Timeslots</h3>
          {len > 0 &&
            selectedTimings
              .filter((timing) => timing != selectedTimings[len - 1])
              .map((timing) => (
                <span
                  onClick={() => handleTimeSlotClick(timing)}
                  key={timing}
                  className={getClasses(timing)}
                >
                  {timing}
                </span>
              ))}
        </div>
      </div>
      <button onClick={handleAvailability} className="btn bg-black mb-2">
        Check Availability
      </button>
      <p className="text-xs text-sky-500 ml-2 mt-2">
        {" "}
        &#42;Please check availability before proceeding to the next step
      </p>
      <button onClick={handleBooking} className="btn bg-primary mt-2 mb-5">
        Book Now
      </button>
      <Footer back={backLink} next={(selectedDate && selectedTime && user) ? nextLink : ""} />
    </div>
  );
}
