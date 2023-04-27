import { useAppSelector } from '@/redux/hook';
import Steps, { step } from './Steps';
import { selectUser } from '@/redux/user/user.selectors';
import { useRouter } from 'next/router';

const Payment = () => {
  const { isAuth } = useAppSelector(selectUser);
  const router = useRouter();

  if (!isAuth) {
    router.replace('/register');
  }

  return (
    <>
      <Steps currentStep={step.payment} />
      <section className="form">
        <div className="container_small">
          <form className="form__content">
            <h2 className="form__title">Checkout</h2>
            <div className="checkout__block">
              <div className="checkout__title">
                <div className="checkout__name">Package name</div>
                <div className="checkout__price">Price</div>
              </div>
              <div className="checkout__divider"></div>
              <div className="checkout__value">
                <div className="checkout__name">Single site license</div>
                <div className="checkout__price">
                  <span>$77</span>
                  <img
                    loading="lazy"
                    src="../img/svg/cart.svg"
                    width="24"
                    height="24"
                    alt="cart icon"
                  />
                </div>
              </div>
            </div>
            <div className="checkout__total">
              <div className="checkout__total-title">Total:</div>
              <div className="checkout__total-value">$77</div>
            </div>

            <button className="form__btn form__btn_m48" type="submit">
              Purchase
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Payment;
