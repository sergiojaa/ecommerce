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
      <div className="flex items-center gap-3">
      <div className=" md:bg-white md:flex items-center md:p-2 rounded-xl    ">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" md:text-gray-500  w-6 text-white text-lg "
          />

          <input
            placeholder="რას ეძებ?"
            type="search"
            className="hidden md:flex flex-1 rounded-xl outline-none border-none pl-2"
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
