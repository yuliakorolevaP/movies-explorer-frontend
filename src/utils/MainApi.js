import { MAIN_API_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка ${res.status} : ${res.statusText}`);
}

export const register = (name, email, password) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => checkResponse(res))
};

export const login = (email, password) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => checkResponse(res))
};

export const getsUserInfo = () => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers:
    {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
  })
    .then(res => checkResponse(res))
}

export const getsMovies = () => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'GET',
    headers:
    {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
  })
    .then(res => checkResponse(res))
}

export const addMovies = (data) => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'POST',
    headers:
    {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image,
      trailerLink: data.trailer,
      thumbnail: data.thumbnail,
      movieId: data.movieId,
      nameRU: data.nameRU,
      nameEN: data.nameEN
    }),
  })
    .then(res => checkResponse(res))
}

export const deleteMovies = (movieId) => {
  return fetch(`${MAIN_API_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers:
    {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
  })
    .then(res => checkResponse(res))
}

export const updateUserInfo = (data) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then(res => checkResponse(res))
}

export function checkToken(jwt) {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  }).then(res => checkResponse(res))
}