import { getCookie } from '@/services/cookie';
import { SubscribeService } from '@/services/subscribe.service';
import { codesType } from '@/types';
import Image from 'next/image';
import React, { ButtonHTMLAttributes, FC, MouseEvent, useState } from 'react';

type CardPropsType = {
  codeData: codesType;
};

const Card: FC<CardPropsType> = ({ codeData }) => {
  const [data, setData] = useState(codeData);
  const onClickActivate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = getCookie('key');
    if (token) {
      const response = await SubscribeService.activateCode(token, codeData.code);
      if (response.status == 201) {
        const newData = { ...data };
        newData.origin = response.data.origin;
        newData.status = response.data.status;
        setData(newData);
      }
    }
  };

  return (
    <form className="card">
      <div className="card__flex">
        <div className="card__checkbox-block">
          <input type="checkbox" className="card__checkbox" id={`checkbox__card${codeData.id}`} />
          <label htmlFor={`checkbox__card${data.id}`}></label>
        </div>
        <div className="card__code">
          <label className="card__label card__code-label">License code</label>
          <div className="card__code-input-wrapper">
            <input
              placeholder="License code"
              className="card__input card__code-input"
              defaultValue={data.code}></input>
          </div>
        </div>
        <div className="card__domain">
          <label className="card__label card__domain-label">Domain</label>
          <input placeholder="Domain" className="card__input card__domain-input"></input>
        </div>
        {data.status === 'INACTIVE' && (
          <div className="card__btn">
            <button onClick={onClickActivate} className="form__btn card__activate">
              Activate
            </button>
          </div>
        )}
        <div className="card__status">
          <label className="card__status-label">Status</label>
          <span
            className={`card__status-value ${data.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
            {data.status}
          </span>
        </div>
      </div>
    </form>
  );
};

export default Card;
