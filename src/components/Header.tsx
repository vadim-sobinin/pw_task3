import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { selectUser } from '@/redux/user/user.selectors';
import { logoutUser } from '@/redux/user/user.slice';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

const Header = () => {
  const { isAuth, userData } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [toggleTooltip, setToggleTooltip] = useState(false);

  const logout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__flex">
          <Link href={'/'}>
            <div className="header__body logo">
              <Image src="../img/svg/logo.svg" width={42} height={42} alt="logo" />
              <h2>GScore</h2>
            </div>
          </Link>
          {userData && (
            <>
              <nav className="header__links">
                <a className="header__sub-link" href="#">
                  My subscriptions
                </a>
                <button
                  className="header__user-link tooltip"
                  onClick={() => setToggleTooltip(!toggleTooltip)}>
                  <span>{userData.user.username}</span>
                  <Image
                    loading="lazy"
                    src="../img/svg/arrow-down.svg"
                    className={`header__arrow ${toggleTooltip && 'open'}`}
                    width={24}
                    height={24}
                    alt="open popup"
                  />
                  <div className="tooltipcontent">
                    <div className="tooltip__flex">
                      <a href="#" className="tooltip__settings">
                        <Image
                          loading="lazy"
                          src="../img/svg/settings.svg"
                          width="24"
                          height="24"
                          aria-hidden={true}
                          alt="settings"
                        />
                        <span>Settings</span>
                      </a>
                      <a href="#" className="tooltip__logout" onClick={logout}>
                        <Image
                          loading="lazy"
                          src="../img/svg/logout.svg"
                          width="24"
                          height="24"
                          aria-hidden={true}
                          alt="logout"
                        />
                        <span>Logout</span>
                      </a>
                    </div>
                  </div>
                </button>
              </nav>
              <div className="menu-btn">
                <Image
                  loading="lazy"
                  src="../img/svg/burger.svg"
                  width="24"
                  height="24"
                  alt="open menu"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="menu show">
        <div className="menu__header">
          <button className="btn-reset">
            <Image
              loading="lazy"
              src="../img/svg/close-burger.svg"
              width="24"
              height="24"
              alt="close menu"
            />
          </button>
          <div className="header__body logo">
            <Image loading="lazy" src="../img/svg/logo.svg" width="32" height="32" alt="logo" />
            <h2>GScore</h2>
          </div>
        </div>

        <div className="menu__links">
          <div className="menu__link">My subscriptions</div>
          <div className="menu__link user">
            <div className="user__main">
              <span>Alex</span>
              <Image
                loading="lazy"
                src="../img/svg/arrow-down.svg"
                className="user__arrow-down open"
                width="24"
                height="24"
                alt="open user options"
              />
            </div>
            <div className="user__tooltip show">
              <a href="#" className="user__link">
                <Image
                  loading="lazy"
                  src="../img/svg/settings.svg"
                  width="20"
                  height="20"
                  alt="open settings"
                />
                <span>Settings</span>
              </a>
              <a href="#" className="user__link">
                <Image
                  loading="lazy"
                  src="../img/svg/logout.svg"
                  width="20"
                  height="20"
                  alt="logout"
                />
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
