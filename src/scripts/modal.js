function openPopupHandler(popup) {
  openPopup(popup);
  addClosingOnEsc(popup);
  addClosingOnOverlay(popup);
}

function closePopupHandler(popup)
{
  removeClosingOnEsc(popup);
  removeClosingOnOverlay(popup);
  closePopup(popup);
}

function addClosingOnEsc(popup)
{
  document.addEventListener('keydown', (evt) => closingOnEsc(evt, popup));
}

function closingOnEsc(evt, popup)
{
  if(evt.key === 'Escape')
  {
    closePopupHandler(popup);
  }
}

function addClosingOnOverlay(popup)
{
  popup.addEventListener('click', (evt) => closingOnOverlay(evt, popup));
}

function closingOnOverlay(evt, popup)
{
  if(evt.target === evt.currentTarget)
  {
    closePopupHandler(popup);
  }
}

function removeClosingOnEsc(popup)
{
  document.removeEventListener('keydown', closingOnEsc);
}

function removeClosingOnOverlay(popup)
{
  popup.removeEventListener('click', closingOnOverlay);
}

function openPopup(popup)
{
  popup.classList.add('popup_is-opened');
}

function closePopup(popup)
{
  popup.classList.remove('popup_is-opened');
}

export{openPopupHandler as open, closePopupHandler as close};
