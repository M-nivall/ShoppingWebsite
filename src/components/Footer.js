import React from 'react';
import {amazone}  from '../assets';

const Footer = () => {
  return (
    <div className='bg-black text-[#949494] py-20 font-titleFont'>
        <div className='max-w-screen-xl ml-20 grid grid-cols-4'>
           <div className='flex flex-col gap-7'>
            <img className='w-10' src={amazone} alt='amazone'/>
            <p className='text-white text-sm tracking-wide'>@React.Dom</p>
            {/*=======payment images here========*/}
             <div>
                 {/*=======icon1 here========*/}
                 {/*=======icon2 images here========*/}
                 {/*=======icon3 images here========*/}
                 {/*=======icon4 images here========*/}   
             </div>
          </div>
          <div>
            <h2 className='text-2xl font-semibold text-white mb-4'>Locate us</h2>
            <div className='text-base flex flex-col gap-2s'>
                <p>Michael Niva</p>
                <p>Phone: +254745445459</p>
                <p>Email: nivahmichael@gmail.com</p>
            </div>
          </div>
          <div>
          <h2 className='text-2xl font-semibold text-white mb-4'>profile</h2>
          </div>
        </div>
    </div>
  )
}

export default Footer