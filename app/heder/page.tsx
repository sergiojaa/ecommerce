"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function page({
  isOpen,
  open,
}: {
  isOpen: boolean;
  open: () => void;
}) {
  return (
    <div className="flex justify-between py-3 items-center bg-red-500 mt-7">
      <div className="flex items-center">
        <div>
          <button onClick={open} className="lg:hidden">
            <div className="ml-[10px] translate-y-[-10%] ">
              <div className="flex m-[6px] flex-col items-center justify-center space-y-1 w-6 cursor-pointer">
                <div className="h-1 w-full bg-white rounded"></div>
                <div className="h-1 w-full bg-white rounded"></div>
                <div className="h-1 w-full bg-white rounded"></div>
              </div>
            </div>
          </button>
        </div>

        <div>
          <h1 className="  text-2xl text-yellow-200  ml-[20px]   font-bold">
            <Link href={"/"}>
              <span>Beverage</span>
            </Link>
          </h1>
        </div>



      </div>

      <div className="flex-[0.5] hidden md:flex relative">
        <input
          placeholder="რას ეძებ?"
          type="search"
          className=" flex-1 rounded-xl outline-none border-none pl-2 py-2 w-full"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="w-6 text-black text-lg absolute cursor-pointer right-2 top-[50%] translate-y-[-50%]"
        />
      </div>

      <div className="flex items-center">
        <div className="  md:hidden flex items-center rounded-xl mr-[9px] mb-[3px]">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-6 text-white text-lg "
          />
        </div>
        <div className="flex items-center gap-3">
          <Link href={"/cart"}>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-white  text-lg cursor-pointer"
            />
          </Link>
          <FontAwesomeIcon
            icon={faUser}
            style={{ color: "#ffffff" }}
            className="w-5 h-5 mr-3 translate-y-[-10%]"
          />
        </div>
      </div>
    </div>
  );
}
