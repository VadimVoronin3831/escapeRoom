import { useDispatch, useSelector } from 'react-redux';
import { questItemViewMode } from '../../const';
import { myQuestList as MyQuestListType } from '../../types/myQuestList';
import { AppDispatch } from '../../store/store';
import {
  getIsMyQuestListLoading,
  getMyQuestList,
} from '../../store/selectors/selectors';
import QuestItem from './questItem/QuestItem';
import { fetchMyQuestList } from '../../store/apiActions/apiActions';
import { useEffect } from 'react';

function MyQuestList(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const myQuestList = useSelector(getMyQuestList);
  const isLoading = useSelector(getIsMyQuestListLoading);

  useEffect(() => {
    if (myQuestList.length === 0) {
      dispatch(fetchMyQuestList());
    }
  }, [dispatch, myQuestList.length]);

  useEffect(() => {
    dispatch(fetchMyQuestList());
  }, [dispatch]);

  return (
    <div className="cards-grid">
      {myQuestList.map((card: MyQuestListType) => (
        <QuestItem
          key={card.id}
          myQuestInfo={card}
          viewMode={questItemViewMode.booking}
        />
      ))}

      {myQuestList.length === 0 && !isLoading && (
        <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
          У вас нет забронированных мероприятий
        </p>
      )}

      {isLoading && (
        <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
          Загрузка квестов
        </p>
      )}
    </div>
  );
}

export default MyQuestList;
