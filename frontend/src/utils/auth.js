export const baseUrl = 'https://api.mesto.ghostwriter.nomoredomains.work';

export const register = (data) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "email": data.email, "password": data.password }),
  }).then((res) => checkResponse(res));
};

export const login = (data) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: data.email, password: data.password }),
  }).then((res) => checkResponse(res));
};

export const checkToken = (jwt) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
