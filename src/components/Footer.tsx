import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__flex">
          <div className="footer__main">
            <div className="footer__logo logo">
              <Image loading="lazy" src="../img/svg/logo.svg" width="42" height="42" alt="logo" />
              <h2>GScore</h2>
            </div>
            <div className="footer__text">
              Ut enim ad minim veniam quis nostrud exercitation ea commodo
            </div>
          </div>
          <div className="footer__bottom">
            <span className="footer__copy">
              Copyright © 2022 GScore | All Rights Reserved |
              <a className="footer__link" href="#">
                Cookies
              </a>{' '}
              |
              <a className="footer__link" href="#">
                Privacy Policy
              </a>
            </span>
            <ul className="footer__sosials">
              <li>
                <a href="#">
                  <Image
                    loading="lazy"
                    src="../img/svg/Facebook.svg"
                    className="facebook"
                    width="36"
                    height="36"
                    alt="facebook link"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    loading="lazy"
                    src="../img/svg/Twitter.svg"
                    className="twitter"
                    width="36"
                    height="36"
                    alt="twitter link"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    loading="lazy"
                    src="../img/svg/LinkedIn.svg"
                    className="linkedIn"
                    width={36}
                    height={36}
                    alt="linkedIn link"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
