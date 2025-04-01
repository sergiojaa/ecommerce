import Link from 'next/link'
import React from 'react'

import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";


const links = [
  { href: '/', name: 'მთავარი' },
  { href: '/address', name: 'კონტაქტი' },
  { href: '/about-us', name: 'ჩვენს შესახებ' },
  { href: '/rules', name: 'წესები და პირობები' },
]

const categories = [
  { href: '/category?category=ელექტრო%20სადენები', name: 'ელექტრო სადენები' },
  { href: '/category?category=ავტომატური%20ამომრთველები%2Cკონტაქტორები', name: 'კონტაქტორები' },
  { href: '/category?category=ელექტრო%20ფურნიტურა%20', name: 'ელექტრო ფურნიტურა' },
  { href: '/category?category=სანათი%2Cნათურა%2C%20გარე%20განათება', name: 'განათება' },
]

export default function Footer() {
  return (
    <footer className='bg-secondary text-white px-[20px] md:px-[100px] py-[70px] mt-[100px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] md:gap-[70px] justify-center'>

        <div className='w-full'>
          <h1 className='font-bold text-[18px]'>RGR Group</h1>
          <p className='mt-[10px]'>
            ელექტროობის მაღაზია საქართველოში,რომელიც გთავაზობთ მაღალი ხარისხის ელექტრო-ტექნიკურ პროდუქციას.
          </p>
        </div>

        <div>
          <h1 className='font-bold text-[18px]'>სწრაფი ბმულები</h1>
          <ul className='mt-[10px] flex flex-col gap-[10px]'>
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className='font-bold text-[18px]'>კატეგორიები</h1>
          <ul className='mt-[10px] flex flex-col gap-[10px]'>
            {categories.map((category) => (
              <li key={category.name}>
                <Link href={category.href}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className='font-bold text-[18px]'>დაგვიკავშირდით</h1>
          <ul className='mt-[10px] flex flex-col gap-[10px]'>
            <li className='flex items-center gap-2'>
              <FaLocationDot />
              <p>Tbilisi, 7 Agladze St., Shop 40</p>
            </li>
            <li className='flex items-center gap-2'>
              <FaPhoneAlt />
              <a href="tel:+995557210626" className="text-white">
                +995 557 210 626
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <IoMail />
              <p>eliava@gmail.com</p>
            </li>
          </ul>
        </div>

      </div>
    </footer>


  )
}
