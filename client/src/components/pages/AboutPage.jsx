import React from "react";
import dentalClinic from "../../img/DentalClinic.jpeg";
import toronto from "../../img/Toronto.jpeg";

export default function AboutPage() {
  return (
    <div className="m-auto">
      <div className="bg-gray-100 w-[600px] h-4/5 p-10 rounded-xl shadow-2xl border-dashed border-2 border-sky-500">
        <h1 className="text-center text-3xl mb-5 text-sky-950">About Us</h1>
        <p>
          DentalCare is dedicated to provide total patient care with qualified
          and experienced dental surgeons at multiple convenient locations.
        </p>
        <br />
        <p>
          From checkups to dental implants, our friendly and highly qualified
          dentist at DentalCare allows you to relax and feel comfortable during
          every visit!
        </p>
        <br />
        <p>
          Click <span className="text-sky-500">"NEXT"</span> to start exploring
          our services and schedule your appointments.{" "}
        </p>
      </div>
    </div>
  );
}
