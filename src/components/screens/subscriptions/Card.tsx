import Image from 'next/image';
import React from 'react';

const Card = () => {
  return (
    <form className="card">
      <div className="card__flex">
        <div className="card__checkbox-block">
          <input type="checkbox" className="card__checkbox" id="checkbox__card1" />
          <label htmlFor="checkbox__card1"></label>
        </div>
        <div className="card__code">
          <label className="card__label card__code-label">License code</label>
          <div className="card__code-input-wrapper">
            <input placeholder="License code" className="card__input card__code-input"></input>
          </div>
        </div>
        <div className="card__domain">
          <label className="card__label card__domain-label">Domain</label>
          <input placeholder="Domain" className="card__input card__domain-input"></input>
        </div>
        <div className="card__btn">
          <button className="form__btn card__activate">Activate</button>
        </div>
        <div className="card__status">
          <label className="card__status-label">Status</label>
          <span className="card__status-value active">Active</span>
        </div>
      </div>
    </form>
  );
};

export default Card;
