import React from "react";
import { Link } from "react-router-dom";

export default function ({back, next}) {

  function handleClickNext() {
    if (next == "") {
      return alert("Please make a selection before proceeding to the next step.");
    }  
  
  }

  return (
    <footer className="w-full flex font-bold mb-10">
      <Link to={back} className="px-4 py-2 bg-sky-500 rounded-lg text-white mr-[460px]">
        BACK
      </Link>
      <Link onClick={handleClickNext} to={next} className="px-4 py-2 bg-sky-500 rounded-lg text-white">
        NEXT
      </Link>
    </footer>
  );
}
