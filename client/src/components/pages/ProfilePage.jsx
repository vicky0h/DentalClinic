import React, { useContext, useState } from "react";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"}/>
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="mx-auto flex flex-col items-center">
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center md:w-[600px] lg:w-[1000px]">
            Logged in as {user.name} ({user.email}) <br/>
            <button onClick={logout} className="mt-5 max-w-sm">Log out</button>
        </div>
      )}
    </div>
  );
}
