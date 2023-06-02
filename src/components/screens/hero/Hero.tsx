import { FC } from 'react';
import Card from './Card';
import axios from 'axios';
import { productType } from '@/types';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hook';
import { setCurrentProduct } from '@/redux/product/product.slice';

type Props = {
  cardList: productType[];
};

const Hero: FC<Props> = ({ cardList }) => {
  const router = useRouter();
  const isUpgrade = Boolean(router.query.subid);

  const dispatch = useAppDispatch();

  if (isUpgrade) {
    dispatch(
      setCurrentProduct(cardList.filter((card) => card.id === Number(router.query.prodid))[0]),
    );
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero_content">
          <div>
            <h1 className="hero__title">
              {isUpgrade ? 'Upgrade your subscription!' : 'Get started with Gscore today!'}
            </h1>
          </div>

          <div className="hero__cards-flex">
            {isUpgrade
              ? cardList &&
                cardList.map((card) => (
                  <Card key={card.id} card={card} activeProduct={Number(router.query.prodid)} />
                ))
              : cardList && cardList.map((card) => <Card key={card.id} card={card} />)}
          </div>

          <div className="hero__footer">
            <span className="hero__footer-text">Have more than 10 sites?</span>
            <a href="#" className="hero__footer-link">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
