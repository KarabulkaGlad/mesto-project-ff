const placesList = document.querySelector('.places__list');
const cardTamplate = document.querySelector('#card-template').content;

function createCard(name, link, delElement)
{
  const cardElement = cardTamplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => delElement(cardElement));
  return cardElement;
}

function addCardInPlacesList(card)
{
  placesList.append(card);
}

function showCards()
{
  initialCards.forEach(item => addCardInPlacesList(createCard(item.name, item.link, delElement)));
}

function delElement(element)
{
  element.remove();
}

showCards();

