import { MOVIES_API_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ой! Ошибка ${res.status} : ${res.statusText}`);
}

export function getMovies() {
  return fetch(`${MOVIES_API_URL}/beatfilm-movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => checkResponse(res))
}