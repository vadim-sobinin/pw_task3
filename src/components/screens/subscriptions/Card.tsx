import { useAppDispatch } from '@/redux/hook';
import { activateCode } from '@/redux/subscriptions/sub.slice';
import { getCookie } from '@/services/cookie';
import { SubscribeService } from '@/services/subscribe.service';
import { codesType } from '@/types';
import Image from 'next/image';
import React, { ButtonHTMLAttributes, ChangeEvent, FC, MouseEvent, useState } from 'react';

type CardPropsType = {
  codeData: codesType;
  selectedCodes: codesType[];
  setSelectedCodes: (codes: codesType[]) => void;
};

const Card: FC<CardPropsType> = ({ codeData, setSelectedCodes, selectedCodes }) => {
  const dispatch = useAppDispatch();
  const onClickActivate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = getCookie('key');
    if (token) {
      const response = await SubscribeService.activateCode(token, codeData.code);
      if (response.status == 201) {
        const newData = { ...codeData };
        newData.origin = response.data.origin;
        newData.status = response.data.status;
        dispatch(activateCode(newData));
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCodes([...selectedCodes, codeData]);
    } else {
      setSelectedCodes(selectedCodes.filter((code) => code.id !== codeData.id));
    }
  };

  return (
    <form className="card">
      <div className="card__flex">
        <div className="card__checkbox-block">
          <input
            type="checkbox"
            className="card__checkbox"
            id={`checkbox__card${codeData.id}`}
            onChange={handleChange}
            defaultChecked={selectedCodes.includes(codeData)}
          />
          <label htmlFor={`checkbox__card${codeData.id}`}></label>
        </div>
        <div className="card__code">
          <label className="card__label card__code-label">License code</label>
          <div className="card__code-input-wrapper">
            <input
              placeholder="License code"
              className="card__input card__code-input"
              defaultValue={codeData.code}></input>
          </div>
        </div>
        <div className="card__domain">
          <label className="card__label card__domain-label">Domain</label>
          <input
            placeholder="Domain"
            defaultValue={codeData.origin}
            className="card__input card__domain-input"></input>
        </div>
        {codeData.status === 'INACTIVE' && (
          <div className="card__btn">
            <button onClick={onClickActivate} className="form__btn card__activate">
              Activate
            </button>
          </div>
        )}
        <div className="card__status">
          <label className="card__status-label">Status</label>
          <span
            className={`card__status-value ${
              codeData.status === 'ACTIVE' ? 'active' : 'inactive'
            }`}>
            {codeData.status}
          </span>
        </div>
      </div>
    </form>
  );
};

export default Card;
