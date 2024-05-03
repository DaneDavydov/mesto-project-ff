const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(name, link, deleteCard, likeCard, openImage) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const image = card.querySelector('.card__image');

  image.src = link;
  image.alt = name;
  card.querySelector('.card__title').textContent = name;
  cardDeleteButton.addEventListener('click', (event) => deleteCard(event));

  likeButton.addEventListener('click', likeCard);
  image.addEventListener('click', openImage);

  return card;
}

// Функция удаления карточки
function deleteCard() {
  const card = event.target.closest('.card');
  card.remove();
}

// Лайк карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

export { initialCards, createCard, deleteCard, likeCard };