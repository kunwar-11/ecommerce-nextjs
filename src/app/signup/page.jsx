"use client";
import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <div className="h-screen w-full bg-transparent flex items-center justify-center">
      <form className="sm:w-2/4 lg:w-2/5 bg-black p-6 flex flex-col gap-6 px-8 rounded-md">
        <h1 className="text-white text-3xl text-center">
          Sign <span className="text-parrotGreen">Up</span>
        </h1>
        <input
          type="text"
          className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
          placeholder="First Name"
        />
        <input
          type="text"
          className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
          placeholder="Last Name"
        />
        <input
          type="text"
          className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
          placeholder="Password"
        />
        <button className="bg-parrotGreen text-black py-2 px-10 ">
          Sign Up
        </button>
        <span className="text-white text-center">
          already registered ? please{" "}
          <Link href={"/login"}>
            <span className="text-parrotGreen hover:underline hover:underline-offset-2 hover:decoration-parrotGreen">
              Log In
            </span>
          </Link>
        </span>
      </form>
    </div>
  );
}
