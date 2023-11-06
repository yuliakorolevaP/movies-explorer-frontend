import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

const AboutMe = () => {
  return (
    <section className="about-me">
      <h2 className="about-me__header">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Юлия</h3>
          <p className="about-me__job">Фронтенд-разработчик, 23 года</p>
          <p className="about-me__description">
            Я живу в Москве, закончила факультет информационных технологий МГТУ им. Н.Э. Баумана. Я люблю слушать музыку, а ещё увлекаюсь спортом.
            Недавно начала кодить. После того, как начала проходить курс по веб-разработке, ушла с постоянной работы.
          </p>
          <ul className="about-me__links">
            <li><a className="about-me__link" href="https://github.com/yuliakorolevaP" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>
        <img src={avatar} alt="Фото студента" className="about-me__image" />
      </div>
    </section>
  );
};

export default AboutMe;