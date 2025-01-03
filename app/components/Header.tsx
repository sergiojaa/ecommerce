import React, { useState } from 'react';
import Link from 'next/link';
import Searchbar from './Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faX } from '@fortawesome/free-solid-svg-icons';
import { FaRegUserCircle } from 'react-icons/fa';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export interface Product {
  _id: number | string;
  name: string;
  price: number;
}

interface PageProps {
  isOpen: boolean;
  open: () => void;
}

export default function Header({ isOpen, open }: PageProps) {
  const [inputOpen, setInputOpen] = useState(false);

  const handleInputOpen = () => {
    if (inputOpen !== true) {
      setInputOpen(true);
    }
  }


  return (

    <div className='w-full flex items-center justify-center h-[83px] px-[30px] md:px-0'>
      <div className='container flex items-center justify-between'>

        {/* Left Side */}
        <div className='flex items-center gap-3'>

          {/* Hamburger Menu */}
          <div className='flex flex-col gap-1 md:hidden'>
            <div className='w-[20px] h-[2px] bg-black'></div>
            <div className='w-[20px] h-[2px] bg-black'></div>
            <div className='w-[20px] h-[2px] bg-black'></div>
          </div>

          {/* Logo */}
          <Link href={'/'} className={`${inputOpen ? 'hidden' : 'block'}`}>
            <Image src={'/logo.png'} alt='logo' width={100} height={100} />
          </Link>
        </div>

        {/* Searchbar */}
        <Searchbar inputOpen={inputOpen} setInputOpen={setInputOpen} />

        {/* Right side */}
        <div className={`flex gap-3 ${inputOpen && 'hidden'}`}>
          <div onClick={handleInputOpen}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-secondary translate-y-[10%] text-xl cursor-pointer md:hidden block"
            />
          </div>

          <Link href={"/cart"}>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-secondary translate-y-[10%]  text-xl cursor-pointer"
            />
          </Link>

          <Link href={'/profile'}>
            <FaRegUserCircle className="text-secondary text-2xl" />
          </Link>
        </div>

      </div>
    </div>
  );
}