import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ movies }) => {

  return (
    <main>
      <div className="saved-movies">
        <SearchForm />
        <MoviesCardList movies={movies} />
      </div>
    </main>
  );
};

export default SavedMovies;