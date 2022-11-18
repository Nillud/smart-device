import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {addMask} from './mask';

// ---------------------------------
const BUTTON_NOJS = document.querySelectorAll('[data-button]');

const REQUEST_BUTTON = document.querySelector('[data-request-button]');
const MODAL_REQUEST = document.querySelector('[data-modal]');
const SRCOLL_BUTTON = document.querySelector('[data-scroll-button]');
const QUESTIONS_BLOCK = document.querySelector('[data-questions]');

const BUTTON_MORE = document.querySelector('[data-button-more]');
const ABOUT_DESCRIPTION = document.querySelector('[data-description]');
const ABOUT_MOBILE = document.querySelector('[data-description-mobile');

const ACCORDEON_FIELDS = document.querySelectorAll('[data-accordeon-field]');

const SUBMIT_BUTTON = document.querySelector('[data-form-submit]');
const MODAL_SUBMIT_BUTTON = document.querySelector('[data-modal-submit]');

const NAME_INPUT = document.querySelector('[data-name]');
const NAME_INPUT_MODAL = document.querySelector('[data-name-modal');
const PHONE_INPUT = document.querySelector('[data-phone]');
const PHONE_INPUT_MODAL = document.querySelector('[data-phone-modal]');
const QUESTION_INPUT = document.querySelector('[data-form-question]');
const QUESTION_INPUT_MODAL = document.querySelector('[data-form-question-modal]');

const pageLoad = () => {
  REQUEST_BUTTON.href = '#';
  SRCOLL_BUTTON.href = '#';
  PHONE_INPUT.removeAttribute('pattern');
  PHONE_INPUT_MODAL.removeAttribute('pattern');
  BUTTON_NOJS.forEach((button) => {
    button.classList.remove('no-js');
  });

  ABOUT_DESCRIPTION.classList.remove('is-active');
  ABOUT_MOBILE.classList.remove('is-active');
};

const closeAccordeons = () => {
  ACCORDEON_FIELDS.forEach((field) => {
    field.classList.remove('is-active');
    field.classList.add('inactive');
  });
};

// const openAccordeon = (field) => {
//   if (field.classList.contains('inactive')) {
//     field.classList.toggle('is-active');
//   } else {
//     field.classList.toggle('inactive');
//   }
// };

const validatePhone = (input, submit) => {
  if (input.value.length <= 10) {
    input.style.outline = 'rgba(227, 38, 54, 0.8) 2px solid';
    submit.disabled = true;
  } else {
    input.style.outline = 'none';
    submit.disabled = false;
  }
};

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // --------------------------------

  iosVhFix();

  pageLoad();

  const setDataToStore = () => {
    if (MODAL_REQUEST.classList.contains('is-active')) {
      localStorage.setItem('nameModal', NAME_INPUT_MODAL);
      localStorage.setItem('phoneModal', PHONE_INPUT_MODAL);
      localStorage.setItem('question', QUESTION_INPUT_MODAL);
    } else {
      localStorage.setItem('name', NAME_INPUT);
      localStorage.setItem('phone', PHONE_INPUT);
      localStorage.setItem('question', QUESTION_INPUT);
    }
  };

  PHONE_INPUT.addEventListener('input', () => {
    addMask(PHONE_INPUT);
  });

  PHONE_INPUT.addEventListener('change', () => {
    validatePhone(PHONE_INPUT, SUBMIT_BUTTON);
  });

  PHONE_INPUT_MODAL.addEventListener('input', () => {
    addMask(PHONE_INPUT_MODAL);
  });

  PHONE_INPUT_MODAL.addEventListener('change', () => {
    validatePhone(PHONE_INPUT_MODAL, MODAL_SUBMIT_BUTTON);
  });

  SUBMIT_BUTTON.addEventListener('click', () => {
    setDataToStore();
  });

  MODAL_SUBMIT_BUTTON.addEventListener('click', () => {
    setDataToStore();
  });

  SRCOLL_BUTTON.addEventListener('click', (e) => {
    if (SRCOLL_BUTTON) {
      e.preventDefault();
      QUESTIONS_BLOCK.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  });

  BUTTON_MORE.addEventListener('click', () => {
    if (BUTTON_MORE) {
      if (ABOUT_DESCRIPTION.classList.contains('is-active')) {
        if (window.screen.width <= 767) {
          if (ABOUT_MOBILE.classList.contains('is-active')) {
            ABOUT_MOBILE.classList.remove('is-active');
          }
        }
        ABOUT_DESCRIPTION.classList.remove('is-active');
        BUTTON_MORE.textContent = 'Подробнее';
      } else {
        if (window.screen.width <= 767) {
          ABOUT_MOBILE.classList.add('is-active');
        }
        ABOUT_DESCRIPTION.classList.add('is-active');
        BUTTON_MORE.textContent = 'Свернуть';
      }
    }
  });

  ACCORDEON_FIELDS.forEach((field) => {
    if (window.screen.width <= 767) {
      field.classList.remove('nojs');
      field.classList.add('inactive');

      field.addEventListener('click', () => {
        if (field.classList.contains('is-active')) {
          field.classList.toggle('is-active');
        } else {
          closeAccordeons();
          field.classList.toggle('is-active');
        }
      });
    }
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
