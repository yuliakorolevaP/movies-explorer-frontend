import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({ movies }) => {
  return (
    <main>
      <div className="movies">
        <SearchForm />
        <MoviesCardList movies={movies} />
      </div>
    </main>
  );
};

export default Movies;