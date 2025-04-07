'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'
export default function AdminSidebar() {
    const router = useRouter()

    const logOut = () => {
        localStorage.removeItem('token');
        router.push('/'); // Redirect to home after logout
    };
    return (
        <div className='flex-1 flex justify-center'>
            <div>
                <ul className=' flex flex-col gap-6 '>
                    <Link href={'/admin/create'}>
                        <li className='flex items-center gap-4  cursor-pointer'>
                            <FaPlus />
                            პროდუქტის შექმნა
                        </li>
                    </Link>
                    <hr className='w-[200px]' />
                    <li className='flex items-center gap-4 cursor-pointer'>
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.957 7.42168L5.45703 3.09668" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.707 12.9218V6.25513C16.7067 5.96286 16.6296 5.6758 16.4833 5.42276C16.337 5.16972 16.1268 4.9596 15.8737 4.81346L10.0404 1.48013C9.787 1.33385 9.49959 1.25684 9.20703 1.25684C8.91447 1.25684 8.62706 1.33385 8.3737 1.48013L2.54036 4.81346C2.28725 4.9596 2.07701 5.16972 1.93075 5.42276C1.78448 5.6758 1.70733 5.96286 1.70703 6.25513V12.9218C1.70733 13.2141 1.78448 13.5011 1.93075 13.7542C2.07701 14.0072 2.28725 14.2173 2.54036 14.3635L8.3737 17.6968C8.62706 17.8431 8.91447 17.9201 9.20703 17.9201C9.49959 17.9201 9.787 17.8431 10.0404 17.6968L15.8737 14.3635C16.1268 14.2173 16.337 14.0072 16.4833 13.7542C16.6296 13.5011 16.7067 13.2141 16.707 12.9218Z" stroke="currentColor" strokeWidth="1.71591" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1.93164 5.38867L9.20664 9.59701L16.4816 5.38867" stroke="currentColor" strokeWidth="1.71591" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.20898 17.9879V9.58789" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        შეკვეთები
                    </li>
                    <hr className='w-[200px]' />
                    <li className='flex items-center gap-4 cursor-pointer'>
                        <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5812 1.16992H2.94484C2.10804 1.16992 1.42969 1.85393 1.42969 2.6977V11.8644C1.42969 12.7081 2.10804 13.3921 2.94484 13.3921H16.5812C17.418 13.3921 18.0964 12.7081 18.0964 11.8644V2.6977C18.0964 1.85393 17.418 1.16992 16.5812 1.16992Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1.42969 5.61426H18.0964" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        რედაქტირება
                    </li>
                    <hr className='w-[200px]' />
                    {/* <Link href={'/address'}>
                        <li className='flex items-center gap-4 cursor-pointer'>
                            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.707 8.43652C16.707 14.2699 9.20703 19.2699 9.20703 19.2699C9.20703 19.2699 1.70703 14.2699 1.70703 8.43652C1.70703 6.4474 2.49721 4.53975 3.90373 3.13322C5.31025 1.7267 7.21791 0.936523 9.20703 0.936523C11.1962 0.936523 13.1038 1.7267 14.5103 3.13322C15.9169 4.53975 16.707 6.4474 16.707 8.43652Z" stroke="currentColor" strokeLinejoin="round"></path><path d="M9.20898 10.9365C10.5897 10.9365 11.709 9.81724 11.709 8.43652C11.709 7.05581 10.5897 5.93652 9.20898 5.93652C7.82827 5.93652 6.70898 7.05581 6.70898 8.43652C6.70898 9.81724 7.82827 10.9365 9.20898 10.9365Z" stroke="currentColor" strokeLinejoin="round"></path></svg>
                            მისამართები
                        </li>
                    </Link> */}

                    {/* <hr className='w-[200px]' /> */}



                </ul>
            </div>
        </div>
    )
}
