import { typeQuest } from '../../const';

type FilterListProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

function FilterList({
  activeFilter,
  onFilterChange,
}: FilterListProps): JSX.Element {
  const iconMapping: Record<string, string> = {
    all: 'all-quests',
    adventures: 'adventure',
    horror: 'horror',
    mystic: 'mystic',
    detective: 'detective',
    'sci-fi': 'sci-fi',
  };

  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Тематика</legend>
      <ul className="filter__list">
        {Object.entries(typeQuest).map(([objKey, objValue]) => (
          <li key={objKey} className="filter__item">
            <input
              type="radio"
              name="type"
              id={objKey}
              checked={activeFilter === objKey}
              onChange={() => onFilterChange(objKey)}
            />
            <label className="filter__label" htmlFor={objKey}>
              <svg
                className="filter__icon"
                width={40}
                height={30}
                aria-hidden="true"
              >
                <use xlinkHref={`#icon-${iconMapping[objKey]}`} />
              </svg>
              <span className="filter__label-text">{objValue}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default FilterList;
