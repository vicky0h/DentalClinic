import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import AccountNav from "../AccountNav";
import BookingsDetail from "../BookingsDetail";


export default function AllBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [dentists, setDentists] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get("/all-bookings").then((response) => {
      getDentists(response.data);
    });
  }, [deleted]);


  const getDentists = async (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (result.includes(data[i].dentistInfo)) continue;
      result.push(data[i].dentistInfo);
    }
    setDentists(result);
  }

  return (
    <div className="mx-auto">
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
        All Appointments:
      </h1>
      <hr />
      <br />
      <ul className="w-[750px] border mb-8 bg-gray-100 gap-2 px-3 py-6 grid">
        {dentists.length > 0 && dentists.map((dentist) => (
          <ul key={dentist}>
            <h3>{dentist}</h3>
            <BookingsDetail dentist={dentist}/>
          </ul>
        ))}
      </ul>
    </div>
  );
}
