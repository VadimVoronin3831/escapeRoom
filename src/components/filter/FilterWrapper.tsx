import FilterList from './FilterList';
import SortList from './SortList';

type FilterWrapperProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  activeLevel: string;
  onLevelChange: (level: string) => void;
};

function FilterWrapper({activeFilter, onFilterChange, activeLevel, onLevelChange}: FilterWrapperProps): JSX.Element {
  return (
    <div className="page-content__item">
      <form className="filter" action="#" method="get">
        <FilterList activeFilter={activeFilter} onFilterChange={onFilterChange}/>
        <SortList activeLevel={activeLevel} onLevelChange={onLevelChange}/>
      </form>
    </div>
  );
}

export default FilterWrapper;
