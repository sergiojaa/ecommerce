import React from 'react'

type userDataType = {
    email: string,
    userName: string,
    mobileNumber: string,
}

export default function ProfileInformation({ userData }: { userData: userDataType }) {
    return (
        <>
            <div>

            </div>
            <div className='flex justify-between mt-[2rem]   items-center'>
                <div>
                    <h3>მეილი</h3>
                    <h4 className='text-[13px] mt-[0.5rem] '>{userData.email}</h4>
                </div>
                <div>
                    <h4 className='text-blue-500 cursor-pointer  items-center xl:mr-[20rem] mr-[2rem] '
                    >შეცვლა</h4>
                </div>


            </div>
            <hr className='w-[270px] mt-[1rem] mb-[1rem] md:w-[450px] lg:w-[700px] xl:w-[800px] ' />

            <div className='flex  justify-between items-center'>
                <div>
                    <h2 className='text-[15px]'>სახელი,გვარი</h2>
                    <h2 className='text-[13px] mt-[0.5rem]'>{userData.userName}</h2>
                </div>

                <div>
                    <h3 className='text-blue-500  cursor-pointer xl:mr-[20rem] mr-[2rem] '>შეცვლა</h3>
                </div>

            </div>
            <hr className='w-[270px] mt-[1rem] mb-[1rem] md:w-[450px] lg:w-[700px] xl:w-[800px] ' />
            <div className='flex  justify-between  items-center'>
                <div>
                    <h3>მობილურის ნომერი</h3>
                    <h4 className='mt-[0.5rem]'>{userData.mobileNumber}</h4>
                </div>
                <div>
                    <h4 className='text-blue-500 cursor-pointer xl:mr-[20rem] mr-[2rem] '>შეცვლა</h4>

                </div>

            </div><hr className='w-[270px] mt-[1rem] mb-[1rem] md:w-[450px] lg:w-[700px] xl:w-[800px] ' /></>)
}
