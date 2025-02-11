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

export const getProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 

export const changeProfile = (requestConfig) => { 
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

export const changeProfileAvatar = (requestConfig) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: requestConfig.avatar,
        })
    })
    .then(res => checkResponse(res));
} 

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 

export const addCard = (requestConfig) => { 
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

export const deleteCard = (requestConfig) => { 
    return fetch(`${config.baseUrl}/cards/${requestConfig.cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 

export const likeCard = (requestConfig) => { 
    return fetch(`${config.baseUrl}/cards/likes/${requestConfig.cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 

export const removeLikeFromCard = (requestConfig) => { 
    return fetch(`${config.baseUrl}/cards/likes/${requestConfig.cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res));
} 


// getInitialCards().then(res => {
//     console.log(res);
// })
// changeProfile().then(res => {
//     console.log(res);
// })
// getProfile().then(res => {
//     console.log(res);
// })
// addCard().then(res => {
//     console.log(res);
// })

// deleteCard({cardId: '67ab8c2891b73119ddafdf53'}).then(res => {
//     console.log(res);
// })

// likeCard({cardId: '67ab910d91b73119ddafe27d'}).then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error);
// })
// removeLikeFromCard({cardId: '67ab910d91b73119ddafe27d'}).then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error);
// })

// changeProfileAvatar({avatar: 'https://steamuserimages-a.akamaihd.net/ugc/1343712298673281204/4058808DFAE3891E01AE5A2C94B99936A209F7D1/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'}).then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log(error);
// })