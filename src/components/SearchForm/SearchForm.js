import './SearchForm.css';
import { useState } from 'react';

const SearchForm = () => {
  const [tumbler, setTumbler] = useState(false);

  const handleFilterChange = () => {
    setTumbler(!tumbler);
  }
  return (
    <form name="search" className="search">
      <div className="search__container">
        <input className="search__input" placeholder="Фильм" type="text" required />
        <button type="submit" className="search__button">Найти</button>
      </div>
      <div className="search__toggle">
        <label className="search__tumbler">
          <input className="search__checkbox" type="checkbox" id="checkbox" onChange={handleFilterChange} />
          <span className="search__slider" />
        </label>
        <label className="search__films" >Короткометражки</label>
      </div>
    </form>
  );
};

export default SearchForm;