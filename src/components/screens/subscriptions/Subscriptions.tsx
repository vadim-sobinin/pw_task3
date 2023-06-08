import React, { FC, MouseEvent, useEffect, useState } from 'react';
import Slider from './Slider';
import Card from './Card';
import { SubscribeType, codesType } from '@/types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SubscribeService } from '@/services/subscribe.service';
import { getCookie } from '@/services/cookie';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  setCodeList,
  setSelectedSubId,
  setSubList,
  updateCodeList,
} from '@/redux/subscriptions/sub.slice';
import NoSubs from './NoSubs';

type Props = {
  subListData: SubscribeType[];
  codeListData: codesType[];
};

const Subscriptions: FC<Props> = ({ subListData, codeListData }) => {
  // console.log(subList);
  // console.log(codeList);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(setSubList(subListData));
    dispatch(setCodeList(codeListData));
  }, []);

  const { subList, codeList, selectedSubId } = useAppSelector((state) => state.sub);
  const [selectedCodes, setSelectedCodes] = useState<codesType[]>([]);

  const setSelectedSub = (id: number) => {
    dispatch(setSelectedSubId(id));
  };

  if (subList && selectedSubId) {
    // console.log(subList);

    const isAnyHoldCodes = Boolean(
      subList[subList.findIndex((sub) => sub.id === selectedSubId)].codes.filter(
        (code) => code.status === 'HOLD',
      ).length,
    );

    const onClickUpgrade = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    };

    const confirmHold = async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const cookie = getCookie('key');
      if (cookie && selectedSubId) {
        const response = await SubscribeService.changeHoldCodes(
          cookie,
          selectedCodes,
          selectedSubId,
        );

        if (response.statusCode > 210) {
          setErrorMessage(response.message);
        } else {
          setErrorMessage('');
          dispatch(updateCodeList(response));
        }
      }
    };

    return (
      <section className="subscriptions">
        <div className="container">
          <div className="subscription__header">
            <h2 className="subscription__title">My subscriptions</h2>
            <Link
              href={{
                pathname: '/',
                query: {
                  subid: selectedSubId,
                  prodid: subList.filter((sub) => sub.id === selectedSubId)[0].productId,
                },
              }}
              className="form__btn subscription__upgrade">
              Upgrade
            </Link>
          </div>
        </div>
        <Slider subList={subList} setSelectedSub={setSelectedSub} />
        <div className="container subscription__cards">
          {codeList &&
            codeList.map(
              (code) =>
                code.subscribeId === selectedSubId && (
                  <Card
                    key={code.id}
                    codeData={code}
                    setSelectedCodes={setSelectedCodes}
                    selectedCodes={selectedCodes}
                  />
                ),
            )}
        </div>
        {isAnyHoldCodes && (
          <div className=" container subscription__hold">
            <span className="subscription__hold-text">Select the domains you want to keep</span>
            <button onClick={confirmHold} className="subscription__hold-btn form__btn">
              Confirm
            </button>
          </div>
        )}

        {errorMessage && <div className="container error__message">{errorMessage}</div>}
      </section>
    );
  } else {
    return <NoSubs />;
  }
};

export default Subscriptions;
