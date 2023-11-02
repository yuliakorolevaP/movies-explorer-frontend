import './Navigation.css';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [showItems, setShowItems] = useState(false);
  const { pathname } = useLocation();
  const handleToggleMenu = () => setShowItems(!showItems);

  return (
    <nav className="navigation">
      <button className="navigation__button-menu" type="button" onClick={handleToggleMenu}></button>
      <div className={`navigation__container ${showItems ? 'navigation__container_visible' : ''}`}>
        <div className="navigation__sidebar">
          <div className="navigation__list-container">
            <button className="navigation__button-close" type="button" onClick={handleToggleMenu}></button>
            <ul className="navigation__list">
              <li className="navigation__list-item navigation__list-item_type_main">
                <Link to="/" className="navigation__link">Главная</Link>
              </li>
              <li className="navigation__list-item">
                <NavLink to="/movies" className="navigation__link">Фильмы</NavLink>
              </li>
              <li className="navigation__list-item">
                <NavLink to="/saved-movies" className="navigation__link">Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </div>
          <Link to="/profile" className={`navigation__link navigation__link_type_profile  ${pathname !== '/' ? '' : 'navigation__link_type_profile_visible'}`}>Аккаунт
            <div className="navigation__logo"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;