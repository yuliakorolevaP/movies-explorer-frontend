import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({ movies }) => {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </div>
  );
};

export default Movies;