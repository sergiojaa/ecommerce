import React, { useRef } from 'react'
import { IoCloseOutline } from "react-icons/io5";


export default function CategoryList({ selectedCategory, setSelectedCategory }: { selectedCategory: string[], setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>> }) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleCategorySelection = () => {
        if (!inputRef.current?.value) {
            return;
        }

        if (selectedCategory.find(category => category === inputRef.current?.value)) {
            return;
        }

        setSelectedCategory(prev => [...prev, inputRef.current!.value]);
    };

    const handleCategoryDeletion = (category: string) => {
        setSelectedCategory(prev => prev.filter(item => item !== category));

    }


    return (
        <div className='flex flex-col gap-[50px]'>
            <div className='flex justify-between'>
                <div className='flex-1'>
                    <h1 className='font-bold text-md'>პროდუქციის აღწერა</h1>
                    <p className='text-gray-500 text-xs'>ჩაწერეთ პროდუქტის აღწერა</p>
                </div>
                <div className='flex-[2] flex items-center justify-between'>
                    <input ref={inputRef} type="text" className='text-sm px-[5px] py-[10px] rounded-md w-[80%] border-[1px] border-solid border-gray-500' placeholder='პროდუქტის აღწერა' />
                    <button onClick={handleCategorySelection} type='button' className='bg-blue-500 tex-twhite rounded-md h-full px-[10px] text-white font-bold'>დამატება</button>
                </div>
            </div>
            <div className='flex'>
                {selectedCategory.map((category) => (
                    <div key={category} className='bg-blue-500 text-white ml-[10px] px-[50px] min-w-[100px] py-[10px] flex items-center justify-center gap-[10px] relative'>
                        <IoCloseOutline className='absolute left-0 top-0 text-xl cursor-pointer' onClick={() => handleCategoryDeletion(category)} />
                        <div className=''>{category}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
