import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import StaffsPage from "./pages/StaffsPage";
import Image from "./Image";

export default function StaffDetail() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/dentists/${id}`).then((response) => {
      setStaff(response.data);
    });
  }, [id]);

  if (!staff) return "";

  return (
    <div className="mx-auto mt-5 md:w-[600px] lg:w-[1000px]">
      <div
        className="relative mt-3 p-2 flex h-auto border rounded-xl bg-gray-100 shadow-xl"
        key={staff._id}
      >
        <div className="flex">
          <Image
            className="m-1 h-40 object-cover shrink-0 rounded-xl max-w-md"
            src={staff.photos[0]}
            alt=""
          />
        </div>
        <div className="ml-3 block">
          <h2 className="text-sky-900 font-bold">{staff.dentist}</h2>
          <div className="text-sky-500 inline-flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>

            {staff.location}
          </div>
          <p className="font-light text-sm">
            Working hours: {staff.timings[0]}
            {" - "} {staff.timings[staff.timings.length - 1]}
          </p>
          <div className="mt-2 text-sm italic">
            Services provided:
            {staff.services.length > 0 &&
              staff.services.map((service) => (
                <span key={service}> &oplus; {service} </span>
              ))}
          </div>
          <div className="mt-2">
            <h3>Professional Summary</h3>
            <p className="font-light text-sm">{staff.description}</p>
          </div>
        </div>
        <Link to={"/staff"} className="absolute flex gap-1 top-2 right-2 cursor-pointer text-gray-400 hover:text-sky-500">
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
