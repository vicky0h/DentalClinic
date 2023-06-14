import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Footer from "../Footer";
import toronto from "../../img/Toronto.jpeg";
import montreal from "../../img/Montreal.jpeg";
import vancouver from "../../img/Vancouver.jpeg";
import { UserContext } from "../UserContext";

export default function LocationPage() {
  const {getLocation} = useState(UserContext);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  
  useEffect(() => {
    axios.get("/all-dentists").then(({data}) => {
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (temp.includes(data[i].location)) continue;
      temp.push(data[i].location);
    }
    setLocations(temp);
   })
 });

  async function handleClickLocation (location) {
    console.log(location);
    setSelectedLocation(location);
    getLocation(location);
  }

  return (
    <div className="m-auto">
      <h1 className="text-xl my-8">Select your preferred location </h1> 
      <hr/><br/>
      <ul className="mb-32 mt-2 w-max-[500px] gap-10 grid grid-cols-2">
        {locations.length > 0 &&
          locations.map((location) => (
            <li onClick={()=> handleClickLocation(location)} className="bg-gray-100 p-16 gap-2 cursor-pointer flex items-center justify-center flex-col border-2 hover:border-sky-500">
              <img
                src={location == 'Toronto' ? toronto : (location == 'Montreal' ? montreal : (location == 'Vancouver' ? vancouver : ''))}
                alt={location}
                className="rounded-full w-[80px] h-[80px] object-cover"
              />
              <span>{location}</span>
            </li>
          ))}
      </ul>
      <Footer />
    </div>
  );
}
