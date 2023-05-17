import React, { FC } from 'react';
import Slider from './Slider';
import Card from './Card';
import { SubscribeType } from '@/types';

type Props = {
  subList: SubscribeType[];
};

const Subscriptions: FC<Props> = ({ subList }) => {
  // console.log(subList);

  return (
    <section className="subscriptions">
      <div className="container">
        <div className="subscription__header">
          <h2 className="subscription__title">My subscriptions</h2>
          <a href="#" className="form__btn subscription__upgrade">
            Upgrade
          </a>
        </div>
      </div>
      {/* {subList && subList.map((sub) => <div key={sub.id}>{sub.product.name}</div>)} */}
      <Slider subList={subList} />
      <div className="container subscription__cards">
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

export default Subscriptions;
