"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState("");

  const router = useRouter();

  const formValidation = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const passRe =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let valid = true;
    if (user.email.trim()) {
      if (re.test(user.email)) {
        setError((prev) => ({ ...prev, email: "" }));
      } else {
        setError((prev) => ({
          ...prev,
          email: "Enter Email in Correct format",
        }));
        valid = false;
      }
    } else {
      setError((prev) => ({ ...prev, email: "Enter Email!" }));
    }
    if (user.password.trim()) {
      if (passRe.test(user.password)) {
        setError((prev) => ({ ...prev, password: "" }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        password: "Enter Password!",
      }));
      valid = false;
    }
    return valid;
  };

  async function loginHandler(e) {
    e.preventDefault();
    if (formValidation()) {
      try {
        setLoading("loading");
        const res = await axios.post("/api/users/login", {
          email: user.email,
          password: user.password,
        });
        if (res.status === 200) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          console.log(error.response);
          alert("Incorrect Password");
        } else if (error.response.status === 404) {
          console.log(error.response);
          alert("User Not Found, Please Sign Up!");
        }
        setLoading("error");
      } finally {
        setLoading("");
      }
    }
  }

  return (
    <div className="h-screen w-full bg-transparent flex items-center justify-center">
      <form
        className="sm:w-2/4 lg:w-2/5 bg-black p-6 flex flex-col gap-6 px-8 rounded-md"
        onSubmit={loginHandler}
      >
        <h1 className="text-white text-3xl text-center">
          Log <span className="text-parrotGreen">In</span>
        </h1>
        <div>
          <input
            type="text"
            className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
            placeholder="Email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          {error.email && <small className="text-red">{error.email}</small>}
        </div>
        <div>
          <input
            type="password"
            className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {error.password && (
            <small className="text-red">{error.password}</small>
          )}
        </div>
        <button
          className={`${
            loading === "loading" ? "bg-parrotGreen/[0.5]" : "bg-parrotGreen"
          } text-black py-2 px-10 }`}
          type="submit"
          disabled={loading === "loading"}
        >
          {loading === "loading" ? "Loging In..." : "Log In"}
        </button>
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
