import React, { useState } from 'react';
import { bg1, bg2, bgclothes, bg3 } from '../assets';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [bg2, bg1, bg3, bgclothes];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % data.length);
};
  return (
    <div className='w-full h-auto overflow-x-hidden'>
      <div className='w-screen h-[600px] relative'>
        {/* Slide Images */}
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className='w-[400vw] h-full flex transition-transform duration-1000'
        >
          {data.map((imgSrc, index) => (
            <img
              key={index}
              className='w-screen h-full object-cover'
              src={imgSrc}
              alt={`slide-${index}`}
              loading='priority'
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className='absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-44 z-10'>
          <div
            onClick={prevSlide}
            className='w-14 h-12 border border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300'
          >
            <HiArrowLeft />
          </div>
          <div
            onClick={nextSlide}
            className='w-14 h-12 border border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300'
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
