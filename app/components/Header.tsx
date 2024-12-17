'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons"; // Import the specific icon
import { FaRegUserCircle } from "react-icons/fa";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
) 
{
const [inputOpen, setInputOpen] = useState(false) 
  // Toggle the visibility of the input field
  const toggleInputVisibility = () => {
    setInputOpen(!inputOpen);
  };
 
  return (
    <div className='mt-[17px]  '>
      <div className={`flex items-center  md:justify-between ${!inputOpen && 'justify-between' } `}>
        <div className='flex items-center gap-2' >
          <button onClick={open} className="lg:hidden">
            <div className="ml-[10px] translate-y-[-10%] ">
              <div className="flex m-[6px] flex-col items-center justify-center space-y-1 w-6 cursor-pointer">
                <div className="h-1 w-full bg-[#69707D] rounded"></div>
                <div className="h-1 w-full bg-[#69707D] rounded"></div>
                <div className="h-1 w-full bg-[#69707D] rounded"></div>
              </div>
            </div>
          </button>
{!inputOpen && 
(
  <div>
  <div className='w-[100px]  lg:w-[150px] md:ml-[20px]  '>
            {/* <h1 className='font-bold text-gray-500 text-[30px]'>Beverage</h1> */}
            <Link href={'/'}>
              <img className='lg:ml-[150px]' src="https://cdn.discordapp.com/attachments/1303694017724289055/1316439763095388263/image.png?ex=675b0d91&is=6759bc11&hm=24c660d4710e2bb38d0a4d447daa37422459c0ca4f4eeb5eee96b0fabc13d22d&" alt="" />

            </Link>
          </div>
  </div>
)
}
        

        </div>
        <div className='flex items-center w-full gap-7 lg:pr-[70px]'>
        <div className='relative lg:mr-[100px] w-full flex items-center'>
  {/* Conditionally render the input field */}
  <input
    type="text"
    placeholder="რას ეძებთ?"
    className={`outline-none bg-red lg:ml-[200px]  text-sm border border-gray-300 rounded p-2 w-full pl-2 pr-10 
      ${inputOpen || 'hidden'} md:block`} // Show the input on medium screens and larger
  />

  {/* FontAwesome search icon */}
  <FontAwesomeIcon
    icon={faMagnifyingGlass}
    className={`text-gray-500 text-xl block md:hidden  cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2  ${!inputOpen && "translate-x-12"}
      ${inputOpen ? 'translate-x-0' : 'translate-x-6'} md:translate-x-0`} 
    onClick={toggleInputVisibility} 
  />
   
    <FontAwesomeIcon className='hidden md:block cursor-pointer text-gray-500 text-cl absolute right-2 top-1/4 '   icon={faMagnifyingGlass} />
</div>
<div className='md:hidden'>
{inputOpen &&      <FontAwesomeIcon onClick={toggleInputVisibility}  icon={faXmark} className="text-2xl mr-5 ml-[-10px]" />
  }
</div>
    

        
{!inputOpen && 
 (
 <div className='flex gap-3 lg:gap-7 lg:mr-[100px]'>
 <div className='relative'>
 <Link href={"/cart"}>
   <FontAwesomeIcon
     icon={faCartShopping}
     className="text-black translate-y-[10%]  text-xl cursor-pointer"
   />
 </Link>

</div>
<div className='mr-5'>
 <Link href={'/profile'}>
   <FaRegUserCircle size={25} className="text-black" />

 </Link>

</div>
 </div>
 )
}
         
        </div>

      </div>
    </div>
  )
}

