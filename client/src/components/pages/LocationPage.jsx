import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer";
import toronto from "../../img/Toronto.jpeg";
import montreal from "../../img/Montreal.jpeg";
import vancouver from "../../img/Vancouver.jpeg";
import { UserContext } from "../UserContext";

export default function LocationPage() {
  const { searchedLocations, setSearchedLocations, setLocation } =
    useContext(UserContext);
  const [selectedLocation, setSelectedLocation] = useState();
  const nextLink = "/service";
  const backLink = "/";

  function handleClickLocation(event, location) {
    setSelectedLocation(location);
    setLocation(location);
  }


  return (
    <div className="m-auto">
      <h1 className="text-xl my-8 flex gap-2">
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        Select your preferred location
      </h1>
      <p>
        You have selected: {selectedLocation} {selectedLocation ? "office" : ""}{" "}
      </p>
      <hr />
      <br />
      <ul className="mb-10 mt-2 w-max-[500px] gap-5 grid grid-cols-3">
        {searchedLocations?.length > 0 &&
          searchedLocations.map((location) => (
            <li
              key={location}
              onClick={(event) => handleClickLocation(event, location)}
              className="bg-gray-100 p-5 gap-2 cursor-pointer flex items-center justify-center flex-col border-2 hover:border-sky-500"
            >
              <img
                src={
                  location == "Toronto"
                    ? toronto
                    : location == "Montreal"
                    ? montreal
                    : location == "Vancouver"
                    ? vancouver
                    : ""
                }
                alt={location}
                className="rounded-full w-[100px] h-[100px] object-cover"
              />
              <span>{location}</span>
            </li>
          ))}
      </ul>
      <Footer back={backLink} next={selectedLocation ? nextLink : ""} />
    </div>
  );
}
