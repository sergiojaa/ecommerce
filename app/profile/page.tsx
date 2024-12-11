'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Make sure to use 'next/navigation' in App Router
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [userData, setUserData] = useState({ userName: '', email: '' });
  const [error, setError] = useState('');
  const router = useRouter();  // Correct way to get router

  const logOut = () => {
    localStorage.removeItem('token');
    router.push('/');  // Redirect to home after logout
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
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
    } else {
        router.push('/login')
    }
  }, []);

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
        <button onClick={logOut} className='bg-blue-400 p-[10px] w-[100px]'>
          Log Out
        </button>
      </div>
    </div>
  );
}
