import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import movies from '../../utils/movies';
import user from '../../utils/user';
// import Popup from '../Popup/Popup';
// import Preloader from '../Preloader/Preloader';
function App() {
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const footer = pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";
  const header =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  return (
    <div className="App">
      {header && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<Main user={user} />} />
        <Route path="/movies" element={<Movies movies={movies} />} />
        <Route path="/saved-movies" element={<SavedMovies movies={movies} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/signup" element={<Register user={user} />} />
        <Route path="/signin" element={<Login user={user} />} />
        {/* <Route path="/noresult" element={<Preloader />} /> */}
        {/* <Route path="/popup" element={<Popup />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {footer && <Footer />}
    </div>
  );
}

export default App;