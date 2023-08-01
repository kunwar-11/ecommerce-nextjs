"use client";
import Link from "next/link";
import React from "react";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState({
    email: "",
    password: "",
  });
  return (
    <div className="h-screen w-full bg-transparent flex items-center justify-center">
      <form className="sm:w-2/4 lg:w-2/5 bg-black p-6 flex flex-col gap-6 px-8 rounded-md">
        <h1 className="text-white text-3xl text-center">
          Log <span className="text-parrotGreen">In</span>
        </h1>
        <input
          type="text"
          className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="password"
          className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button className="bg-parrotGreen text-black py-2 px-10 ">Login</button>
        <span className="text-white text-center">
          Have not registered till now ?
          <Link href={"/signup"}>
            <span className="text-parrotGreen hover:underline hover:underline-offset-2 hover:decoration-parrotGreen">
              Sign Up
            </span>
          </Link>
        </span>
      </form>
    </div>
  );
}
