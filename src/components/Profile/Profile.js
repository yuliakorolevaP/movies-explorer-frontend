import './Profile.css';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useContext } from 'react';

const Profile = ({ onSignOut, onUpdate }) => {
  const currentUser = useContext(CurrentUserContext);
  const [errors, setErrors] = useState({});
  const [isVisibleButton, setVisibleButton] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditingProfile, setisEditingProfile] = useState(false);
  const [isEditingName, setisEditingName] = useState(false);

  function EditingProfile() {
    setisEditingProfile(false);
    setisEditingName(false);
  }
  const handleSubmit = (evt) => {
    onUpdate({ name, email })
    setVisibleButton(false);
    evt.preventDefault();
  };

  function handleNameChange(evt) {
    const value = evt.target.value;
    setisEditingName(true);
    if (!email) setEmail(currentUser.email);
    setName(value);
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    if (value !== currentUser.name) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
    const name = evt.target.name;
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setisEditingProfile(true);
    if (!name) setName(currentUser.name);
    setEmail(value);
    if (value !== currentUser.email) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  return (
    <main className="profile">
      <form name="profile" className="profile__form" onSubmit={handleSubmit} >
        <h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
        <div className="profile__inputs">
          <p className="profile__text">Имя</p>
          <div className="profile__area profile__area_type_name">
            <input className="profile__settings"
              name="name"
              value={!isEditingName ? (currentUser.name) : (name || "")}
              onChange={handleNameChange} />
          </div>
          <div className="profile__area profile__area_type_email">
            <input className="profile__settings"
              name="email"
              type="email"
              value={!isEditingProfile ? (currentUser.email) : (email || "")}
              onChange={handleEmailChange}
            />
            <span className={`profile__error ${errors.email ? 'profile__error-display' : ''}`}>{errors.email}</span>
          </div>
          <p className="profile__text">E-mail</p>
        </div>
        {!isVisibleButton && (
          <button className="profile__button" disabled>Редактировать
          </button>
        )}
        {!isVisibleButton && (
          <Link to="/signin" className="profile__link" onClick={onSignOut}>
            Выйти из аккаунта
          </Link>
        )}
        {isVisibleButton && (
          <button className="profile__button profile__button_save" type="submit" onClick={EditingProfile}>Сохранить
          </button>
        )}
      </form>
    </main>
  );
};

export default Profile;