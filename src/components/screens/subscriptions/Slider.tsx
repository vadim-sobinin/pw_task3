import Image from 'next/image';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { FreeMode, Navigation } from 'swiper';
import Slide from './Slide';
import NavSlider from './NavSlider';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      // pagination={{
      //   type: 'fraction',
      // }}
      slidesPerView={'auto'}
      centeredSlides={true}
      freeMode={true}
      spaceBetween={28}
      // centerInsufficientSlides={true}
      centeredSlidesBounds={false}
      modules={[Navigation, FreeMode]}
      onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      className="mySwiper">
      <SwiperSlide>{({ isActive }) => <Slide isActive={isActive} />}</SwiperSlide>
      <SwiperSlide>{({ isActive }) => <Slide isActive={isActive} />}</SwiperSlide>
      <SwiperSlide>{({ isActive }) => <Slide isActive={isActive} />}</SwiperSlide>
      <SwiperSlide>{({ isActive }) => <Slide isActive={isActive} />}</SwiperSlide>
      <SwiperSlide>{({ isActive }) => <Slide isActive={isActive} />}</SwiperSlide>
      <SwiperSlide>{({ isActive }) => <Slide isActive={isActive} />}</SwiperSlide>
      <NavSlider activeIndex={activeIndex} />
    </Swiper>
  );
};

export default Slider;
