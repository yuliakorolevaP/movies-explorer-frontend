import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ movies }) => {

  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={movies} />

    </div>
  );
};

export default SavedMovies;