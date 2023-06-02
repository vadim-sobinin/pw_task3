import { useAppDispatch, useAppSelector } from '@/redux/hook';
import Steps, { step } from './Steps';
import { selectUser } from '@/redux/user/user.selectors';
import { useRouter } from 'next/router';
import { productSelector } from '@/redux/product/product.selectors';
import Image from 'next/image';
import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { ProductService } from '@/services/product.service';
import Link from 'next/link';
import { setIsAlreadyPurchase } from '@/redux/product/product.slice';
import { getCookie } from '@/services/cookie';
import { productType } from '@/types';
import { SubscribeService } from '@/services/subscribe.service';
import { setCurrentProduct } from '@/redux/product/product.slice';

const Payment = () => {
  const router = useRouter();

  const { userData } = useAppSelector(selectUser);

  const { selectedProduct, isAlreadyPurchase, currentProduct } = useAppSelector(productSelector);

  const dispatch = useAppDispatch();

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentComplete = paymentSuccess || isAlreadyPurchase;

  const totalPrice = currentProduct
    ? -Number(currentProduct?.prices[0].price) + Number(selectedProduct?.prices[0].price)
    : Number(selectedProduct?.prices[0].price);

  if (!getCookie('key')) {
    router.replace('/register');
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getCookie('key');
    const subid = router.query.subid;
    let response;
    if (selectedProduct && !currentProduct && token) {
      response = await ProductService.buyProduct(selectedProduct?.prices[0].id, token);
    } else if (selectedProduct && currentProduct && subid && token) {
      response = await SubscribeService.changeSubscribe(token, +selectedProduct.id, +subid);
    }
    if (response) {
      setPaymentSuccess(true);
      dispatch(setIsAlreadyPurchase(true));
    } else {
    }
  };

  const onClickToSub = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setCurrentProduct(null));
    router.push('/subscriptions');
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
              {currentProduct ? (
                <div className="checkout__value">
                  <div className="checkout__name">{currentProduct?.name} (refunded)</div>
                  <div className="checkout__price">
                    <span>- {currentProduct?.prices[0].price}$</span>
                    <Image
                      loading="lazy"
                      src="./img/svg/cart.svg"
                      width="24"
                      height="24"
                      alt="cart icon"
                    />
                  </div>
                </div>
              ) : (
                ''
              )}
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
                <div className="checkout__total-title">
                  {totalPrice < 0 ? 'Total refund:' : 'Total:'}
                </div>
                <div className="checkout__total-value">{Math.abs(totalPrice)}$</div>
              </div>
            )}

            {paymentComplete ? (
              <button className="form__btn form__btn_big form__btn_m48" onClick={onClickToSub}>
                Go to my subscriptions
              </button>
            ) : (
              <button className="form__btn form__btn_m48" type="submit">
                {totalPrice < 0 ? 'Refund' : 'Purchase'}
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default Payment;
