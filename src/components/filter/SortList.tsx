import { levelQuest } from '../../const';

type SortListProps = {
  activeLevel: string;
  onLevelChange: (level: string) => void;
};

function SortList({
  activeLevel,
  onLevelChange,
}: SortListProps): JSX.Element {
  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Сложность</legend>
      <ul className="filter__list">
        {Object.entries(levelQuest).map(([objKey, objValue]) => (
          <li key={objKey} className="filter__item">
            <input
              type="radio"
              name="level"
              id={objKey}
              checked={activeLevel === objKey}
              onChange={() => onLevelChange(objKey)}
            />
            <label className="filter__label" htmlFor={objKey}>
              <span className="filter__label-text">{objValue}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default SortList;
