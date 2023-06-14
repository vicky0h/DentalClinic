import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import AccountNav from "../AccountNav";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, [deleted]);

  async function removeAppointment(id) {
    if (confirm("Are you sure to delete this appointment?")) {
      const res = await axios.delete("/delete-booking/" + id);
      if (res.data.success) {
        setDeleted(!deleted);
        alert(res.data.message);
      } else {
        alert("Free cancellation up to 2 days before the scheduled time only. Please contact the clinic for more information.");
      }
    } else {
      return;
    }
  }

  return (
    <div className="mx-auto flex flex-col items-center">
      <AccountNav />
      <h1 className="relative text-xl mt-8 mb-2 flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        Your Appointments:
      </h1>
      <hr />
      <br />
      <p className="text-sm text-sky-500">
      &#42; Free cancellation up to 2 days before the scheduled time. Please contact
        the clinic for more inforamtion.
      </p>
      <ul className="w-[750px] border mb-8 bg-gray-100 gap-2 px-3 py-6 grid grid-cols-3">
        {bookings?.length > 0 &&
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
                Dentist / Hygienist: &nbsp;
                {booking.dentistInfo}
              </div>
              <div className="pb-1 px-4 text-sm">
                Date : &nbsp;
                {moment(booking.date).format("YYYY-MM-DD")}
              </div>
              <div className="pb-3 px-4 text-sm">
                Time: &nbsp;
                {booking.time}
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
      </ul>
    </div>
  );
}
