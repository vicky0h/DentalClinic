import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import AboutPage from "./AboutPage";
import { UserContext } from "../UserContext";
import dentalClinic from "../../img/DentalClinic.jpeg";

export default function IndexPage() {

  const [active, setActive] = useState(1);
  const nextLink = "/location";
  const backLink = "/";

  return (
    <div className="m-auto">
      <div className="mb-10 bg-gray-100 w-[600px] h-4/5 p-10 rounded-xl shadow-2xl border-dashed border-2 border-sky-500">
        <h1 className="text-center text-3xl mb-5 text-sky-950">About Us</h1>
        <div className="w-[300px] float-left">
          <img src={dentalClinic} alt="dental clinic" className="p-3" />
        </div>
        <div className="p-5">
          <p>
            DentalCare is dedicated to provide total patient care with qualified
            and experienced dental surgeons at multiple convenient locations.
          </p>
          <br />
          <p>
            From checkups to dental implants, our friendly and highly qualified
            dentist at DentalCare allows you to relax and feel comfortable
            during every visit!
          </p>
          <br />
          <p>
            Click{" "}
            <Link to={nextLink} className="text-sky-500">
              "NEXT"
            </Link>{" "}
            to start exploring our services and schedule your appointments.
          </p>
        </div>
      </div>
      <Footer next={nextLink} />
    </div>
  );
}
