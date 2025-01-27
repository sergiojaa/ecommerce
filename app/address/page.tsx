import React from 'react'
import Image from 'next/image'
export default function page() {
  return (

    // <div className='flex flex-col h-screen-minus-header  items-center md:flex-row justify-center gap-10 '>

    //   <div className='w-[350px] md:w-[400px] xl:w-[600px] h-[500px] m-3'>
    //   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.5146345842645!2d44.77988627607706!3d41.7309912712583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404472c3f056422b%3A0x19cba960a2874a3f!2zU2hvcCA0MCwgNyBSYWZhZWwgQWdsYWR6ZSBTdCwg4YOX4YOR4YOY4YOa4YOY4YOh4YOY!5e0!3m2!1ska!2sge!4v1734208974214!5m2!1ska!2sge" width="100%" height="100%"></iframe>

    //   </div>
    //   <div className='m-3 flex flex-col gap-5 '>
    //   <div className='flex flex-col gap-1'>
    //     <h2 className='text-lg'>ჩვენი მისამართი</h2>
    //     <p>Tbilisi, 7 Agladze St., Shop 40</p>
    //   </div>
    //   <div className='flex flex-col gap-1'>
    //     <h2 className='text-lg'>სამუშაო საათები</h2>
    //     <p>ორშაბათი - კვირა: 9am - 5pm</p>
    //   </div>
    //   <div className='flex flex-col gap-1'>
    //     <h2 className='text-lg'>კონტაქტი</h2>
    //     <p>მეილი:rgrgroup2007@gmail.com</p>
    //     <p className='mt-2'>ტელეფონი: +995 557 21 06 26</p>
    //   </div>
    //   </div>

    // </div>
    <div className='bg-secondary max-w-max mx-auto'>
      <div className='md:flex gap-10 justify-center '>
        <div className='flex flex-col items-center justify-center '>
          <div className='flex flex-col items-center '>
            <h2 className='text-white'>Get in Touch</h2>
            <p className='w-[280px] text-white'>თუ გაქვთ შეკითხვები ან გჭირდებათ დამატებითი ინფორმაცია, დაგვიკავშირდით და ჩვენ სწრაფად გიპასუხებთ!</p>
          </div>
          <div>
            <form action="" className='gap-5 mt-5 flex flex-col items-center'>
              <input
                type="text"
                placeholder="სახელი"
                className="border border-gray-300 w-[290px] p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Email"
                className="border border-gray-300 w-[290px] p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-300 w-[290px] p-2 rounded-md"
              />
              <button className="border border-gray-300 bg-secondary text-white w-[290px] p-2 rounded-md">
                გაგზავნა
              </button>
            </form>
            <div className='flex justify-center ml-3 mt-10 items-center gap-10'>
              <div className='flex items-center gap-5'>
                <Image src={'/mobile.png'} width={25} height={50} alt='mobile icon' />
                <div className='flex flex-col'>
                  <p>Phone</p>
                  <p>557210626</p>
                </div>
              </div>
              <div className='flex gap-5' >
                <Image src={'/email.png'} width={25} height={50} alt='mobile icon' />
                <div>
                  <p>Email</p>
                  <p>rgrgroup@gmail.com</p>
                </div>
              </div>
            </div>


          </div>
        </div>

        <div>
          <div className='w-[280px] md:h-[400px]  h-[300px] m-3'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.5146345842645!2d44.77988627607706!3d41.7309912712583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404472c3f056422b%3A0x19cba960a2874a3f!2zU2hvcCA0MCwgNyBSYWZhZWwgQWdsYWR6ZSBTdCwg4YOX4YOR4YOY4YOa4YOY4YOh4YOY!5e0!3m2!1ska!2sge!4v1734208974214!5m2!1ska!2sge" width="100%" height="100%"></iframe>

          </div>
        </div>
      </div>
    </div>
  )
}
