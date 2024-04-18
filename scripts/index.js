// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(name, link, deleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = card.querySelector('.card__delete-button');

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__description').textContent = name;
  cardDeleteButton.addEventListener('click', (event) => deleteCard(event));

  return card
}

// @todo: Функция удаления карточки
function deleteCard() {
  const card = event.target.closest('.card');
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item.name, item.link, deleteCard));
});