import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React from 'react'

interface IProps {
    inputOpen: boolean;
    setInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Searchbar({ inputOpen, setInputOpen }: IProps) {
    return (
        <>
            <div className='w-[70%] h-[40px] text-sm mx-[35px] relative md:block hidden'>
                <input type="text" className='w-full h-full px-3 border-none outline-none bg-[#F8F8F8] rounded-xl ' placeholder='რას ეძებთ?' />
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute right-4 text-[18px] top-[50%] transform translate-y-[-50%] text-gray-500 cursor-pointer"
                />
            </div>
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
        </>
    )
}
