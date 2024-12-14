import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col h-screen-minus-header items-center md:flex-row justify-center gap-10 '>
      
      <div className='w-[500px] h-[500px] m-3'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.5146345842645!2d44.77988627607706!3d41.7309912712583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404472c3f056422b%3A0x19cba960a2874a3f!2zU2hvcCA0MCwgNyBSYWZhZWwgQWdsYWR6ZSBTdCwg4YOX4YOR4YOY4YOa4YOY4YOh4YOY!5e0!3m2!1ska!2sge!4v1734208974214!5m2!1ska!2sge" width="100%" height="100%"></iframe>

      </div>
      <div className='m-3 flex flex-col gap-5 md:mt-10'>
      <div className='flex flex-col gap-1'>
        <h2 className='mb-2 text-lg'>ჩვენი მისამართი</h2>
        <p>Tbilisi, 7 Agladze St., Shop 40</p>
      </div>
      <div className='flex flex-col gap-1'>
        <h2 className='text-lg'>სამუშაო საათები</h2>
        <p>ორშაბათი - კვირა: 9am - 5pm</p>
      </div>
      <div className='flex flex-col gap-1'>
        <h2 className='text-lg'>კონტაქტი</h2>
        <p>მეილი:rgrgroup2007@gmail.com</p>
        <p className='mt-2'>ტელეფონი: +995 557 21 06 26</p>
      </div>
      </div>
     
    </div>
  )
}
