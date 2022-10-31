import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import IMask from 'imask';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------
  const pageBody = document.querySelector('[data-body]');
  const buttonRequest = document.querySelector('[data-request-button]');
  const modalRequest = document.querySelector('[data-modal]');
  const buttonClose = document.querySelectorAll('[data-close-modal]');
  const scrollButton = document.querySelector('[data-scroll-button]');
  const questionsBlock = document.querySelector('[data-questions]');
  const buttonMore = document.querySelector('[data-button-more]');
  const aboutDescription = document.querySelector('[data-description]');

  const accordeonSections = document.querySelector('[data-accordeon-sections]');
  const accordeonContacts = document.querySelector('[data-accordeon-contacts]');

  const phoneInput = document.querySelector('[data-phone]');
  const phoneInputModal = document.querySelector('[data-phone-modal]');
  const maskOptions = {
    mask: '+{7}(000)000 00 00',
    lazy: false,
  };

  const phoneMask = new IMask(phoneInput, maskOptions);
  const phoneMaskModal = new IMask(phoneInputModal, maskOptions);

  phoneInput.addEventListener('load', () => {
    phoneMask();
  });

  phoneInputModal.addEventListener('load', () => {
    phoneMaskModal();
  });

  iosVhFix();

  buttonRequest.addEventListener('click', () => {
    if (modalRequest) {
      modalRequest.classList.add('is-active');

      pageBody.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          modalRequest.classList.remove('is-active');
        }
      });
    }
  });

  buttonClose.forEach((button) => {
    button.addEventListener('click', () => {
      if (modalRequest) {
        modalRequest.classList.remove('is-active');
      }
    });
  });

  scrollButton.addEventListener('click', () => {
    if (scrollButton) {
      questionsBlock.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  });

  buttonMore.addEventListener('click', () => {
    if (buttonMore) {
      if (aboutDescription.classList.contains('is-active')) {
        aboutDescription.classList.remove('is-active');
        buttonMore.textContent = 'Подробнее';
      } else {
        aboutDescription.classList.add('is-active');
        buttonMore.textContent = 'Свернуть';
      }
    }
  });

  if (accordeonSections) {
    accordeonSections.classList.remove('nojs');
    accordeonSections.classList.add('inactive');

    accordeonSections.addEventListener('click', () => {
      if (accordeonContacts.classList.contains('is-active')) {
        accordeonContacts.classList.remove('is-active');
        accordeonContacts.classList.add('inactive');
      }

      if (accordeonSections.classList.contains('inactive')) {
        accordeonSections.classList.remove('inactive');
        accordeonSections.classList.add('is-active');
      } else {
        accordeonSections.classList.remove('is-active');
        accordeonSections.classList.add('inactive');
      }
    });
  }

  if (accordeonContacts) {
    accordeonContacts.classList.remove('nojs');
    accordeonContacts.classList.add('inactive');

    accordeonContacts.addEventListener('click', () => {
      if (accordeonSections.classList.contains('is-active')) {
        accordeonSections.classList.remove('is-active');
        accordeonSections.classList.add('inactive');
      }

      if (accordeonContacts.classList.contains('inactive')) {
        accordeonContacts.classList.remove('inactive');
        accordeonContacts.classList.add('is-active');
      } else {
        accordeonContacts.classList.remove('is-active');
        accordeonContacts.classList.add('inactive');
      }
    });
  }


  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
