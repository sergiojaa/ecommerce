
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons"; // Import the specific icon
import { FaRegUserCircle } from "react-icons/fa";

import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';


interface CartResponse {
  cartItems: [];
  totalPrice: number;
}

export default function page(
  {
    isOpen,
    open,
  }: {
    isOpen: boolean;
    open: () => void;
  },
) {


  return (
    <div className='mt-[17px]  '>
      <div className='flex items-center justify-between md:justify-between'>
        <div className='flex items-center gap-2' >
          <button onClick={open} className="md:hidden">
            <div className="ml-[10px] translate-y-[-10%] ">
              <div className="flex m-[6px] flex-col items-center justify-center space-y-1 w-6 cursor-pointer">
                <div className="h-1 w-full bg-[#69707D] rounded"></div>
                <div className="h-1 w-full bg-[#69707D] rounded"></div>
                <div className="h-1 w-full bg-[#69707D] rounded"></div>
              </div>
            </div>
          </button>

          <div className='w-[100px]  lg:w-[150px] md:ml-[20px]  '>
            {/* <h1 className='font-bold text-gray-500 text-[30px]'>Beverage</h1> */}
            <Link href={'/'}>
              <img className='lg:ml-[70px]' src="https://cdn.discordapp.com/attachments/1303694017724289055/1316439763095388263/image.png?ex=675b0d91&is=6759bc11&hm=24c660d4710e2bb38d0a4d447daa37422459c0ca4f4eeb5eee96b0fabc13d22d&" alt="" />

            </Link>
          </div>

        </div>
        <div>
          <div>
            <ul className=' hidden md:flex gap-5 text-xl'>
              <li>home</li>
              <li>about</li>
              <li>service</li>

              <li>products</li>
              <li>drinks</li>
              <li>contact</li>



            </ul>
          </div>
        </div>
        <div className='flex items-center gap-7 lg:pr-[70px]'>
          <div className='relative'>
            <Link href={"/cart"}>
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-black translate-y-[10%]  text-xl cursor-pointer"
              />
            </Link>
            {/* <span className="absolute -top-2 -right-2 bg-gray-100 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
            
            </span> */}
          </div>
          <div className='mr-5'>
            <Link href={'/profile'}>
              <FaRegUserCircle size={25} className="text-black" />

            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}

