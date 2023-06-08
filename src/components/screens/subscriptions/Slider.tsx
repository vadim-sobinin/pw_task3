import Image from 'next/image';
import React, { FC, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { FreeMode, Navigation } from 'swiper';
import Slide from './Slide';
import NavSlider from './NavSlider';
import { SubscribeType } from '@/types';
type SliderPropsType = {
  subList: SubscribeType[];
  setSelectedSub: (id: number) => void;
};

const Slider: FC<SliderPropsType> = ({ subList, setSelectedSub }) => {
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
      {subList &&
        subList.map((sub) => (
          <SwiperSlide key={sub.id}>
            {({ isActive }) => (
              <Slide sub={sub} isActive={isActive} setSelectedSub={setSelectedSub} />
            )}
          </SwiperSlide>
        ))}

      <NavSlider activeIndex={activeIndex} />
    </Swiper>
  );
};

export default Slider;
