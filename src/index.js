import './pages/index.css';
import { initialCards, createCard, deleteCard, likeCard } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

// DOM узлы
const placesList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupImg = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const newPlace = document.forms['new-place'];
const cardName = newPlace.elements['place-name'];
const cardUrl = newPlace.elements['link'];

// Выввод карточки на страницу
initialCards.forEach(item => {
  placesList.append(createCard(item.name, item.link, deleteCard, likeCard, handlePopupImg));
});

//открытие попапов
profileAddButton.addEventListener('click', () => {
  openModal(popupAddCard);
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

//редактирование профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

//добавление карточки пользователем
function handleAddCard (evt) {
  evt.preventDefault();
  placesList.prepend(createCard(cardName.value, cardUrl.value, deleteCard, likeCard, handlePopupImg));
  newPlace.reset();
  closeModal(popupAddCard);
}

newPlace.addEventListener('submit', handleAddCard);

//открытие попапа картинки
function handlePopupImg (evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImg);
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
  }
}