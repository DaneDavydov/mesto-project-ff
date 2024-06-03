import {likeCard, removeLikeCard} from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function renderCard(data, cohortId, removeCard, toggleLike, openImage) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  const image = card.querySelector('.card__image');
  const isLiked = data.likes.some( like => like._id === cohortId);

  image.src = data.link;
  image.alt = data.name;
  card.querySelector('.card__title').textContent = data.name;
  likeCounter.textContent = data.likes.length;

  data.owner._id === cohortId ? cardDeleteButton.style.display = 'block' : cardDeleteButton.style.display = 'none';
  isLiked ? likeButton.classList.add('card__like-button_is-active') : likeButton.classList.remove('card__like-button_is-active');

  cardDeleteButton.addEventListener('click', () => removeCard(card, data));
  likeButton.addEventListener('click', () => toggleLike(card, data));
  image.addEventListener('click', openImage);

  return card;
}

//включение выключения лайка
function toggleLikeCard(card, data) {
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');

  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeLikeCard(data._id)
      .then( data => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch( err => {
        console.log(err)
      })
  } else {
    likeCard(data._id)
      .then( data => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch( err => {
        console.log(err)
      })
  }
}

//Функция удаления карточки
function removeCard(card) {
  card.remove();
}

export { renderCard, removeCard, toggleLikeCard };