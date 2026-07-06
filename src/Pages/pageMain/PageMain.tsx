import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MainPageWrapper from '../../components/mainPageWrapper/MainPageWrapper';
import { APP_PATH } from '../../const';

function PageMain(): JSX.Element {
  return (
    <div className="wrapper">
      <Header activeLink={APP_PATH.PAGE_MAIN}/>
      <MainPageWrapper />
      <Footer />
    </div>
  );
}

export default PageMain;
