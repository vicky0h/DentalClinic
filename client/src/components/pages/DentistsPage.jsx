import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import Image from "../Image";

export default function ServicesPage() {
  const [dentists, setDentists] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get("/admin-dentists").then(({ data }) => {
      setDentists(data);
    });
  }, [deleted]);

  async function removeProfile(id) {
    if (confirm("Are you sure to delete this dentist's profile?")){
      setDeleted(!deleted);
      await axios.delete('/delete-dentist/' + id);
      setRedirect(true);
    } else {
      return;
    }
  }


  if (redirect) {
    return <Navigate to={"/account/"} />;
  }

  return (
    <div className="mx-auto flex flex-col items-center">
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/dentists/new"}
          className="inline-flex gap-1 mt-6 -ml-12 bg-sky-500 text-white py-2 px-4 rounded-2xl"
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
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add A New Dentist
        </Link>
      </div>
      <div className="mx-8 mt-5 md:w-[600px] lg:w-[1000px]">
        {dentists.length > 0 &&
          dentists.map((dentist) => (
            <div
              className="relative mt-3 p-2 flex h-40 border rounded-xl bg-gray-100 shadow-xl"
              key={dentist._id}
            >
              <div className="flex">
                <Image
                  className="m-1 object-cover shrink-0 rounded-xl max-w-md"
                  src={dentist.photos[0]}
                  alt=""
                />
              </div>
              <div className="ml-3 block">
                <h2 className="text-sky-900 font-bold">{dentist.dentist}</h2>
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

                  {dentist.location}
                </div>
                <p className="font-light text-sm">
                  Working hours: {dentist.timings[0]}
                  {" - "} {dentist.timings[dentist.timings.length - 1]}
                </p>
                <div className="mt-2 text-sm italic">
                  Services provided:
                  {dentist.services.length > 0 &&
                    dentist.services.map((service) => (
                      <span key={service}> &oplus; {service} </span>
                    ))}
                </div>
              </div>
              <Link
                className="absolute top-2 right-6 mr-1 text-gray-400 hover:text-sky-500"
                to={"/account/dentists/" + dentist._id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </Link>
              <div onClick={() => removeProfile(dentist._id)} className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-sky-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
