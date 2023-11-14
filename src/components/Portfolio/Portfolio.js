import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/yuliakorolevaP/how-to-learn" target="_blank" rel="noreferrer">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/yuliakorolevaP/russian-travel" target="_blank" rel="noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/yuliakorolevaP/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;