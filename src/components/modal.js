function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpened);
  }
}

const modals = document.querySelectorAll('.popup');
modals.forEach( (modal) => {
  modal.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
      closeModal(modal);
    }
  })
})

export { openModal, closeModal };