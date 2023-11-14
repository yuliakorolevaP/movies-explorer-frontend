import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { deleteMovies, getsMovies } from "../../utils/MainApi";
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ openPopup }) => {
  const [films, setFilms] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
  const [filmsShowed, setFilmsShowed] = useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
  async function handleGetMovies(inputSearch, tumbler) {
    setErrorText('');
    setPreloader(true);
    try {
      const data = films;
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
      if (tumbler) filterData = filterData.filter(({ duration }) => duration <= 40);
      setFilmsShowed(filterData);
      if (inputSearch) {
      } else {
      }
    } catch (err) {
      openPopup(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );
      setFilms([]);
    } finally {
      setPreloader(false);
    }
  }

  function savedMoviesToggle(films, favorite) {
    if (!favorite) {
      const fimId = films._id;
      deleteMovies(films._id)
        .then(() => {
          setFilms((films) => films.filter((film) => film._id !== fimId));
          setFilmsShowed((films) => films.filter((film) => film._id !== fimId));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  async function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = [];
    let filterData = [];
    if (filmsShowed === null) {
      return openPopup("Сначала нужно найти фильмы")
    } else {
      if (tumbler) {
        setFilmsShowedWithTumbler(filmsShowed);
        setFilmsWithTumbler(films);
        filterDataShowed = filmsShowed.filter(({ duration }) => duration <= 40);
        filterData = films.filter(({ duration }) => duration <= 40);

      } else {
        filterDataShowed = filmsShowedWithTumbler;
        filterData = filmsWithTumbler;
      }
      localStorage.setItem('savedFilms', JSON.stringify(filterDataShowed.concat(filterData)));
      setFilmsShowed(filterDataShowed);
      setFilms(filterData);
    }
  }

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const data = await getsMovies();
        setFilms(data);
        setFilmsShowed(data);
      } catch (err) {
        openPopup(`Ошибка сервера ${err}`);
      }
    };
    asyncFn();
  }, [openPopup]);
  return (
    <main>
      <div className="saved-movies">
        <SearchForm handleGetMoviesTumbler={handleGetMoviesTumbler} handlegetsMovies={handleGetMovies} filmsTumbler={filmsTumbler} filmsInputSearch={filmsInputSearch} />
        {preloader && <Preloader />}
        {errorText && <div className="saved-movies__text-error">{errorText}</div>}
        {!preloader && !errorText && films !== null && (
          <MoviesCardList filmsRemains={[]} savedMoviesToggle={savedMoviesToggle} films={filmsShowed} />
        )}
      </div>
    </main>

  );
};

export default SavedMovies;