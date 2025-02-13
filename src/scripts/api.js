const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: 'a4530fa6-72bf-4019-916c-3751a61f819c',
      'Content-Type': 'application/json'
    }
  }
  
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 

export function changeProfile(requestConfig) { 
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: requestConfig.name,
            about: requestConfig.about
          })
    })
    .then(res => checkResponse(res));
} 

export function changeProfileAvatar(requestConfig) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: requestConfig.avatar,
        })
    })
    .then(res => checkResponse(res));
} 

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 

export function addCard(requestConfig) { 
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: requestConfig.name,
            link: requestConfig.link
          })
    })
    .then(res => checkResponse(res));
} 

export function deleteCard(requestConfig) { 
    return fetch(`${config.baseUrl}/cards/${requestConfig.cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 

export function addLikeToCard(requestConfig) { 
    return fetch(`${config.baseUrl}/cards/likes/${requestConfig.cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 

export function removeLikeFromCard(requestConfig) { 
    return fetch(`${config.baseUrl}/cards/likes/${requestConfig.cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 
