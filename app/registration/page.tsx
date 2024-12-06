'use client'
import axios from "axios"

import React, { useState } from 'react'

export default function Registration() {
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
    if (!emailRegex.test(user.email)) {
      setError("Invalid email format.");
    } else if (!passwordRegex.test(user.password)) {
      setError("Password is not strong enough.");
    } else {
      setError("");
      console.log("Form submitted successfully", user);
    }

    if(error === ''){
    axios.post("localhost:3001/auth/sign-up",{
      body: {
        "email": user.email,
        "username": user.userName,
        "password": user.password
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    }
  };
  return (
    
    <div>
      registration page
      <form onSubmit={handleSubmit}>
      <input
          name="userName"
          onChange={inputValue}
          value={user.userName}
          type="text"
          placeholder="Enter userName"
        />
        <input
          name="email"
          onChange={inputValue}
          value={user.email}
          type="text"
          placeholder="Enter email"
        />

        <input
          name="password"
          onChange={inputValue}
          value={user.password}
          type="password"
          placeholder="Enter password"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      <button>login</button>
    </div>
  )
}
