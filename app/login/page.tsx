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


  const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value // Dynamically update the correct field
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    console.log(user.password.length)

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
          setError(err.response.data.message)
        })
    }
  };
  return (

    <div className="flex justify-center flex-col items-center h-screen-minus-header">
      <div className="w-full sm:w-auto rounded-xl shadow-none sm:shadow-lg border-none sm:border-gray-200 px-10 py-[40px] flex flex-col gap-5">
        <h1 className="text-xl font-bold">ანგარიშზე შესვლა</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <p>ელ. ფოსტა</p>
            <input
              name="email"
              onChange={inputValue}
              value={user.email}
              type="text"
              placeholder="Enter email"
              className="border-solid border-2 border-[D0D5DD] px-[16px] py-[10px] rounder-xl w-full sm:w-[396px] mt-[3px]	"

            />
          </div>
          <div>
            <p >პაროლი</p>
            <input
              name="password"
              onChange={inputValue}
              value={user.password}
              type="password"
              placeholder="Enter password"
              className="border-solid border-2 border-[D0D5DD] px-[16px] py-[10px] rounder-xl w-full sm:w-[396px]	mt-[3px]"

            />
          </div>
          <button
            className="cursor-pointer text-white font-bold bg-blue-500 px-[16px] py-[14px] rounder-xl w-full sm:w-[396px]	"

            type="submit">შესვლა</button>
        </form>
        <div className="w-full sm:w-[396px]">
          {error && <p className="text-red-600 text-sm font-[300]">{error}</p>} {/* Display error message */}
        </div>
        <Link className="text-right text-sm font-[300]" href='/registration'>რეგისტრაცია</Link>
      </div>
    </div>
  )
}
