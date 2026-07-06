import { useDispatch, useSelector } from 'react-redux';
import DecorPage from '../../components/decorPage/DecorPage';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { AppDispatch } from '../../store/store';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchQuest } from '../../store/apiActions/apiActions';
import { APP_PATH, levelQuest, typeQuest } from '../../const';
import { getItemLoading, getQuest } from '../../store/selectors/selectors';

function PageQuest(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const questIsLoading = useSelector(getItemLoading);
  const questInfo = useSelector(getQuest);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuest(id));
    }
  }, [dispatch, id]);

  if (questIsLoading) {
    return (
      <div className="wrapper">
        <Header activeLink={null}/>
        <main className="decorated-page quest-page">
          <DecorPage isLogin={false} jpgImg={null} webpImg={null} />
          <div className="container container--size-l">
            <div className="quest-page__content">
              <div className="loading">Загрузка квеста...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!id || !questInfo) {
    return <Navigate to={APP_PATH.PAGE_NOTFOUND} />;
  }
  return (
    <div className="wrapper">
      <Header activeLink={null}/>
      <main className="decorated-page quest-page">
        <DecorPage
          isLogin={false}
          jpgImg={questInfo.coverImg}
          webpImg={questInfo.coverImgWebp}
        />
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">
              {questInfo.title}
            </h1>
            <p className="subtitle quest-page__subtitle">
              <span className="visually-hidden">Жанр:</span>
              {typeQuest[questInfo.type]}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width={11} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-person"></use>
                </svg>
                {questInfo.peopleMinMax.join('-')}&nbsp;чел
              </li>
              <li className="tags__item">
                <svg width={14} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-level"></use>
                </svg>
                {levelQuest[questInfo.level]}
              </li>
            </ul>
            <p className="quest-page__description">{questInfo.description}</p>
            <Link
              className="btn btn--accent btn--cta quest-page__btn"
              to={APP_PATH.PAGE_QUESTBOOKING.replace(':id', id)}
            >
              Забронировать
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PageQuest;
