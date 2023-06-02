import { getCookie } from '@/services/cookie';
import Link from 'next/link';
import { FC } from 'react';

export enum step {
  register,
  login,
  payment,
  checkout,
}

type stepsPropsType = {
  currentStep: step;
};

const Steps: FC<stepsPropsType> = ({ currentStep }) => {
  const isAuth = Boolean(getCookie('key'));

  if (currentStep === step.checkout) {
    return <></>;
  }

  return (
    <section className="steps">
      <div className="container_small">
        <div className="steps__flex">
          <Link
            href="/register"
            className={`steps__step ${currentStep === step.register ? 'active' : ''} ${
              isAuth ? 'disabled' : ''
            }`}
            scroll={false}>
            <div className="steps__title">Create account</div>
            <div className="steps__marker"></div>
          </Link>
          <Link
            href={'/login'}
            className={`steps__step ${currentStep === step.login ? 'active' : ''} ${
              isAuth ? 'disabled' : ''
            }`}
            scroll={false}>
            <div className="steps__title">Log in</div>
            <div className="steps__marker"></div>
          </Link>
          <Link
            href={'/payment'}
            className={`steps__step ${currentStep === step.payment ? 'active' : ''} ${
              !isAuth ? 'disabled' : ''
            }`}
            scroll={false}>
            <div className="steps__title">Checkout</div>
            <div className="steps__marker"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Steps;
