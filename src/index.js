import './index.css';
import * as cards from './scripts/cards.js';
import * as popup from'./scripts/modal.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupCloseButton = document.querySelectorAll('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms.edit_profile;
const profileDescriptionInput = editProfileForm.elements.description;
const profileNameInput = editProfileForm.elements.name;

const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const addNewPlaceForm = document.forms.new_place;
const newPlaseNameInput = addNewPlaceForm.elements.place_name;
const newPlaseLinkInput = addNewPlaceForm.elements.link;

const popupTypeImg = document.querySelector('.popup_type_image');
const popupTypeImgCaption = document.querySelector('.popup__caption');
const popupTypeImgImage = document.querySelector('.popup__image');

function showCards()
{
  cards.initialCards.forEach(item => appendCard(cards.create(item, cards.delete, cards.like, openPopupTypeImg)));
}

function openPopupEdit()
{
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  popup.open(popupEdit);
}

function handleFormSubmit(evt)
{
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  popup.close(popupEdit);
}

function openPopupAddNewCard()
{
  popup.open(popupAddNewCard)
}

function addNewPlaseHandler(evt)
{
  evt.preventDefault();
  prependCard(cards.create({name: newPlaseNameInput.value, link: newPlaseLinkInput.value}, cards.delete, cards.like, openPopupTypeImg));
  popup.close(popupAddNewCard);
  addNewPlaceForm.reset();
}

function openPopupTypeImg(evt)
{
  const card = evt.target.closest('.places__item');
  const image = card.querySelector('.card__image');
  const titleText = card.querySelector('.card__title').textContent;
  popupTypeImgImage.src = image.src;
  popupTypeImgImage.alt = image.alt;
  popupTypeImgCaption.textContent = titleText;
  popup.open(popupTypeImg);
}

function appendCard(card)
{
  cards.placesList.append(card);
}

function prependCard(card)
{
  cards.placesList.prepend(card);
}

popupCloseButton.forEach((button) => {
  button.addEventListener('click', () => {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup)
    {
      popup.close(openedPopup);
    }
  });
});

profileEditButton.addEventListener('click', openPopupEdit);
editProfileForm.addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', openPopupAddNewCard);
addNewPlaceForm.addEventListener('submit', addNewPlaseHandler);

showCards();

