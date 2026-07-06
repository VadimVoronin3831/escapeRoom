import DecorPage from '../../components/decorPage/DecorPage';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { APP_PATH } from '../../const';
import MyQuestList from '../../components/questList/MyQuestList';

function PageMyQuest(): JSX.Element {
  return (
    <div className="wrapper">
      <Header activeLink={APP_PATH.PAGE_MYQUEST} />
      <main className="page-content decorated-page">
        <DecorPage isLogin={false} jpgImg={null} webpImg={null} />
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">
              Мои бронирования
            </h1>
          </div>
          <MyQuestList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PageMyQuest;
