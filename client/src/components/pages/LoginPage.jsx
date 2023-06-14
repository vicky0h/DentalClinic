import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const {data} = await axios.post("/login", {email, password}, {withCredentials: true});
      setUser(data);
      setRedirect(true);
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={"/"}/>
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64 text-center">
        <h1 className="text-2xl text-center mb-10">Log in</h1>
        <form className="flex flex-col justify-center w-full" onSubmit={handleLogin}>
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
            Log in
          </button>
          <div className="text-gray-400">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="text-black underline">
              Sign up now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
