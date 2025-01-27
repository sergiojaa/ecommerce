'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import
import React, { useEffect, useState } from 'react';
import { checkTokenValidity } from '../components/utils/checkTokenValidity';
import { HiH1 } from 'react-icons/hi2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import { faEye } from "@fortawesome/free-regular-svg-icons";
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileInformation from '../components/profile/ProfileInformation';
import PasswordForm from '../components/profile/PasswordForm';

export default function Page() {


  const [userData, setUserData] = useState({
    userName: '', email: '', mobileNumber: ""
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    checkTokenValidity(String(token)).then((isValid) => {
      if (!isValid) {
        router.push('/login')
      }
    });

    axios
      .get('http://localhost:3001/account', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      .then((res) => {
        setUserData({
          userName: res.data.username,
          email: res.data.email,
          mobileNumber: res.data.mobileNumber,
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [router]);

  return (
    <div>
      {error && (<p>Error</p>)}
      <div>
        <div className='flex font-bold  text-[25px] xl:ml-[13rem] justify-start mt-[1rem] ml-[1rem] '>
          <h1 className='text-secondary' >გამარჯობა, {userData.userName}</h1>
        </div>
        <div className='flex flex-col items-start md:flex-row ml-[2rem]'>
          <div>
            <ProfileSidebar />
          </div>
          <div className='md:mt-[2rem] w-full flex flex-col gap-7 md:ml-[5rem]'>
            <div >
              <h2 className='font-bold mb-4 text-[20px] text-secondary'>პარამეტრები</h2>

              <div className='flex flex-col md:flex-row max-w-max gap-5 '>
                <button onClick={() => setIsFirstButtonActive(true)} className={`border px-3 py-2 ${isFirstButtonActive ? "text-white" : "text-primary"} rounded-3xl ${isFirstButtonActive ? "bg-secondary" : "bg-white"
                  }`}>პირადი ინფორმაცია</button>
                <button
                  onClick={() => setIsFirstButtonActive(false)}
                  // className='border bg-blue-600 p-3 rounded-2xl'
                  className={`border px-3 py-2 rounded-3xl  ${isFirstButtonActive ? "text-secondary" : "text-white"}  ${!isFirstButtonActive ? "bg-secondary" : "bg-white"} `}
                >
                  პაროლის შეცვლა</button>

              </div>

              {isFirstButtonActive
                ? <ProfileInformation setUserData={setUserData} userData={userData} />
                :
                <PasswordForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
