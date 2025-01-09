'use client'
import React, { useState, useRef } from 'react'
import { categoryData } from '../data'
import { faChevronLeft, faChevronRight, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function CategorySlider() {
  const [category] = useState(categoryData)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    isDragging.current = true
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft
    scrollLeft.current = scrollContainerRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5 // Adjust scroll sensitivity
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUpOrLeave = () => {
    isDragging.current = false
  }

  const scrollLeftHandler = () => {
    if (scrollContainerRef.current) {
      const itemWidth = 150 + 12 // Item width + gap (adjust if necessary)
      scrollContainerRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' })
    }
  }

  const scrollRightHandler = () => {
    if (scrollContainerRef.current) {
      const itemWidth = 150 + 12 // Item width + gap (adjust if necessary)
      scrollContainerRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' })
    }
  }

  return (
    <div className='relative flex items-center justify-center mt-5 w-[80%] md:container z-[2] xl:max-w-[1000px] mx-auto px-[20px]'>
      {/* Left Button */}
      <div
        className='bg-secondary px-5 py-3 rounded-[50%] absolute left-[0] z-[1] cursor-pointer'
        onClick={scrollLeftHandler}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      {/* Scrollable Container */}
      <div
        className='flex gap-2 items-center overflow-x-auto z-[-2]'
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        style={{
          cursor: isDragging.current ? 'grabbing' : 'grab',
          scrollbarWidth: 'none', // For Firefox
        }}
      >
        {/* Category List */}
        <ul className='flex justify-center text-center gap-4 mb-4'>
          {category.map((names) => (
            <Link href={names.url} key={names.id}

              className='text-[13px] text-white bg-primary w-[150px] rounded-xl h-[170px] flex flex-col items-center justify-between py-[30px] gap-3 shadow-lg  cursor-pointer'
              style={{ userSelect: 'none' }} // Make text non-selectable
            >
              <FontAwesomeIcon className='text-2xl' icon={faList} />
              <p className='w-[90%]'>{names.name}</p>
            </Link>
          ))}
        </ul>
      </div>
      {/* Right Button */}
      <div
        className='bg-secondary px-5 py-3 rounded-[50%] absolute right-[-0.5rem] z-[1] cursor-pointer'
        onClick={scrollRightHandler}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  )
}
