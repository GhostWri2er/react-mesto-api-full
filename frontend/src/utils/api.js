class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
  //Запросы

  //Получение данных

  getProfile() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      mode: 'no-cors',
      headers: this._headers,
    }).then(this._checkRespose);
  }

  //Получение карточек

  getCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Редактировать профиль

  editProfile(name, about) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkRespose);
  }

  //Добавить карточку.

  addCard(name, link) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkRespose);
  }

  //Удалить карточку

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Поставить лайк

  addLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Удалить лайк

  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Изменить аватар

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkRespose);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Проверка ответа

  _checkRespose(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.ghostwriter.nomoredomains.work/',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
