export const cardUX = (evt, handler) => {
  const submitButton = evt.target.querySelector('.popup__button');
  const tempValue = submitButton.textContent;
  submitButton.textContent = "Сохранение...";
  return handler(evt).finally(() => {
    submitButton.textContent = tempValue;
  });
}

export const defaultUX = (evt, handler) => {
  return handler(evt);
}