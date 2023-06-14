import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Footer from "../Footer";

export default function StaffsPage() {
  const {
    searchedServices,
    setSearchedServices,
    selectedLocation,
    setService,
  } = useContext(UserContext);
  const [selectedService, setSelectedService] = useState("");
  const backLink = "/location";
  const nextLink = "/staff";

  function handleClickService(service) {
    setSelectedService(service);
    setService(service);
  }

  return (
    <div className="mx-auto">
      <h1 className="relative text-xl my-8">
        Select main service you need:
        <span className="absolute top-0 right-0 gap-1 text-sky-500 bold text-sm inline-flex">
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
        </span>
      </h1>
      <p>
        You have selected:{" "}
        {selectedService.length > 0 && <span>{selectedService} </span>}
      </p>
      <hr />
      <br />
      <ul className="mb-5 mt-2 w-max-[500px] gap-10 grid grid-cols-3">
        {searchedServices?.length > 0 &&
          searchedServices.map((service) => (
            <li
              key={service}
              onClick={() => handleClickService(service)}
              className="bg-gray-100 p-4 gap-2 cursor-pointer capitalize flex items-center justify-center border-2 hover:border-sky-500"
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
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <span className="text-sm">{service}</span>
            </li>
          ))}
      </ul>
      <Footer back={backLink} next={selectedService ? nextLink : ""} />
    </div>
  );
}
