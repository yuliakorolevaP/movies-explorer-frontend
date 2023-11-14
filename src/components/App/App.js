import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
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
import Preloader from '../Preloader/Preloader';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [check, setCheck] = useState(false);

  const footer = pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";
  const header =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  useEffect(() => {
    if (isLoggedIn) {
      checkToken(localStorage.getItem('jwt'))
        .then((dataUser) => {
          setCurrentUser(dataUser);
        })
        .catch((err) => {
          console.log(err);
          return onSignOut();
        })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      tokenCheck(jwt)
      getsUserInfo().then((res) => {
        if (res) {
          setLoggedIn(true);
        }
      })
        .catch((err) => {
          console.log(err);
        })
    } else {
      return onSignOut();
    }
  }, []);

  function tokenCheck(token) {
    checkToken(token).then(() => {
      console.log(true);
    }).catch((err) => {
      onSignOut();
      console.log(err);
      setInfoTooltip(true);
      setInfoText('Проблемы с токеном, повторите попытку входа');
      navigate('/', { replace: true });
    })
  }
  const handleUpdateUser = (newUserInfo) => {
    setLoading(true);
    updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        setInfoTooltip(true);
        setInfoText("Данные успешно обновлены");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      }).finally(() => setLoading(false));
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
        setInfoText("Ошибка, попробуйте снова");
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
        setInfoText("Ошибка, попробуйте снова");
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
            element={SavedMovies} openPopup={openPopup}
          />} />
          <Route path="/profile" element={<ProtectedRouteElement isLoggedIn={isLoggedIn} onUpdate={handleUpdateUser} isLoading={isLoading}
            element={Profile}
            onSignOut={onSignOut} />} />
          <Route path="/signup" element={isLoading ? <Preloader /> : !isLoggedIn ? <Register onRegister={handleRegister} isLoading={isLoading} /> : <Navigate to="/" />} />
          <Route path="/signin" element={isLoading ? <Preloader /> : !isLoggedIn ? <Login onLogin={handleLogin} isLoading={isLoading} /> : <Navigate to="/" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Popup title={infoText} isOpen={infoTooltip} onClose={PopupClose} />
        {footer && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;