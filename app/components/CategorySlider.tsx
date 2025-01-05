'use client'
import React, { useState } from 'react'
import { categoryData } from '../data'

export default function CategorySlider() {
  const [category, setCategory] = useState(categoryData)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5

  // Handle next page
  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < category.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Handle previous page
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Paginate the category list
  const displayedCategories = category.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className='relative'>
      {/* Pagination Controls Container */}
      <div className='flex gap-2 justify-center items-center'>
        {/* Previous Button */}
        <div
          className='bg-primary w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer'
          onClick={handlePrevious}
        >
          <svg width="20" height="15" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00016 10.6668L1.3335 6.00016L6.00016 1.3335" stroke="white"></path>
          </svg>
        </div>

        {/* Category List */}
        <ul className='flex justify-center gap-4 mb-4'>
          {displayedCategories.map((names) => (
            <li
              className='text-[13px] text-white bg-primary w-[130px] rounded-xl h-[170px] flex justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer'
              key={names.id}
            >
              {names.name}
            </li>
          ))}
        </ul>

        {/* Next Button */}
        <div
          className='bg-primary w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer'
          onClick={handleNext}
        >
          <svg width="20" height="15" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.999999 1L5 5L1 9" stroke="white"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
