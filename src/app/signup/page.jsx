"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function Signup() {
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [userDetailsError, setUserDetailsError] = useState({
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    passwordError: "",
  });

  const [loading, setLoading] = useState("");

  const router = useRouter();

  const formValidation = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const passRe =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let valid = true;
    if (userDetails.firstname.trim()) {
      setUserDetailsError((prev) => ({ ...prev, firstnameError: "" }));
    } else {
      setUserDetailsError((prev) => ({
        ...prev,
        firstnameError: "Enter First Name!",
      }));
      valid = false;
    }
    if (userDetails.lastname.trim()) {
      setUserDetailsError((prev) => ({ ...prev, lastnameError: "" }));
    } else {
      setUserDetailsError((prev) => ({
        ...prev,
        lastnameError: "Enter Last Name!",
      }));
      valid = false;
    }
    if (userDetails.email.trim()) {
      if (re.test(userDetails.email)) {
        setUserDetailsError((prev) => ({ ...prev, emailError: "" }));
      } else {
        setUserDetailsError((prev) => ({
          ...prev,
          emailError: "Enter Email in Correct format",
        }));
        valid = false;
      }
    } else {
      setUserDetailsError((prev) => ({ ...prev, emailError: "Enter Email!" }));
    }
    if (userDetails.password.trim()) {
      if (passRe.test(userDetails.password)) {
        setUserDetailsError((prev) => ({ ...prev, passwordError: "" }));
      } else {
        setUserDetailsError((prev) => ({
          ...prev,
          passwordError:
            "Password should have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        }));
        valid = false;
      }
    } else {
      setUserDetailsError((prev) => ({
        ...prev,
        passwordError: "Enter Password!",
      }));
      valid = false;
    }
    return valid;
  };

  async function signupHandler(e) {
    e.preventDefault();
    if (formValidation()) {
      try {
        setLoading("loading");
        const res = await axios.post("/api/users/signup", {
          firstName: userDetails.firstname,
          lastName: userDetails.lastname,
          email: userDetails.email,
          password: userDetails.password,
        });
        if (res.status === 201) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 409) {
          alert("User Already Exists Please Login To Continue");
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
        onSubmit={signupHandler}
      >
        <h1 className="text-white text-3xl text-center">
          Sign <span className="text-parrotGreen">Up</span>
        </h1>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
            placeholder="First Name"
            value={userDetails.firstname}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, firstname: e.target.value }))
            }
          />
          {userDetailsError.firstnameError && (
            <small className="text-red">
              {userDetailsError.firstnameError}
            </small>
          )}
        </div>
        <div>
          <input
            type="text"
            className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
            placeholder="Last Name"
            value={userDetails.lastname}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, lastname: e.target.value }))
            }
          />
          {userDetailsError.lastnameError && (
            <small className="text-red">{userDetailsError.lastnameError}</small>
          )}
        </div>
        <div>
          <input
            type="text"
            className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          {userDetailsError.emailError && (
            <small className="text-red">{userDetailsError.emailError}</small>
          )}
        </div>
        <div>
          <input
            type="password"
            className="w-full bg-[#333333] text-white p-2 outline-offset-0	outline-none focus:outline-parrotGreen rounded-md"
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {userDetailsError.passwordError && (
            <small className="text-red">{userDetailsError.passwordError}</small>
          )}
        </div>
        <button
          className={`${
            loading === "loading" ? "bg-parrotGreen/[0.5]" : "bg-parrotGreen"
          } text-black py-2 px-10`}
          type="submit"
          disabled={loading === "loading"}
        >
          {loading === "loading" ? "Signing Up..." : "Sign Up"}
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
