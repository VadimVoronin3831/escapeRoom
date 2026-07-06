import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AuthForm from '../../components/authForm/AuthForm';
import DecorPage from '../../components/decorPage/DecorPage';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { getIsAuth } from '../../store/selectors/selectors';
import { APP_PATH } from '../../const';

type LocationState = {
  from?: {
    pathname: string;
  };
};

function PageLogin(): JSX.Element {
  const isAuth = useSelector(getIsAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as LocationState)?.from?.pathname || APP_PATH.PAGE_MAIN;

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth, navigate, from]);

  return (
    <div className="wrapper">
      <Header activeLink={null} />
      <main className="decorated-page login">
        <DecorPage isLogin jpgImg={null} webpImg={null} />
        <div className="container container--size-l">
          <div className="login__form">
            <AuthForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PageLogin;
