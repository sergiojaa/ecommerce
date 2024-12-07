"use client"
import  { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header({ isOpen, open }: { isOpen: boolean; open: () => void }) {
    
  return (
    <div >
      <div className="flex items-center justify-between px-3 gap-3  bg-[#1570EF] ">
        <div className="">
        <h1 className="text-2xl text-white font-bold">
  <span className="block sm:hidden">E</span>
  <span className="hidden sm:block">Eccommerce</span>
</h1>
        </div>
        <div className="flex  items-center border my-2 bg-white rounded-md p-2 w-full max-w-[600px]">
          {/* Icon */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-6 text-gray-500 text-lg"
          />
          {/* Input */}
          <input
            placeholder="რას ეძებ?"
            type="search"
            className="flex-1  outline-none border-none pl-2"
          />
        </div>

        <div>
  {/* Button for screens smaller than 768px */}
  <button onClick={open} className="md:hidden">
    <div className="flex m-[10px] flex-col items-center justify-center space-y-1 w-6 cursor-pointer">
      <div className="h-1 w-full bg-white rounded"></div>
      <div className="h-1 w-full bg-white rounded"></div>
      <div className="h-1 w-full bg-white rounded"></div>
    </div>
  </button>

  {/* Div for screens 768px and larger */}
  <div className="hidden md:block">
    after 768px
  </div>
</div>


      </div>
    </div>
  );
}
