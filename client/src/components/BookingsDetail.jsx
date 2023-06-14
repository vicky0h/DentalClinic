import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { UserContext } from "./UserContext";

export default function BookingsDetail({ dentist }) {
 const { ready, user, setUser } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [createdBy, setCreatedBy] = useState("");

  useEffect(() => {
    axios.get("/all-bookings").then((response) => {
      let data = response.data;
      let result = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].dentistInfo != dentist) continue;
        result.push(data[i]);
        setBookings(result);
      }
    });
  }, [deleted]);


  async function removeAppointment(id) {
    if (confirm("Are you sure to delete this appointment?")) {
      const res = await axios.delete("/admin-delete-booking/" + id);
      setDeleted(!deleted);
      alert(res.data.message);
    } else {
      return;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <li
            key={booking._id}
            className="relative w-100% text-sky-500 bg-white shadow-lg rounded-lg border border-dashed border-green-500"
          >
            <div className="p-3 px-4">
              <span className="capitalize text-2x">{booking.service}</span>
            </div>
            <div className="pb-1 px-4 text-sm">
              Location:&nbsp;
              {booking.location}
            </div>
            <div className="pb-1 px-4 text-sm">
              Date : &nbsp;
              {moment(booking.date).format("YYYY-MM-DD")}
            </div>
            <div className="pb-1 px-4 text-sm">
              Time: &nbsp;
              {booking.time}
            </div>
            <div className="pb-1 px-4 text-sm">
              Patient: &nbsp;
              {booking.name}
            </div>
            <div className="pb-1 px-4 text-sm">
              Email: &nbsp;
              {booking.email}
            </div>
            <div className="pb-1 px-4 text-sm">
              Phone: &nbsp;
              {booking.phone}
            </div>
            <div className="pb-1 px-4 text-xs">
              Booked by: &nbsp;
              {booking?.userEmail}
            </div>
            <div className="pb-3 px-4 text-xs">
              Confirmation#: &nbsp;
              {booking._id}
            </div>
            <div
              onClick={() => removeAppointment(booking._id)}
              className="absolute top-1 right-1 text-gray-400 cursor-pointer"
            >
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </li>
        ))}
    </div>
  );
}
