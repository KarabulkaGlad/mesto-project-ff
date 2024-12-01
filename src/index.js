import './index.css';
import * as cards from './scripts/cards.js';
import * as popup from'./scripts/modal.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupCloseB = document.querySelectorAll('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const profileEditB = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms.edit_profile;
const profileDescriptionInput = editProfileForm.elements.description;
const profileNameInput = editProfileForm.elements.name;

const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addB = document.querySelector('.profile__add-button');
const addNewPlaceForm = document.forms.new_place;
const newPlaseNameInput = addNewPlaceForm.elements.place_name;
const newPlaseLinkInput = addNewPlaceForm.elements.link;

const popupTypeImg = document.querySelector('.popup_type_image');
const popupTypeImgCaption = document.querySelector('.popup__caption');
const popupTypeImgImage = document.querySelector('.popup__image');

function showCards()
{
  cards.initialCards.forEach(item => cards.append(cards.create(item, cards.delete, cards.like, openPopupTypeImg)));
}

popupCloseB.forEach((button) => {
  button.addEventListener('click', () => {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup)
    {
      popup.close(openedPopup);
    }
  });
});

profileEditB.addEventListener('click', openPopupEdit);
function openPopupEdit()
{
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  popup.open(popupEdit);
}

editProfileForm.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(evt)
{
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  popup.close(popupEdit);
}

addB.addEventListener('click', openPopupAddNewCard);
function openPopupAddNewCard()
{
  popup.open(popupAddNewCard)
}

addNewPlaceForm.addEventListener('submit', addNewPlaseHandler);
function addNewPlaseHandler(evt)
{
  evt.preventDefault();
  cards.prepend(cards.create({name: newPlaseNameInput.value, link: newPlaseLinkInput.value}, cards.delete, cards.like, openPopupTypeImg));
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

showCards();

