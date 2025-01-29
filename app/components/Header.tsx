import React, { useState } from 'react';
import Link from 'next/link';
import Searchbar from './Searchbar';
import { faCartShopping, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import { FaRegUserCircle } from 'react-icons/fa';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import MobileMenu from './MobileMenu';

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

  const handleMenuOpen = () => {
    open();
  }

  return (
    <div  >
      <div className='w-full flex items-center justify-center h-[60px]  px-[30px] md:px-[50px] shadow-sm'>
        <div className='container flex items-center justify-between'>

          <div className='flex items-center gap-3'>

            <div className={`flex flex-col gap-1 cursor-pointer md:hidden ${isOpen && 'hidden'}`} onClick={handleMenuOpen}>
              <div className='w-[20px] h-[2px] bg-black'></div>
              <div className='w-[20px] h-[2px] bg-black'></div>
              <div className='w-[20px] h-[2px] bg-black'></div>
            </div>

            <div onClick={handleMenuOpen} className={`px-[2.5px] md:hidden ${isOpen ? 'block' : 'hidden'}`}>
              <FontAwesomeIcon
                icon={faX}
                className="text-black text-xl cursor-pointer block"
              />
            </div>

            {/* Logo */}
            <Link href={'/'} className={`xl:ml-10 ${inputOpen ? 'hidden' : 'block'}`}>
              <Image className='' src={'/logo.png'} alt='logo' width={100} height={100} />
            </Link>
          </div>

          {/* Searchbar */}
          <Searchbar inputOpen={inputOpen} setInputOpen={setInputOpen} />

          {/* Right side */}
          <div className={`flex gap-6 items-center ${inputOpen && 'hidden'}`}>
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
              <FaRegUserCircle className="text-secondary  text-2xl" />
            </Link>
            <div className='  flex gap-4 xl:mr-16  items-center'>
              <FontAwesomeIcon
                icon={faPhone}
                style={{ color: "#a63446" }}
              />
              <p className=' hidden text-[17px] lg:block text-secondary  '>+995 557 210 626</p>
            </div>
          </div>



        </div>

      </div>


    </div>

  );
}