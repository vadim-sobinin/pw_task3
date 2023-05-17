import { SubscribeType } from '@/types';
import Image from 'next/image';
import { FC } from 'react';

type SlidePropsType = {
  isActive: boolean;
  sub: SubscribeType;
};

const formatDate = (date: Date) => {
  let dd = String(date.getDate());
  if (+dd < 10) dd = '0' + dd;

  let mm = String(date.getMonth() + 1);
  if (+mm < 10) mm = '0' + mm;

  let yy = String(date.getFullYear());
  if (+yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
};

const Slide: FC<SlidePropsType> = ({ isActive, sub }) => {
  const date = new Date(Number(sub.currentPeriodEnd));
  const validUntil = formatDate(date);
  return (
    <div className={`subscription__slide ${isActive ? 'active' : ''}`}>
      <div className="sub-slide__title">
        <div className="sub-slide__name">GScore</div>
        <div className="sub-slide__status">{sub.status}</div>
      </div>
      <div className="sub-slide__divider"></div>
      <div className="sub-slide__value">
        <div className="sub-slide__name">
          <h3 className="sub-slide__sub-name">{sub.product.name}</h3>
          <span className="sub-slide__expires">valid until {validUntil}</span>
        </div>
        <div className="sub-slide__price">
          <span>{sub.product.prices[0].price}$</span>
        </div>
      </div>
      <button className="form__btn sub-slide__btn">View</button>
    </div>
  );
};

export default Slide;
