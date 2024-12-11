'use client'
import axios from "axios"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

export default function login() {
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
      axios.post("http://localhost:3001/auth/sign-in", {
        email: user.email,
        password: user.password
      })
        .then((res) => {

          localStorage.setItem("token", res.data)
          router.push('/')
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
    }
  };
  return (

    <div className="flex justify-center flex-col items-center h-screen-minus-header">
      <div className="w-full sm:w-auto rounded-xl shadow-none sm:shadow-lg border-none sm:border-gray-200 px-10 py-[60px] flex flex-col gap-5">
        <h1 className="text-xl font-bold">შედით ანგარიშზე</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <p>ელ. ფოსტა</p>
            <input
              name="email"
              onChange={inputValue}
              value={user.email}
              type="text"
              placeholder="Enter email"
              className="border-solid border-2 border-[D0D5DD] px-[16px] py-[12px] rounder-xl w-full sm:w-[396px] mt-[10px]	"

            />
          </div>
          <div>
            <p>პაროლი</p>
            <input
              name="password"
              onChange={inputValue}
              value={user.password}
              type="password"
              placeholder="Enter password"
              className="border-solid border-2 border-[D0D5DD] px-[16px] py-[12px] rounder-xl w-full sm:w-[396px]	mt-[10px]"

            />
          </div>
          <button
            className="border-solid border-2 border-[D0D5DD] cursor-pointer text-white font-bold bg-blue-500 px-[16px] py-[12px] rounder-xl w-full sm:w-[396px]	"

            type="submit">შესვლა</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        <Link className="text-right " href='/registration'>რეგისტრაცია</Link>
      </div>
    </div>
  )
}
