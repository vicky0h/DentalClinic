import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegistion(event) {
    event.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful, now you can login.");
    } catch (error) {
      console.log(error);
      alert("Registration failed, please try again later.");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64 text-center">
        <h1 className="text-2xl text-center mb-10">Sign up</h1>
        <form
          className="flex flex-col justify-center w-[300px]"
          onSubmit={handleRegistion}
        >
          <input
            type="text"
            placeholder="John Doe"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="mt-3 mb-1 bg-sky-500 text-white px-4 py-2 rounded-xl">
            Sign up
          </button>
          <div className="text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-black underline">
              Log in now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
