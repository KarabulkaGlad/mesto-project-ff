import './index.css';
import * as cards from './scripts/cards.js';
import * as popup from'./scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import * as api from './scripts/api.js';

const clearValidationConfig = {
  buttonClass: '.popup__button',
  errorBlockClass: '.popup__input-error',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: "popup__error_visible"
};
const enableValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const placesList = document.querySelector('.places__list');

const profileSection = document.querySelector('.profile');
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector('.profile__description');
const profileImage = profileSection.querySelector('.profile__image');

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

const changeAvatarButton = document.querySelector('.profile__edit-image-button');
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar'); 
const changeProfileAvatarForm = document.forms.change_avatar;
const newProfileAvatarInput = changeProfileAvatarForm.elements.link;

const popupDeleteCard = document.querySelector('.popup_type_confirm-delete');
const deleteCardForm = document.forms.delete_place;

const cardUX = (evt, handler) => {
  const submitButton = evt.target.querySelector('.popup__button');
  const tempValue = submitButton.textContent;
  submitButton.textContent = "Сохранение...";
  return handler(evt).finally(() => {
    submitButton.textContent = tempValue;
  });
}

const defaultUX = (evt, handler) => {
  return handler(evt);
}

function editProfileHandler(evt) {
  evt.preventDefault();
  return api.changeProfile({name: profileNameInput.value, about: profileDescriptionInput.value}).then(res => {
    setProfile(res);
    popup.close(popupEdit);
  });
}

function changeProfileAvatarHandler(evt) { 
  evt.preventDefault();
  return api.changeProfileAvatar({avatar: newProfileAvatarInput.value}).then(res => {
    setProfile(res);
    popup.close(popupChangeAvatar);
  });
}

function addNewPlaseHandler(evt) {
  evt.preventDefault();
  return api.addCard({name: newPlaseNameInput.value, link: newPlaseLinkInput.value}).then(card => { 
    prependCard(cards.create(card, openPopupDeleteCard, cards.like, openPopupTypeImg));
    popup.close(popupAddNewCard);
    addNewPlaceForm.reset();
    clearValidation(addNewPlaceForm, clearValidationConfig);
  });
}

function deletePlaseHandler(evt) {
  evt.preventDefault();
  const id = evt.target.dataset.cardId;
  return api.deleteCard({cardId: id}).then(() => {
    cards.delete(findCard(id));
    popup.close(popupDeleteCard);
  });
}

function openPopupEdit() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, clearValidationConfig);
  popup.open(popupEdit);
}

function openPopupAddNewCard() {
  popup.open(popupAddNewCard);
}

function openPopupChangeProfileAvatar() {
  popup.open(popupChangeAvatar);
}

function openPopupDeleteCard(cardElement) {
  deleteCardForm.dataset.cardId = cardElement.dataset.cardId;
  popup.open(popupDeleteCard);
}

function openPopupTypeImg(evt) {
  const card = evt.target.closest('.places__item');
  const image = card.querySelector('.card__image');
  const titleText = card.querySelector('.card__title').textContent;
  popupTypeImgImage.src = image.src;
  popupTypeImgImage.alt = image.alt;
  popupTypeImgCaption.textContent = titleText;
  popup.open(popupTypeImg);
}


function appendCard(card) {
  placesList.append(card);
}

function prependCard(card) {
  placesList.prepend(card);
}

function findCard(cardId) {
  const cardList = Array.from(document.querySelectorAll('.places__item'));
  return cardList.find(card => card.dataset.cardId === cardId);
}

function showCards(cardArr) {
  cardArr.forEach(item => appendCard(cards.create(item, openPopupDeleteCard, cards.like, openPopupTypeImg)));
}

function setProfile(profile) {
  profileSection.dataset.profileId = profile._id;
  profileImage.style.cssText = `background-image: url(${profile.avatar})`;
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
}

popupCloseButton.forEach((button) => {
  button.addEventListener('click', () => {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      popup.close(openedPopup);
    }
  });
});

async function submitHandler(evt, handler, template = defaultUX) {
  try {
    await template(evt, handler);
  } catch(err) {
    console.log(err);
  } finally {

  }
}

profileEditButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAddNewCard);
changeAvatarButton.addEventListener('click', openPopupChangeProfileAvatar);
deleteCardForm.addEventListener('submit', (evt) => { submitHandler(evt, deletePlaseHandler); });
editProfileForm.addEventListener('submit', (evt) => { submitHandler(evt, editProfileHandler, cardUX); });
addNewPlaceForm.addEventListener('submit', (evt) => { submitHandler(evt, addNewPlaseHandler, cardUX); });
changeProfileAvatarForm.addEventListener('submit', (evt) => { submitHandler(evt, changeProfileAvatarHandler, cardUX); });

function init() {
  Promise.all([api.getInitialCards(), api.getProfile()])
  .then(([cards, profile]) => {
    setProfile(profile);
    showCards(cards);
  })
  .catch(err => {
    console.log(err);
  });
  enableValidation(enableValidationConfig);
}

init();
