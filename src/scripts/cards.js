import {addLikeToCard, removeLikeFromCard} from './api';
const cardTamplate = document.querySelector('#card-template').content;
const profileSection = document.querySelector('.profile');

function createCard(cardDate, delElement, likeCard, openImg) {
  const cardElement = getCardTemplate();
  cardElement.dataset.cardId = cardDate._id;
  const cardImg = cardElement.querySelector('.card__image');
  cardImg.src = cardDate.link;
  cardImg.alt = cardDate.name;
  cardElement.querySelector('.card__title').textContent = cardDate.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if(profileSection.dataset.profileId === cardDate.owner._id) {
    deleteButton.addEventListener('click', () => delElement(cardElement));
  } else {
    deleteButton.remove();
  }

  cardElement.querySelector('.card__like-counter').textContent = cardDate.likes.length;
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  if(Array.from(cardDate.likes).find(like => profileSection.dataset.profileId === like._id) !== undefined) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeButton.addEventListener('click', (evt) => likeCard(evt, cardElement));
  cardElement.querySelector('.card__image').addEventListener('click', openImg);
  return cardElement;
}

function getCardTemplate() {
  return cardTamplate.querySelector('.places__item').cloneNode(true);
}

function likeCardHandler(evt, cardElement) {
  const id = cardElement.dataset.cardId;
  if(cardElement.querySelector('.card__like-button_is-active') === null) {
    addLike(id, cardElement).then(() => {
      evt.target.classList.toggle('card__like-button_is-active');
    })
    .catch(err => { 
      console.log(err); 
    });
  } else {
    removeLike(id, cardElement).then(() => {
      evt.target.classList.toggle('card__like-button_is-active');
    })
    .catch(err => { 
      console.log(err); 
    });
  }
}

function addLike(id, cardElement) {
  return addLikeToCard({cardId: id}).then((res) => { 
    cardElement.querySelector('.card__like-counter').textContent = res.likes.length;
  });
}

function removeLike(id, cardElement) {
  return removeLikeFromCard({cardId: id}).then(res => { 
    cardElement.querySelector('.card__like-counter').textContent = res.likes.length;
  });
}

function delElement(element) {
  element.remove();
}

export {createCard as create, likeCardHandler as like, delElement as delete};
