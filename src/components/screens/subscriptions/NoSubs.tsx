import Image from 'next/image';
import Link from 'next/link';

const NoSubs = () => {
  return (
    <section className="subscriptions">
      <div className="container">
        <div className="subscription__header">
          <h2 className="subscription__title">My subscriptions</h2>
        </div>

        <div className="subscription__no-card no-card">
          <Image
            loading="lazy"
            src="../img/svg/cross.svg"
            className="cross"
            width="96"
            height="96"
            alt="cross icon"
          />
          <h2 className="no-card__title">No active subscriptions</h2>
          <p className="no-card__subtitle">
            You can subscribe right now by clicking on the button below
          </p>
          <Link href={'/'} className="form__btn">
            Get Gscore
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NoSubs;
