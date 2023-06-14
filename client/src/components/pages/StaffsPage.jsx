import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Footer from "../Footer";
import Image from "../Image";

export default function StaffsPage() {
  const {
    user,
    searchedDentists,
    setSearchedDentists,
    selectedLocation,
    selectedService,
    setDentist,
  } = useContext(UserContext);
  const [selectedDentist, setSelectedDentist] = useState("");
  const [redirect, setRedirect] = useState(false);
  const backLink = "/service";
  const nextLink = "/dateandtime";

  function handleClickDentist(dentist) {
    setSelectedDentist(dentist.dentist);
    setDentist(dentist);
    if (!user) {
      if (confirm("Please log in first before booking")) {
        setRedirect(true);
      }
      return;
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="relative m-auto w-[600px]">
      <h1 className="text-xl my-6 flex gap-2">
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
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        Select your dentist / hygienist:{" "}
      </h1>
      <p>You have selected: {selectedDentist} </p>
      <div className="absolute top-8 right-10 gap-1 text-sky-500 bold text-sm inline-flex">
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
      <div className="absolute top-12 right-10 gap-1 text-sky-500 bold text-sm inline-flex">
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
      <hr />
      <br />
      <ul className="mb-10 mt-2 w-[600px] gap-10 grid grid-cols-2">
        {searchedDentists?.length > 0 &&
          searchedDentists.map((dentist) => (
            <li
              key={dentist._id}
              onClick={() => handleClickDentist(dentist)}
              className="relative bg-gray-100 border-2  hover:border-sky-500 p-8 gap-1 cursor-pointer flex items-center justify-center flex-col"
            >
              <Image
                className="rounded-full w-[120px] h-[120px] object-cover"
                src={dentist.photos[0]}
              />
              <span>{dentist.dentist}</span>
              <p className="h-18 text-ellipsis">{dentist.description}</p>
              <Link
                to={"/staff/" + dentist._id}
                className="absolute top-1 right-1 text-sky-500"
              >
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
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Link>
            </li>
          ))}
      </ul>
      <Footer back={backLink} next={(selectedDentist && user) ? nextLink : ""} />
    </div>
  );
}
