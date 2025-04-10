'use client'
import React, { useState } from 'react'
import RegistrationForm from '../components/auth/RegistrationForm';

export default function Registration() {

  const [error, setError] = useState("");

  const [user, setUser] = useState({
    email: "",
    userName: "",
    mobileNumber: "",
    password: ""
  });

  const regex = {
    emailRegex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    mobileRegex: /^5\d{8}$/
  }


  return (
    <RegistrationForm regex={regex} error={error} setError={setError} user={user} setUser={setUser} />
  )
}
