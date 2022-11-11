import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {addMask} from './mask';

// ---------------------------------
const buttonNoJs = document.querySelectorAll('[data-button]');

const requestButton = document.querySelector('[data-request-button]');
const modalRequest = document.querySelector('[data-modal]');
const scrollButton = document.querySelector('[data-scroll-button]');
const questionsBlock = document.querySelector('[data-questions]');

const buttonMore = document.querySelector('[data-button-more]');
const aboutDescription = document.querySelector('[data-description]');
const aboutMobile = document.querySelector('[data-description-mobile');

const accordeonFields = document.querySelectorAll('[data-accordeon-field]');

const submitButton = document.querySelector('[data-form-submit]');
const modalSubmitButton = document.querySelector('[data-modal-submit]');

const nameInput = document.querySelector('[data-name]');
const nameInputModal = document.querySelector('[data-name-modal');
const phoneInput = document.querySelector('[data-phone]');
const phoneInputModal = document.querySelector('[data-phone-modal]');

const closeAccordeons = () => {
  accordeonFields.forEach((field) => {
    field.classList.remove('is-active');
    field.classList.add('inactive');
  });
};

const openAccordeon = (field) => {
  if (field.classList.contains('inactive')) {
    field.classList.remove('inactive');
    field.classList.add('is-active');
  } else {
    field.classList.remove('is-active');
    field.classList.add('inactive');
  }
};

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // --------------------------------

  iosVhFix();

  requestButton.href = '#';

  buttonNoJs.forEach((button) => {
    button.classList.remove('no-js');
  });

  aboutDescription.classList.remove('is-active');
  aboutMobile.classList.remove('is-active');

  const setDataToStore = () => {
    if (modalRequest.classList.contains('is-active')) {
      localStorage.setItem('nameModal', nameInputModal);
      localStorage.setItem('phoneModal', phoneInputModal);
    } else {
      localStorage.setItem('name', nameInput);
      localStorage.setItem('phone', phoneInput);
    }
  };

  phoneInput.addEventListener('input', () => {
    addMask(phoneInput);
  });

  phoneInput.addEventListener('change', () => {
    if (phoneInput.value.length <= 10) {
      phoneInput.style.backgroundColor = 'rgba(227, 38, 54, 0.8)';
      submitButton.disabled = true;
    } else {
      phoneInput.style.background = 'rgba(4,20,39,.15)';
      submitButton.disabled = false;
    }
  });

  phoneInputModal.addEventListener('input', () => {
    addMask(phoneInputModal);
  });

  submitButton.addEventListener('click', () => {
    setDataToStore();
  });

  modalSubmitButton.addEventListener('click', () => {
    setDataToStore();
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
        if (window.screen.width <= 767) {
          if (aboutMobile.classList.contains('is-active')) {
            aboutMobile.classList.remove('is-active');
          }
        }
        aboutDescription.classList.remove('is-active');
        buttonMore.textContent = 'Подробнее';
      } else {
        if (window.screen.width <= 767) {
          aboutMobile.classList.add('is-active');
        }
        aboutDescription.classList.add('is-active');
        buttonMore.textContent = 'Свернуть';
      }
    }
  });

  accordeonFields.forEach((field) => {
    field.classList.remove('nojs');
    field.classList.add('inactive');

    field.addEventListener('click', () => {
      if (field.classList.contains('is-active')) {
        openAccordeon(field);
      } else {
        closeAccordeons();
        openAccordeon(field);
      }
    });
  });

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
