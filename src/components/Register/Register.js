import '../Form/Form.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register({ user }) {
  const [errors, setErrors] = useState({});
  const handleInputChange = (evt) => {
    setErrors({ ...errors, [evt.target.name]: evt.target.validationMessage });
  }

  return (
    <main>
      <section className="form">
        <div className="form__container">
          <Link to="/" className="form__link">
            <img className="form__logo" src={logo} alt="Логотип Movies Explorer"></img>
          </Link>
          <h1 className="form__title">Добро пожаловать!</h1>
          <form name="register" className="form__inputs" >
            <div className="form__items">
              <label className="form__item">
                <p className="form__item-text">Имя</p>
                <input className="form__field"
                  name="name"
                  placeholder="Введите имя"
                  // value={user.name}
                  onChange={handleInputChange}
                  required
                />
                <p className="form__error">Что-то пошло не так...</p>
              </label>
              <label className="form__item">
                <p className="form__item-text">E-mail</p>
                <input
                  className="form__field"
                  name="email"
                  type="email"
                  placeholder="Введите почту"
                  // value={user.email}
                  onChange={handleInputChange}
                  required
                />
                <p className={`form__error ${errors.email ? 'form__error-display' : ''}`}>{errors.email}</p>
              </label>
              <label className="form__item">
                <p className="form__item-text">Пароль</p>
                <input
                  className="form__field"
                  name="password"
                  type="password"
                  minLength="6"
                  placeholder="Введите пароль"
                  // value={user.password}
                  onChange={handleInputChange}
                  required
                />
                <p className={`form__error ${errors.password ? 'form__error-display' : ''}`}>{errors.password}</p>
              </label>
            </div>
            <button className="form__button" type="submit">Зарегистрироваться</button>
          </form>
          <p className="form__text">Уже зарегистрированы?
            <Link to="/signin" className="form__link">Войти</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;