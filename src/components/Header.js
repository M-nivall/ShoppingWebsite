import React from 'react';
import { amazone,amazon,fastshop, cartimage,cart } from '../assets';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
  const productData = useSelector((state)=> state.bazar.productData);
  const userInfo = useSelector((state)=> state.bazar.userInfo);
  console.log("userInfo", userInfo);
  return (
    <div className='w-full h-20 bg-white border-b-[1px] border-b-gray-800 sticky top-0 z-50'>
        <div className='max-w-screen-xl h-full mx-auto flex items-center justify-between'>
        <Link to="/">
          <div> 
            <img className='w-30 h-[75px] ml-7' src={amazone} alt='amazone'/>
          </div>
        </Link>
          <div className='flex items-center gap-5 mr-10'>
            <ul className='flex items-center gap-5'>
                <li className='text-base text-black font-bold hover:text-orange-900
                 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Home</li>
                <li className='text-base text-black font-bold hover:text-orange-900
                 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Pages</li>
                <li className='text-base text-black font-bold hover:text-orange-900
                 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Shop</li>
                <li className='text-base text-black font-bold hover:text-orange-900
                 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Element</li>
                <li className='text-base text-black font-bold hover:text-orange-900
                 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Blog</li>
            </ul>
            <Link to="/cart">
              <div className='relative'>
                  <img className='w-12' src={cartimage} alt='cartimage'/>
                  <span className='absolute w-12 top-4 text-sm flex items-center 
                  justify-center font-semibold'>
                    {productData.length}
                  </span>
              </div>
            </Link>
           <Link to="/login">
              <img className='w-9 h-9 rounded-full' src={userInfo ? userInfo.image : cart} alt='cart'/>
           </Link>
           {userInfo && <p className='texu-base font-titleFont font-semibold underline underline-offset-2'>{userInfo.name}</p>}
          </div>
        </div>
    </div>
  )
}

export default Header