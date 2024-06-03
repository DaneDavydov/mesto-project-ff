import './pages/index.css';
import { renderCard, removeCard, toggleLikeCard } from './components/cards.js';
import { openModal, closeModal, setPopupListeners } from './components/modal.js';
import { enableValidation, clearValidation} from './components/validation.js';
import { validationConfig } from './components/constants.js';
import { deleteCard, createCard, getInitialCards, editProfileInfo, getProfileInfo, editProfileImage } from './components/api';

// DOM узлы
const placesList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupImg = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const newPlace = document.forms['new-place'];
const cardName = newPlace.elements['place-name'];
const cardUrl = newPlace.elements['link'];

const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const editAvatar = document.forms['avatar'];
const avatarUrl = editAvatar.elements['link-avatar'];
const avatarInput = editAvatar['avatar-input'];
const avatarButton = editAvatar.querySelector([validationConfig.submitButtonSelector]);
const profileButton = editForm.querySelector([validationConfig.submitButtonSelector]);
const newPlaceButton = newPlace.querySelector([validationConfig.submitButtonSelector]);

let cohortId;

//рендер карточек и данных профиля
Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    cohortId = profileData._id;

    profileImage.style.backgroundImage = `url(\\${profileData.avatar})`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    cardsData.forEach( cardData  => {
      placesList.append(
        renderCard(cardData, cohortId, handleDeleteCard, toggleLikeCard, handlePopupImg)
      );
    });
  })
  .catch( err =>
    console.log(err)
  );

//открытие попапов
profileAddButton.addEventListener('click', () => {
  clearValidation(popupAddCard, validationConfig);
  openModal(popupAddCard);
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig);
  openModal(popupEdit);
});

profileImage.addEventListener('click', () => {
  avatarInput.value = '';
  clearValidation(popupEditAvatar, validationConfig);
  openModal(popupEditAvatar);
})

//закрытие попапов
setPopupListeners();

//редактирование профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileButton);

  editProfileInfo(nameInput.value, jobInput.value)
    .then ( profile => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
    closeModal(popupEdit);
  })
    .catch( err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileButton);
    })
}

editForm.addEventListener('submit', handleFormSubmit);

//редактирование аватара
function handleProfileImageFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, avatarButton);

  editProfileImage(avatarUrl.value)
    .then( profileData => {
      profileImage.style.backgroundImage = `url(\\${profileData.avatar})`;
      closeModal(popupEditAvatar)
    })
    .catch( err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarButton);
    })
}

editAvatar.addEventListener('submit', handleProfileImageFormSubmit);

//добавление карточки с картинкой пользователем на страницу
function handleAddCard(evt) {
  evt.preventDefault();
  renderLoading(true, newPlaceButton);

  createCard(cardName.value, cardUrl.value)
    .then( cardData => {
        placesList.prepend(renderCard(cardData, cohortId, handleDeleteCard, toggleLikeCard, handlePopupImg));
      newPlace.reset();
      closeModal(popupAddCard);
    })
    .catch( err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, newPlaceButton);
    })
}

//удаление карточки
function handleDeleteCard(card, cardData) {
  deleteCard(cardData._id)
    .then(() => removeCard(card))
    .catch( err => {
      console.log(err);
    })
}

newPlace.addEventListener('submit', handleAddCard);

//открытие попапа картинки
function handlePopupImg(evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImg);
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
  }
}

//прелоадер
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

enableValidation(validationConfig);