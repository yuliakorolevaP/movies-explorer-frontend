import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies }) => {
  return (
    <section className="cards">
      {movies.length > 0 ? (
        <ul className="cards__list">
          {movies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <div className="cards__text">Ничего не найдено</div>
      )}
      <div className="cards__button-container">
        <button className="cards__button" type="button" name="more" >Ещё</button>
      </div>
    </section>
  );
};

export default MoviesCardList;