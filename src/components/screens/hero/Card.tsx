import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { selectProduct } from '@/redux/product/product.slice';
import { selectUser } from '@/redux/user/user.selectors';
import { productType } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC, MouseEvent } from 'react';

interface CardProps {
  card: productType;
}

const Card: FC<CardProps> = ({ card }) => {
  const { isAuth } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickBtn = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(selectProduct(card));

    router.push(isAuth ? '/payment' : '/register');
  };

  return (
    <div className={`hero__card card ${card.id === 2 && 'primary'}`}>
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

      <Link className={`card__button ${card.id === 2 && 'primary'}`} href="#" onClick={onClickBtn}>
        Get Gscore
      </Link>
    </div>
  );
};
export default Card;
