import { useAppDispatch, useAppSelector } from '@/redux/hook';
import Steps, { step } from './Steps';
import { selectUser } from '@/redux/user/user.selectors';
import { useRouter } from 'next/router';
import { productSelector } from '@/redux/product/product.selectors';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { ProductService } from '@/services/product.service';
import Link from 'next/link';
import { setIsAlreadyPurchase } from '@/redux/product/product.slice';
import { getCookie } from '@/services/cookie';

const Payment = () => {
  const { userData } = useAppSelector(selectUser);
  const router = useRouter();
  const { selectedProduct, isAlreadyPurchase } = useAppSelector(productSelector);

  const dispatch = useAppDispatch();

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentComplete = paymentSuccess || isAlreadyPurchase;

  if (!getCookie('key')) {
    router.replace('/register');
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProduct && userData) {
      const response = await ProductService.buyProduct(
        selectedProduct?.prices[0].id,
        userData?.token,
      );
      if (response.subscribe) {
        setPaymentSuccess(true);
        dispatch(setIsAlreadyPurchase(true));
      } else alert(response.message);
    }
  };

  return (
    <>
      {!paymentComplete && <Steps currentStep={step.payment} />}
      <section className="form">
        <div className="container_small">
          <form className="form__content" onSubmit={onSubmit}>
            <h2 className="form__title">
              {paymentComplete ? 'Start your subscription' : 'Checkout'}
            </h2>
            {paymentComplete && (
              <span className="form__description form__description_nowrap">
                We have sent you a payment receipt by e-mail and a link to download the plugin with
                a license key.
              </span>
            )}
            <div className="checkout__block">
              <div className="checkout__title">
                <div className="checkout__name">Package name</div>
                <div className="checkout__price">Price</div>
              </div>
              <div className="checkout__divider"></div>
              <div className="checkout__value">
                <div className="checkout__name">{selectedProduct?.name}</div>
                <div className="checkout__price">
                  <span>{selectedProduct?.prices[0].price}$</span>
                  <Image
                    loading="lazy"
                    src="./img/svg/cart.svg"
                    width="24"
                    height="24"
                    alt="cart icon"
                  />
                </div>
              </div>
            </div>
            {!paymentComplete && (
              <div className="checkout__total">
                <div className="checkout__total-title">Total:</div>
                <div className="checkout__total-value">{selectedProduct?.prices[0].price}$</div>
              </div>
            )}

            {paymentComplete ? (
              <Link
                href={'/subscriptions'}
                className="form__btn form__btn_big form__btn_m48"
                type="submit">
                Go to my subscriptions
              </Link>
            ) : (
              <button className="form__btn form__btn_m48" type="submit">
                Purchase
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default Payment;
