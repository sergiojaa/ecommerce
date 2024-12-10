"use client"
import  { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,faCartShopping  } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { faUser } from '@fortawesome/free-regular-svg-icons';

export default function Header({ isOpen, open }: { isOpen: boolean; open: () => void }) {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const toggleInputVisibility = () => {
    setIsInputVisible((prev) => !prev);
  };
  return (
    <div >
      <div className="flex items-center justify-between px-3 gap-3 p-3  bg-[#1570EF] ">
      <button onClick={open} className="lg:hidden">
    <div className="flex m-[6px] flex-col items-center justify-center space-y-1 w-6 cursor-pointer">
      <div className="h-1 w-full bg-white rounded"></div>
      <div className="h-1 w-full bg-white rounded"></div>
      <div className="h-1 w-full bg-white rounded"></div>
    </div>
  </button>
        <div >
          
        <h1 className="text-2xl text-white  font-bold">
          
          <Link href={'/'}>
            {/* <span className="">E</span> */}
            <span className="ml-[-5px] md:ml-[-100px] ">Beverage</span>
            </Link>
          </h1>
        
        </div>
        
        <div className=" md:bg-white   flex gap-3  items-center rounded-md p-1  ">
          
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" md:text-gray-500  w-6 text-white text-lg translate-y-[10%]"
          />
          
          <input
          
            placeholder="რას ეძებ?"
            type="search"
            className="hidden md:flex flex-1 rounded-xl outline-none border-none pl-2"
            />
          
          
         
        </div>
        <div className="flex gap-5 items-center md:mr-[20px]">
  <Link href={'/cart'}>
  <FontAwesomeIcon
    icon={faCartShopping}
    className="text-white translate-y-[20%]  text-lg cursor-pointer"
    />
  </Link>
  <FontAwesomeIcon 
      icon={faUser} 
      style={{ color: "#ffffff" }} 
      className="w-5 h-5"  
    />  
  </div>

        

    
    
</div>




      </div>
    
  );
}
