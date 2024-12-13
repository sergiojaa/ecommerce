'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import
import React, { useEffect, useState } from 'react';
import { checkTokenValidity } from '../components/utils/checkTokenValidity';

export default function Page() {
  const [userData, setUserData] = useState({ userName: '', email: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem('token');
    router.push('/'); // Redirect to home after logout
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || checkTokenValidity(token) !== true) {
      router.push('/login');
      return;
    }

    axios
      .get('http://localhost:3001/auth/account', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserData({
          userName: res.data.username,
          email: res.data.email,
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [router]); // Add router to the dependency array

  return (
    <div>
      {error ? (
        <div>
          <h1>Error: {error}</h1>
        </div>
      ) : (
        <div>
          <div>
            <h1>userName: {userData.userName}</h1>
          </div>
          <div>
            <h1>Email: {userData.email}</h1>
          </div>
        </div>
      )}
      <div>
        <button onClick={logOut} className="bg-blue-400 p-[10px] w-[100px]">
          Log Out
        </button>
      </div>
    </div>
  );
}
