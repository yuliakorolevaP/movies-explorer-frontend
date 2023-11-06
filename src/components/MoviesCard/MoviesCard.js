import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ movie }) => {
  const { pathname } = useLocation();
  const moviesPage = pathname === "/movies";
  const savedMoviesPage = pathname === "/saved-movies";
  const [isSavedMovie, setSavedMovie] = useState(false);
  const handleClickSaveMovie = () => {
    setSavedMovie(!isSavedMovie);
  };

  return (
    <li className="card">
      <a className="card__image-content" href={movie.trailerLink}
        target="_blank"
        rel="noreferrer">
        <img className="card__image"
          src={movie.link}
          alt={`Заставка для фильма "${movie.name}"`}></img>
      </a>
      <div className="card__element">
        <h2 className="card__title">{movie.name}</h2>
        <div className="card__buttons">
          {moviesPage && !isSavedMovie && (
            <button
              className="card__button card__button_active"
              type="button"
              onClick={handleClickSaveMovie}>
            </button>
          )}
          {isSavedMovie && (
            <button
              className="card__button card__button_inactive"
              type="button"
              onClick={handleClickSaveMovie}>
            </button>
          )}
          {savedMoviesPage && (
            <button
              className="card__button card__button_delete"
              type="button">
            </button>
          )}
        </div>
      </div>
      <p className="card__duration">{movie.duration}</p>
    </li>
  );
};

export default MoviesCard;