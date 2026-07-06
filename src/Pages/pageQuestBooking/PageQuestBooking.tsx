import { Navigate, useParams } from 'react-router-dom';
import DecorPage from '../../components/decorPage/DecorPage';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import QuestForm from '../../components/questForm/QuestForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  getQuestList,
  getListLoading,
  getIsBookingQuestInfoLoading,
  getBookingQuestInfo,
} from '../../store/selectors/selectors';
import { useEffect, useState } from 'react';
import {
  fetchBookingQuestInfo,
  fetchQuestList,
} from '../../store/apiActions/apiActions';
import { APP_PATH, MAP_VIEWMODE } from '../../const';
import Map from '../../components/map/Map';

function PageQuestBooking(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const questList = useSelector(getQuestList);
  const isLoading = useSelector(getListLoading);
  const isInfoLoading = useSelector(getIsBookingQuestInfoLoading);
  const bookingQuestsInfo = useSelector(getBookingQuestInfo);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setSelectedPlaceId(null);
      setIsInitialLoad(true);
      dispatch(fetchBookingQuestInfo(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (questList.length === 0) {
      dispatch(fetchQuestList());
    }
  }, [dispatch, questList.length]);

  useEffect(() => {
    if (
      bookingQuestsInfo &&
      bookingQuestsInfo.length > 0 &&
      !selectedPlaceId &&
      !isInfoLoading
    ) {
      setSelectedPlaceId(bookingQuestsInfo[0].id);
      setIsInitialLoad(false);
    }
  }, [bookingQuestsInfo, isInfoLoading, selectedPlaceId]);

  const currentQuest = questList.find((quest) => quest.id === id);
  const selectedPlaceInfo = bookingQuestsInfo.find(
    (place) => place.id === selectedPlaceId,
  );

  if (!id) {
    return <Navigate to={APP_PATH.PAGE_NOTFOUND} />;
  }

  if (isLoading && questList.length === 0) {
    return (
      <div className="wrapper">
        <Header activeLink={null} />
        <main className="page-content decorated-page">
          <DecorPage isLogin={false} jpgImg={null} webpImg={null} />
          <div className="container container--size-s">
            <div className="loading">Загрузка списка квестов...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isLoading && questList.length > 0 && !currentQuest) {
    return <Navigate to={APP_PATH.PAGE_NOTFOUND} />;
  }

  if (
    isInfoLoading ||
    isInitialLoad ||
    !bookingQuestsInfo ||
    bookingQuestsInfo.length === 0
  ) {
    return (
      <div className="wrapper">
        <Header activeLink={null} />
        <main className="page-content decorated-page">
          <DecorPage isLogin={false} jpgImg={null} webpImg={null} />
          <div className="container container--size-s">
            <div className="loading">
              {isInfoLoading || isInitialLoad
                ? 'Загрузка информации о бронировании...'
                : 'Нет доступных мест для бронирования'}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const peopleMinMax: [number, number] = (() => {
    if (
      currentQuest &&
      currentQuest.peopleMinMax &&
      currentQuest.peopleMinMax.length === 2
    ) {
      return [currentQuest.peopleMinMax[0], currentQuest.peopleMinMax[1]];
    }
    return [2, 6];
  })();

  const mapPlaces = bookingQuestsInfo.map((place) => ({
    id: place.id,
    location: place.location,
    slots: place.slots,
  }));

  const currentPlace = selectedPlaceInfo || bookingQuestsInfo[0];

  return (
    <div className="wrapper">
      <Header activeLink={null} />
      <main className="page-content decorated-page">
        <DecorPage
          isLogin={false}
          jpgImg={currentQuest?.previewImg || null}
          webpImg={currentQuest?.previewImgWebp || null}
        />
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">
              Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">
              {currentQuest?.title}
            </p>
          </div>

          <div className="page-content__item">
            <div className="booking-map">
              <Map
                viewMode={MAP_VIEWMODE.QUEST}
                places={mapPlaces}
                selectedPlaceId={selectedPlaceId || bookingQuestsInfo[0].id}
                onPlaceSelect={setSelectedPlaceId}
              />
              <p className="booking-map__address">
                Вы выбрали: {currentPlace.location.address}
              </p>
            </div>
          </div>
          <QuestForm
            questId={id}
            key={currentPlace.id}
            slots={currentPlace.slots || null}
            placeId={currentPlace.id}
            questPeopleCountMinMax={peopleMinMax}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PageQuestBooking;
