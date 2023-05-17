import React, { FC, useState } from 'react';
import Slider from './Slider';
import Card from './Card';
import { SubscribeType, codesType } from '@/types';

type Props = {
  subList: SubscribeType[];
  codeList: codesType[];
};

const Subscriptions: FC<Props> = ({ subList, codeList }) => {
  // console.log(subList);
  // console.log(codeList);

  const [selectedSubId, setSelectedSubId] = useState(subList[0].id);
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
      <Slider subList={subList} setSelectedSubId={setSelectedSubId} />
      <div className="container subscription__cards">
        {codeList &&
          codeList.map((code) =>
            code.subscribeId === selectedSubId ? <Card key={code.id} codeData={code} /> : '',
          )}
      </div>
    </section>
  );
};

export default Subscriptions;
