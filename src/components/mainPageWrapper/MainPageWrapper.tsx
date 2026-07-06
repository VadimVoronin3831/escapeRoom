import QuestList from '../../components/questList/QuestList';
import FilterWrapper from '../../components/filter/FilterWrapper';
import { useState } from 'react';

function MainPageWrapper(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeLevel, setActiveLevel] = useState('any');

  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
            квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">
            Выберите тематику
          </h2>
        </div>
        <FilterWrapper
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeLevel={activeLevel}
          onLevelChange={setActiveLevel}
        />
        <h2 className="title visually-hidden">Выберите квест</h2>
        <QuestList activeFilter={activeFilter} activeLevel={activeLevel} />
      </div>
    </main>
  );
}

export default MainPageWrapper;
