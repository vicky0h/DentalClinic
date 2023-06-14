import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {
    user,
    reset,
  } = useContext(UserContext);
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[1];


  function getLinkClasses(type = null) {
    let classes = "text-white bold";
    if (type === subpage) {
      classes = "text-green-400 bold";
    } else {
      classes += " ";
    }
    return classes;
  }

  function getSVGClasses(type = null) {
    let classes = "w-6 h-6 p-1 bg-gray-600 rounded-full";
    if (type === subpage) {
      classes = "w-6 h-6 p-1 bg-green-400 rounded-full";
    } else if (subpage == "service" && type == "location") {
      classes = "w-6 h-6 p-1 rounded-full bg-sky-500";
    } else if (
      subpage == "staff" &&
      (type == "location" || type == "service")
    ) {
      classes = "w-6 h-6 p-1 rounded-full bg-sky-500";
    } else if (
      subpage == "dateandtime" &&
      (type == "location" || type == "service" || type == "staff")
    ) {
      classes = "w-6 h-6 p-1 rounded-full bg-sky-500";
    } else if (
      subpage == "information" &&
      (type == "location" ||
        type == "service" ||
        type == "staff" ||
        type == "dateandtime")
    ) {
      classes = "w-6 h-6 p-1 rounded-full bg-sky-500";
    } else if (
      subpage == "account" &&
      (type == "location" ||
        type == "service" ||
        type == "staff" ||
        type == "dateandtime" ||
        type == "information")
    ) {
      classes = "w-6 h-6 p-1 rounded-full bg-sky-500";
    } else {
      classes += " ";
    }
    return classes;
  }

  const handleClickIndex = () => {
    reset();
  }
 
  return (
    <header className="flex gap-10 w-auto min-h-screen flex-col bg-sky-950 text-white p-8">
      <Link onClick={handleClickIndex} to={"/"} className="flex gap-1 items-center mb-5 text-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.1172 5H14.0026C18.6687 5.68989 19.9341 8.33825 24.0003 8.33825C28.0664 8.33825 29.3314 5.69005 33.9978 5H34.5003C39.747 5 44.0003 9.25329 44.0003 14.5V15.1259C44.0003 18.0287 40.9091 21.3433 40.0003 24.4829C39.035 27.8174 38.3737 30.5425 38.1796 33.3943C37.7248 40.0751 35.447 43 33.0003 43C29.3465 43 26.1017 28.0251 24.0627 28.0251C22.0237 28.0251 17.9776 43 15.0003 43C13.1832 43 10.8293 41.9254 9.94554 33.3943C9.59391 30 9.00122 27.9407 8.00028 24.4829C7.1205 21.4437 4.15199 17.8111 4.00028 14.5511C3.76597 9.51593 7.65782 5.24419 12.693 5.00988C12.8343 5.00331 12.9757 5.00002 13.1172 5Z"
          />
        </svg>
        <span>DentalCare</span>
      </Link>
      <Link to={"/location"} className="flex gap-2 items-center">
        {(subpage == "" || subpage == "location" || subpage == "login" || subpage == "register") && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={getSVGClasses("location")}
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M13 20v-16l-5 5" />
          </svg>
        )}
        {subpage != "" && subpage != "location" && subpage != "login" && subpage != "register" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={getSVGClasses("location")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )}
        <span className={getLinkClasses("location")}>Location</span>
      </Link>
      <div key="2" className="flex gap-2 items-center cursor-default">
        {(subpage == "" ||
          subpage == "location" ||
          subpage == "service" ||
          subpage == "login" ||
          subpage == "register") && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={getSVGClasses("service")}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 8a4 4 0 1 1 8 0c0 1.098 -.564 2.025 -1.159 2.815l-6.841 9.185h8"
            />
          </svg>
        )}
        {subpage != "" &&
          subpage != "location" &&
          subpage != "service" &&
          subpage != "login" && 
          subpage != "register" &&(
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={getSVGClasses("service")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
        <span className={getLinkClasses("service")}>Service</span>
      </div>
      <div key="3" className="flex gap-2 items-center cursor-default">
        {subpage != "dateandtime" &&
          subpage != "information" &&
          subpage != "account" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={getSVGClasses("staff")}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 12a4 4 0 1 0 -4 -4 M8 16a4 4 0 1 0 4 -4"
              />
            </svg>
          )}
        {subpage != "" &&
          subpage != "location" &&
          subpage != "service" &&
          subpage != "staff" &&
          subpage != "login" && 
          subpage != "register" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={getSVGClasses("staff")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
        <span className={getLinkClasses("staff")}>Staff</span>
      </div>
      <div key="4" className="flex gap-2 items-center cursor-default">
        {subpage != "information" && subpage != "account" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={getSVGClasses("dateandtime")}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 20v-15l-8 11h10"
            />
          </svg>
        )}
        {(subpage == "information" || subpage == "account") && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={getSVGClasses("dateandtime")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )}
        <span className={getLinkClasses("dateandtime")}>Date & Time</span>
      </div>
      <div key="5" className="flex gap-2 items-center cursor-default">
        {subpage != "account" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={getSVGClasses("information")}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 20h4a4 4 0 1 0 0 -8h-4v-8h8"
            />
          </svg>
        )}
        {subpage == "account" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={getSVGClasses("information")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )}
        <span className={getLinkClasses("information")}>Information</span>
      </div>
      <hr />
      <Link
        to={user ? "/account" : "/login"}
        className="flex gap-2 items-center mt-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
        {!!user && <div>{user.name}</div>}
        {!user && <div>Login</div>}
      </Link>
    </header>
  );
}
