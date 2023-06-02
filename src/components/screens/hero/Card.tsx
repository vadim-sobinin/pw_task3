import { useAppDispatch } from '@/redux/hook';
import { selectProduct } from '@/redux/product/product.slice';
import { getCookie } from '@/services/cookie';
import { productType } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC, MouseEvent } from 'react';

interface CardProps {
  card: productType;
  activeProduct?: number;
}

const Card: FC<CardProps> = ({ card, activeProduct = 2 }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickBtn = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(selectProduct(card));

    if (getCookie('key')) {
      if (router.query.subid) {
        router.push({
          pathname: '/payment',
          query: { subid: router.query.subid },
        });
      } else {
        router.push('/payment');
      }
    } else {
      router.push('/register');
    }
  };

  return (
    <div className={`hero__card card ${card.id === activeProduct && 'primary'}`}>
      <h2 className="card__title">${card.prices[0].price}</h2>
      <h3 className="card__subtitle">{card.name}</h3>
      <span className="card__description">
        Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual
        price
      </span>
      <div className="card__divider"></div>
      <ul className="card__features-list">
        <li className="card__feature">All features for 3 sites</li>
        <li className="card__feature">Special introductory pricing</li>
        <li className="card__feature">Unlimited Pages and Keywords</li>
        <li className="card__feature">Billed annually</li>
      </ul>

      {card.id === activeProduct && router.query.subid ? (
        <div className={`card__button ${card.id === activeProduct && 'primary'}`}>
          Current subscription
        </div>
      ) : (
        <Link
          className={`card__button ${card.id === activeProduct && 'primary'}`}
          href="#"
          onClick={onClickBtn}>
          {router.query.subid ? 'Switch to this subscription' : 'Get Gscore'}
        </Link>
      )}
    </div>
  );
};
export default Card;
