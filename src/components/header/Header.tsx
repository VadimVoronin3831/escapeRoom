import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth } from '../../store/selectors/selectors';
import { Link } from 'react-router-dom';
import { APP_PATH } from '../../const';
import { AppDispatch } from '../../store/store';
import { logout } from '../../store/slices/userSlice';

type HeaderProps = {
  activeLink: string | null;
};

function Header({ activeLink }: HeaderProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(getIsAuth);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container container--size-l">
        <span className="logo header__logo">
          <svg width={134} height={52} aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className={
                  activeLink === APP_PATH.PAGE_MAIN ? 'link active' : 'link'
                }
                to={APP_PATH.PAGE_MAIN}
              >
                Квесты
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={
                  activeLink === APP_PATH.PAGE_CONTACTS ? 'link active' : 'link'
                }
                to={APP_PATH.PAGE_CONTACTS}
              >
                Контакты
              </Link>
            </li>
            {isAuth && (
              <li className="main-nav__item">
                <Link
                  className={
                    activeLink === APP_PATH.PAGE_MYQUEST ? 'link active' : 'link'
                  }
                  to={APP_PATH.PAGE_MYQUEST}
                >
                  Мои бронирования
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="header__side-nav">
          {isAuth ? (
            <button
              className="btn btn--accent header__side-item"
              onClick={handleLogout}
            >
              Выйти
            </button>
          ) : (
            <Link
              className="btn header__side-item header__login-btn"
              to={APP_PATH.PAGE_LOGIN}
            >
              Вход
            </Link>
          )}
          <a
            className="link header__side-item header__phone-link"
            href="tel:88003335599"
          >
            8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
