import Image from 'next/image';
import { FC } from 'react';

type SlidePropsType = {
  isActive: boolean;
};

const Slide: FC<SlidePropsType> = ({ isActive }) => {
  return (
    <div className={`subscription__slide ${isActive ? 'active' : ''}`}>
      <div className="sub-slide__title">
        <div className="sub-slide__name">GScore</div>
        <div className="sub-slide__status">Active</div>
      </div>
      <div className="sub-slide__divider"></div>
      <div className="sub-slide__value">
        <div className="sub-slide__name">
          <h3 className="sub-slide__sub-name">Single site license</h3>
          <span className="sub-slide__expires">valid until 21.10.2022</span>
        </div>
        <div className="sub-slide__price">
          <span>$77</span>
        </div>
      </div>
      <button className="form__btn sub-slide__btn">View</button>
    </div>
  );
};

export default Slide;
