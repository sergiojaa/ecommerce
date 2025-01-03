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

export default function Page({ isOpen, open }: PageProps) {
  const [inputOpen, setInputOpen] = useState(false);

  const handleInputOpen = () => {
    if (inputOpen !== true) {
      setInputOpen(true);
    }
  }

  // const [hamburgerOpen, setHamburgerOpen] = useState(false);
  // const [products, setProducts] = useState<Product[]>([]);
  // const [searchText, setSearchText] = useState('');
  // const toggleHamburgerOpen = () => {
  //   setHamburgerOpen(!hamburgerOpen);
  // };

  return (
    // <div className="mt-[17px]">
    //   <div className={`flex items-center md:justify-between ${!inputOpen && 'justify-between'}`}>
    //     <div className="flex items-center gap-2">
    //       <button onClick={open} className="lg:hidden">
    //         <div className="ml-[10px] translate-y-[-10%]">
    //           <div className="flex m-[6px] flex-col items-center justify-center space-y-1 w-6 cursor-pointer">
    //             {hamburgerOpen ? (
    //               <div
    //                 className="text-xl border-b w-full cursor-pointer"
    //                 onClick={toggleHamburgerOpen}
    //               >
    //                 X
    //               </div>
    //             ) : (
    //               <div className="flex flex-col gap-1 items-center" onClick={toggleHamburgerOpen}>
    //                 <div className="h-1 w-6 bg-[#69707D] rounded"></div>
    //                 <div className="h-1 w-6 bg-[#69707D] rounded"></div>
    //                 <div className="h-1 w-6 bg-[#69707D] rounded"></div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </button>
    //       {!inputOpen && (
    //         <div className=''>
    //           <div className=" md:ml-[20px]">
    //             <Link href={'/'}>
    //               <Image src={'/logo.png'} alt='logo' width={100} height={100} />
    //             </Link>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //     <div className="flex items-center w-full gap-7 lg:pr-[70px]">
    //       <Searchbar
    //         searchText={searchText}
    //         setSearchText={setSearchText}
    //         setProducts={setProducts}
    //         inputOpen={inputOpen}
    //         setInputOpen={setInputOpen}
    //         products={products}
    //       />
    //       {!inputOpen &&
    //         (
    //           <div className='flex gap-3 lg:gap-7 lg:mr-[100px]'>
    //             <div className='relative'>
    //               <Link href={"/cart"}>
    //                 <FontAwesomeIcon
    //                   icon={faCartShopping}
    //                   className="text-black translate-y-[10%]  text-xl cursor-pointer"
    //                 />
    //               </Link>

    //             </div>
    //             <div className='mr-5'>
    //               <Link href={'/profile'}>
    //                 <FaRegUserCircle size={25} className="text-black" />

    //               </Link>

    //             </div>
    //           </div>
    //         )
    //       }
    //     </div>
    //   </div>
    // </div>
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

        {/* Input Desktop */}
        <div className='w-[70%] h-[40px] text-sm mx-[35px] relative md:block hidden'>
          <input type="text" className='w-full h-full px-3 border-none outline-none bg-[#F8F8F8] rounded-xl ' placeholder='რას ეძებთ?' />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-4 text-[18px] top-[50%] transform translate-y-[-50%] text-gray-500 cursor-pointer"
          />
        </div>

        {/* Input Mobile */}

        <div className={`w-[100%] h-[40px] text-sm mx-[15px] relative md:hidden ${inputOpen ? 'block' : 'hidden'}`}>
          <input type="text" className='w-full h-full px-3 border-none outline-none bg-[#F8F8F8] rounded-xl ' placeholder='რას ეძებთ?' />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-4 text-[18px] top-[50%] transform translate-y-[-50%] text-gray-500 cursor-pointer"
          />
        </div>

        <div className={`${inputOpen ? 'block' : 'hidden'}`} onClick={() => setInputOpen(false)}>
          <FontAwesomeIcon icon={faX} className="text-secondary translate-y-[10%] text-xl cursor-pointer md:hidden block" />
        </div>

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