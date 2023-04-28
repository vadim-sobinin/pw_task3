import React from 'react';
import Slider from './Slider';
import Card from './Card';

const Subscriptions = () => {
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
      <Slider />
      <div className="container subscription__cards">
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

export default Subscriptions;
