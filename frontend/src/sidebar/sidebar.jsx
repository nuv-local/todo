import './Sidebar.css';
import {useMemo, useState} from 'react';

function Sidebar({filters, sortBy, sortByChange, filterChange}) {
  const [isOpen, setIsOpen] = useState('');

  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const [filterName, setFilterName] = useState('');

  const [isSortByActive, setIsSortByActive] = useState(false);
  const [sortByName, setSortByName] = useState('');

  const toggleSidebar = () => setIsOpen(isOpen ? '' : 'hidden');

  const filtersKeys = useMemo(() => Object.keys(filters), [filters]);
  const sortByKeys = useMemo(() => Object.keys(sortBy), [sortBy]);

  const toggleFilters = () => setIsFiltersActive(!isFiltersActive);
  const changeFilterName = (key) => setFilterName(`: ${key}`);

  const toggleSortBy = () => setIsSortByActive(!isSortByActive);
  const changeSortByName = (key) => setSortByName(`: ${key}`);

  return [
    <div key="burger" id="burger" onClick={toggleSidebar}>☰</div>,
    <aside key='sidebar' id='sidebar' className={isOpen}>
      <div id='options' className={isOpen}>
        <div className={`options ${isFiltersActive ? '' : 'hide'}`} onClick={toggleFilters}>
          <h1 className='title'>{`Filters${filterName}`}</h1>
          {filtersKeys.map((key) => (
              <p 
              key={key} 
              onClick={(e) => {
                e.stopPropagation();
                filterChange(filters[key]);
                changeFilterName(key);
              }}
              className={`option ${isOpen}`}>
                {key}
              </p>
            )
          )}
        </div>
        <div className={`options ${isSortByActive ? '' : 'hide'}`} onClick={toggleSortBy}>
          <h1 className='title'>{`Sort by${sortByName}`}</h1>
          {sortByKeys.map((key) => (
              <p 
              key={key} 
              onClick={(e) => {
                e.stopPropagation();
                sortByChange(sortBy[key]);
                changeSortByName(key);
              }}
              className={`option ${isOpen}`}>
                {key}
              </p>
            )
          )}
        </div>
      </div>
    </aside>
  ];
}

export default Sidebar