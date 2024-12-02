const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const placesList = document.querySelector('.places__list');
const cardTamplate = document.querySelector('#card-template').content;


function createCard(cardDate, delElement, likeCard, openImg)
{
  const cardElement = cardTamplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  cardImg.src = cardDate.link;
  cardImg.alt = cardDate.name;
  cardElement.querySelector('.card__title').textContent = cardDate.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => delElement(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', openImg);
  return cardElement;
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function delElement(element)
{
  element.remove();
}

export {initialCards, placesList, createCard as create, likeCard as like, delElement as delete};
