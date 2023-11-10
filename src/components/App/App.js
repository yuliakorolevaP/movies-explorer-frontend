import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import { register, login, getsUserInfo, updateUserInfo, checkToken } from "../../utils/MainApi.js"
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement.js';
import Popup from '../Popup/Popup';
function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const footer = pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";
  const header =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn) {
      checkToken(jwt)
        .then((dataUser) => {
          setCurrentUser(dataUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getsUserInfo()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch(console.error);
    } else {
      setLoggedIn(false);
      localStorage.clear();
    }
  }, []);


  const handleUpdateUser = (newUserInfo) => {
    updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        setInfoTooltip(true);
          setInfoText("Данные успешно обновлены");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleLogin(email, password) {
    setLoading(true);
    login(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          navigate('/movies', { replace: true });
          setInfoTooltip(true);
          setInfoText("Вы успешно зашли");
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setInfoTooltip(true);
        setInfoText("Но");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  function handleRegister(name, email, password) {
    setLoading(true);
    register(name, email, password)
      .then((res) => {
        if (res._id) {
          handleLogin(email, password);
          setInfoTooltip(true);
          setInfoText("Вы успешно зашли");
        }
      })
      .catch((err) => {
        setInfoTooltip(true);
        setInfoText("Но");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }
  function openPopup(text) {
    setInfoTooltip(true);
    setInfoText(text);
  }

  function PopupClose() {
    setInfoTooltip(false);
    setInfoText("");
  }
  function onSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    setCurrentUser({});
    console.log(isLoggedIn);

  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {header && <Header isLoggedIn={isLoggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={
            <ProtectedRouteElement isLoggedIn={isLoggedIn}
              element={Movies} openPopup={openPopup} isLoading={isLoading}
            />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement isLoggedIn={isLoggedIn}
            element={SavedMovies}
          />} />
          <Route path="/profile" element={<ProtectedRouteElement isLoggedIn={isLoggedIn} onUpdate={handleUpdateUser}
            element={Profile}
            onSignOut={onSignOut} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Popup title={infoText} isOpen={infoTooltip} onClose={PopupClose} />
        {footer && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;