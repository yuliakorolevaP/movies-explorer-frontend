import '../Form/Form.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login({ user }) {
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
          <h1 className="form__title">Рады видеть!</h1>
          <form name="login" className="form__inputs">
            <div className="form__items">
              <label className="form__item">
                <p className="form__item-text">E-mail</p>
                <input
                  className="form__field"
                  name="email"
                  type="email"
                  placeholder="Введите почту"
                  value={user.email}
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
                  value={user.password}
                  onChange={handleInputChange}
                  required
                />
                <p className={`form__error ${errors.password ? 'form__error-display' : ''}`}>{errors.password}</p>
              </label>
            </div>
            <button className="form__button"><Link className="form__button-link" to="/">Войти</Link></button>
          </form>
          <p className="form__text">Ещё не зарегистрированы?
            <Link to="/signup" className="form__link">Регистрация</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;