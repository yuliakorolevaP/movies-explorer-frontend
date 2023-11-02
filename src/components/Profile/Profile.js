import './Profile.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [isVisibleButton, setVisibleButton] = useState(false);
  function handleNameChange(evt) {
    const value = evt.target.value;
    setName(value);
    if (value !== user.name) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);
    if (value !== user.email) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  return (
    <section className="profile">
      <form className="profile__form" >
        <h3 className="profile__greeting">Привет, {user.name}!</h3>
        <div className="profile__inputs">
          <p className="profile__text">Имя</p>
          <div className="profile__area profile__area_type_name">
            <input className="profile__settings"
              value={user.name}
              onChange={handleNameChange} />
          </div>
          <div className="profile__area profile__area_type_email">
            <input className="profile__settings"
              value={user.email}
              onChange={handleEmailChange} />
          </div>
          <p className="profile__text">E-mail</p>
        </div>
        <button className="profile__button" disabled={!isVisibleButton}>
          Редактировать
        </button>
        <Link to="/signin" className="profile__link">
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  );
};

export default Profile;