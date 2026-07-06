import { useEffect } from 'react';
import QuestItem from './questItem/QuestItem';
import { questItemViewMode } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { getListLoading, getQuestList } from '../../store/selectors/selectors';
import { fetchQuestList } from '../../store/apiActions/apiActions';
import { AppDispatch } from '../../store/store';
import { Quest } from '../../types/quest';

type QuestListProps = {
  activeLevel: string;
  activeFilter: string;
};

function QuestList({ activeLevel, activeFilter }: QuestListProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const questList = useSelector(getQuestList);
  const isLoading = useSelector(getListLoading);
  useEffect(() => {
    if (questList.length === 0) {
      dispatch(fetchQuestList());
    }
  }, [dispatch, questList.length]);

  let filteredQuestList =
    activeFilter === 'all'
      ? questList
      : questList.filter((item) => item.type === activeFilter);

  filteredQuestList =
    activeLevel === 'any'
      ? filteredQuestList
      : filteredQuestList.filter((item) => item.level === activeLevel);

  return (
    <div className="cards-grid">
      {filteredQuestList.map((card: Quest) => (
        <QuestItem
          key={card.id}
          questContent={card}
          viewMode={questItemViewMode.catalog}
        />
      ))}

      {filteredQuestList.length === 0 && !isLoading && (
        <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
          Увы таких квестов нет :(
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

export default QuestList;
