'use client'
import axios from "axios"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

export default function Registration() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: ""
  });
  const [error, setError] = useState("");

  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value // Dynamically update the correct field
    }));

    if (name === "email" && !emailRegex.test(value)) {
      setError("Invalid email format.");
    } else if (name === "password" && !passwordRegex.test(value)) {
      setError("Password must contain at least 8 characters, one letter, one number, and one special character.");
    } else {
      setError(""); // Clear the error when input is valid
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    console.log(user.password.length)

    if (!emailRegex.test(user.email)) {
      setError("Invalid email format.");
    } else if (!passwordRegex.test(user.password)) {
      setError("Password is not strong enough.");
    } else {
      setError("");
    }

    if (error === '') {
      axios.post("http://localhost:3001/auth/sign-up", {
        email: user.email,
        username: user.userName,
        password: user.password
      })
        .then((res) => {
          router.push('/login')
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
    }
  };
  return (

    <div className="flex justify-center flex-col items-center ">
      registration page
      <form  className="flex flex-col" onSubmit={handleSubmit}>
        <input
          name="userName"
          onChange={inputValue}
          value={user.userName}
          type="text"
          placeholder="Enter userName"
          className="border-solid border-2 border-[D0D5DD] px-[16px] py-[12px] rounder-xl w-[396px]	"

        />
        <input
          name="email"
          onChange={inputValue}
          value={user.email}
          type="text"
          placeholder="Enter email"
          className="border-solid border-2 border-[D0D5DD] px-[16px] py-[12px] rounder-xl w-[396px]	"

        />

        <input
          name="password"
          onChange={inputValue}
          value={user.password}
          type="password"
          placeholder="Enter password"
          className="border-solid border-2 border-[D0D5DD] px-[16px] py-[12px] rounder-xl w-[396px]	"

        />
        <button
                 className="border-solid border-2 border-[D0D5DD] bg-blue-600 px-[16px] py-[12px] rounder-xl w-[396px]	"

        type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      <Link href={'/login'}>go to login</Link>
    </div>
  )
}
