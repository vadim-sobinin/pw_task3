import Image from 'next/image';
import { FC } from 'react';
import { useSwiper } from 'swiper/react';

type NavSliderType = {
  activeIndex: number;
};

const NavSlider: FC<NavSliderType> = ({ activeIndex }) => {
  const swiper = useSwiper();

  return (
    <div className="subscription__slider-nav slider-nav">
      <div
        className={`slider-nav__arrow slider-nav__arrow-left ${
          activeIndex === 0 ? 'disabled' : ''
        }`}
        onClick={() => swiper.slidePrev()}>
        <Image src={'../img/svg/arrow.svg'} width={44} height={44} alt={'previous slide'} />
      </div>
      <div className="slider-nav__counter">
        {activeIndex + 1}
        <span className="slider-nav__counter-total">/{swiper.slides.length}</span>
      </div>
      <div
        className={`slider-nav__arrow slider-nav__arrow-right ${
          activeIndex + 1 === swiper.slides.length ? 'disabled' : ''
        }`}
        onClick={() => swiper.slideNext()}>
        <Image src={'../img/svg/arrow.svg'} width={44} height={44} alt={'next slide'} />
      </div>
    </div>
  );
};

export default NavSlider;
