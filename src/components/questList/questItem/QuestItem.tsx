import { Link } from 'react-router-dom';
import { APP_PATH, levelQuest, questItemViewMode } from '../../../const';
import { Quest } from '../../../types/quest';
import { convertImgSize, translateDate } from '../../../utils';
import { myQuestList } from '../../../types/myQuestList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { deleteBookingQuest } from '../../../store/apiActions/apiActions';
import { getIsDeleteBookingLoading } from '../../../store/selectors/selectors';
import { useState } from 'react';

type QuestItemProps = {
  questContent?: Quest;
  viewMode: string;
  myQuestInfo?: myQuestList;
};

function QuestItem({
  questContent,
  viewMode,
  myQuestInfo,
}: QuestItemProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const deleteIsLoading = useSelector(getIsDeleteBookingLoading);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isBookingMode = viewMode === questItemViewMode.booking;
  const questData = myQuestInfo ? myQuestInfo.quest : questContent;

  if (!questData) {
    return <div>Нет данных о квесте</div>;
  }

  const { previewImgWebp, previewImg, title, id, peopleMinMax, level } =
    questData;

  const bookingAddress =
    isBookingMode && myQuestInfo ? myQuestInfo.location.address : '';
  const bookingTime = isBookingMode && myQuestInfo ? myQuestInfo.time : '';
  const bookingDate = isBookingMode && myQuestInfo ? myQuestInfo.date : '';
  const bookingId = isBookingMode && myQuestInfo ? myQuestInfo.id : '';
  const bookingPeople =
    isBookingMode && myQuestInfo ? myQuestInfo.peopleCount : '';

  const handleDeleteQuest = () => {
    setErrorMessage(null);
    setIsDeleting(true);
    dispatch(deleteBookingQuest(bookingId))
      .unwrap()
      .catch(() => {
        setErrorMessage('Не удалось отменить бронирование');
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${convertImgSize(previewImgWebp)}`}
          />
          <img
            src={previewImg}
            srcSet={convertImgSize(previewImg)}
            width={344}
            height={232}
            alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={APP_PATH.PAGE_QUEST.replace(':id', id)}
          >
            {title}
          </Link>
          {isBookingMode && bookingAddress && (
            <span className="quest-card__info">
              [{translateDate(bookingDate)},&nbsp;{bookingTime}.{' '}
              {bookingAddress}]
            </span>
          )}
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>
            {isBookingMode ? (
              <>{bookingPeople}&nbsp;чел</>
            ) : (
              <>{peopleMinMax.join('-')}&nbsp;чел</>
            )}
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>
            {levelQuest[level]}
          </li>
        </ul>
        {isBookingMode && (
          <>
            <button
              onClick={() => handleDeleteQuest()}
              className="btn btn--accent btn--secondary quest-card__btn"
              type="button"
              disabled={isDeleting || deleteIsLoading}
            >
              {isDeleting || deleteIsLoading ? 'Отмена...' : 'Отменить'}
            </button>
            {errorMessage && (
              <div
                className="quest-card__error"
                style={{
                  color: 'red',
                  fontSize: '12px',
                  marginTop: '8px',
                  textAlign: 'center',
                }}
              >
                {errorMessage}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default QuestItem;
