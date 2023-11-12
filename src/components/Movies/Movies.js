import './Movies.css';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';
import { addMovies, deleteMovies, getsMovies } from "../../utils/MainApi";

const Movies = ({ openPopup }) => {
  const [films, setFilms] = useState(null);
  const [filmsSaved, setFilmsSaved] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
  const [MoviesCount, setMoviesCount] = useState([]);
  const [filmsShowed, setFilmsShowed] = useState(null);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);
  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    const MoviesCountConfig = {
      '1270': [16, 4],
      '987': [9, 3],
      '739': [8, 2],
      '230': [5, 2],
    };

    Object.keys(MoviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MoviesCountConfig[key];
        }
      });

    return countCards;
  }

  function handleMore() {
    const spliceFilms = films;
    const newFilmsShowed = filmsShowed.concat(spliceFilms.splice(0, MoviesCount[1]));
    setFilmsShowed(newFilmsShowed);
    setFilms(spliceFilms);
  }

  function handlegetsMovies(inputSearch, search) {
    if (!search) {
      openPopup('Нужно ввести ключевое слово');
      return false;
    }
    let filterData = inputSearch.filter(({ nameRU }) => nameRU.toLowerCase().includes(search.toLowerCase()));
    localStorage.setItem('films', JSON.stringify(filterData));
    localStorage.setItem('filmsInputSearch', search);
    const spliceData = filterData.splice(0, MoviesCount[0]);
    setFilmsShowed(spliceData);
    setFilms(filterData);
    setFilmsShowedWithTumbler(spliceData);
    setFilmsWithTumbler(filterData);
  }

  async function handleSubmitSearch(search) {
    setFilmsTumbler(false);
    localStorage.setItem('filmsTumbler', false);
    try {
      const allMovies = localStorage.getItem("allMovies");
      if (!allMovies) {
        setErrorText('');
        setPreloader(true);
        await getMovies()
          .then((dataMovies) => {
            localStorage.setItem("allMovies", JSON.stringify(dataMovies));
            handlegetsMovies(dataMovies, search);
          })
      }
      else {
        handlegetsMovies(JSON.parse(allMovies), search);
      }
    } catch (err) {
      openPopup('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );
    } finally {
      setPreloader(false);
    }

  }


  async function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = [];
    let filterData = [];
    if (films === null) {
      openPopup("Сначала нужно найти фильмы")
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
      localStorage.setItem('films', JSON.stringify(filterDataShowed.concat(filterData)));
      localStorage.setItem('filmsTumbler', tumbler);
      setFilmsShowed(filterDataShowed);
      setFilms(filterData);
    }
  }

  async function savedMoviesToggle(film, favorite) {
    if (favorite) {
      const objFilm = {
        image: 'https://api.nomoreparties.co' + film.image.url,
        trailer: film.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + film.image.url,
        movieId: film.id,
        country: film.country || 'Неизвестно',
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      };
      try {
        await addMovies(objFilm);
      } catch (err) {
        console.error(err);
        openPopup('Во время добавления фильма произошла ошибка.');
      }
    } else {
      try {
        await deleteMovies(film._id);
      } catch (err) {
        console.error(err);
        openPopup('Во время удаления фильма произошла ошибка.');
      }
    }
    const newSaved = await getsMovies();
    setFilmsSaved(newSaved);
  }

  useEffect(() => {
    getsMovies()
      .then((data) => {
        setFilmsSaved(data);
      })
      .catch((err) => {
        console.error(err);
        openPopup(`Ошибка сервера ${err}`);
      });

    const localStorageFilms = localStorage.getItem('films');

    if (localStorageFilms) {
      const filterData = JSON.parse(localStorageFilms);
      setFilmsShowed(filterData.splice(0, getMoviesCount()[0]));
      setFilms(filterData);
      setPreloader(false);
    }

    const localStorageFilmsTumbler = localStorage.getItem('filmsTumbler');
    const localStorageFilmsInputSearch = localStorage.getItem('filmsInputSearch');

    if (localStorageFilmsTumbler) {
      setFilmsTumbler(localStorageFilmsTumbler === 'true');
    }

    if (localStorageFilmsInputSearch) {
      setFilmsInputSearch(localStorageFilmsInputSearch);
    }
  }, [openPopup]);

  return (
    <main>
      <div className="movies">
        <SearchForm handlegetsMovies={handleSubmitSearch} filmsTumbler={filmsTumbler} filmsInputSearch={filmsInputSearch} handleGetMoviesTumbler={handleGetMoviesTumbler}
        />
        {preloader && <Preloader />}
        {errorText && <div className="movies__text-error">{errorText}</div>}
        {!preloader && !errorText && films !== null && filmsSaved !== null && filmsShowed !== null && (
          <MoviesCardList handleMore={handleMore} filmsRemains={films} films={filmsShowed} savedMoviesToggle={savedMoviesToggle} filmsSaved={filmsSaved} />
        )}
      </div>
    </main>
  );
};

export default Movies;