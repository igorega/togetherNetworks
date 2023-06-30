/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/form/steps/dropdown.js":
/*!***********************************************!*\
  !*** ./src/components/form/steps/dropdown.js ***!
  \***********************************************/
/***/ (function() {

const dropdownBtn = document.querySelectorAll('.js-dropdown-btn');
const dropdownList = document.querySelectorAll('.js-dropdown-list');
const dropdownSelect = document.querySelectorAll('.js-dropdown-select');
dropdownBtn.forEach(item => {
  item.addEventListener('click', () => {
    item.parentElement.classList.toggle('is-open');
  });

  // close dropdown outside
  document.addEventListener('click', e => {
    if (e.target !== item && e.target !== item.nextElementSibling && item.parentElement.classList.contains('is-open')) {
      item.parentElement.classList.remove('is-open');
    }
  });

  // close dropdown keyboard
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && item.parentElement.classList.contains('is-open')) {
      item.parentElement.classList.remove('is-open');
    }
  });
});
dropdownList.forEach(item => {
  item.addEventListener('click', e => {
    if (e.target !== item) {
      const selectedItem = e.target.parentElement.parentElement.previousElementSibling;
      const targetItem = selectedItem.textContent;
      selectedItem.textContent = e.target.textContent;
      e.target.textContent = targetItem;
      selectedItem.parentElement.classList.remove('is-open');
    }
  });
});
dropdownSelect.forEach(item => {
  item.addEventListener('click', e => {
    if (e.target !== item) {
      const selectedItem = e.target.parentElement.parentElement.previousElementSibling;
      selectedItem.textContent = e.target.textContent;
      selectedItem.parentElement.classList.remove('is-open');
    }
  });
});

/***/ }),

/***/ "./src/components/form/steps/steps.js":
/*!********************************************!*\
  !*** ./src/components/form/steps/steps.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation */ "./src/components/form/steps/validation.js");

const steps = document.querySelector('.js-steps');
const step = document.querySelectorAll('.js-step');
const stepDot = document.querySelectorAll('.js-step-dot');
const nextStepButton = document.querySelector('.js-step-next');
const prevStepButton = document.querySelector('.js-step-prev');
const firstStep = document.querySelector('.js-step:first-child');
const lastStep = document.querySelector('.js-step:last-child');
const activeStepClass = 'is-show';
const hideStepClass = 'is-hide';
const lastStepClass = 'is-last';
const titleButtonStep = 'Next step';
const titleButtonStepLast = 'Start now';
let index = 0;
const showSteps = index => {
  step.forEach(item => {
    item.classList.remove(activeStepClass);
    item.classList.add(hideStepClass);
    const translation = index * 100;
    item.style.transform = `translateX(-${translation}%)`;
  });
  step[index].classList.remove(hideStepClass);
  step[index].classList.add(activeStepClass);
};
const toggleButtonActivity = () => {
  if (firstStep.classList.contains(activeStepClass)) {
    prevStepButton.disabled = true;
  } else {
    prevStepButton.disabled = false;
  }
  if (lastStep.classList.contains(activeStepClass)) {
    nextStepButton.classList.add(lastStepClass);
    nextStepButton.textContent = titleButtonStepLast;
  } else {
    nextStepButton.textContent = titleButtonStep;
    nextStepButton.classList.remove(lastStepClass);
  }
};
const removeErrorActivateButton = () => {
  nextStepButton.disabled = false;
  steps.querySelectorAll('.form-error').forEach(item => item.classList.remove('is-active'));
};
const nextStep = () => {
  if (index !== step.length - 1) {
    index++;
    stepDot.forEach((item, dot) => {
      if (index === dot) {
        item.classList.add('is-active');
      }
    });
  }
  showSteps(index);
  toggleButtonActivity();
};
const prevStep = () => {
  index--;
  if (index < 0) {
    index = step.length - 1;
  }
  stepDot.forEach((item, dot) => {
    if (index === dot - 1) {
      item.classList.remove('is-active');
    }
  });
  removeErrorActivateButton();
  showSteps(index);
  toggleButtonActivity();
};
const getRes = async url => {
  const res = await fetch(url);
  return await res.json();
};
nextStepButton.addEventListener('click', () => {
  if ((0,_validation__WEBPACK_IMPORTED_MODULE_0__.validationCondition)()) {
    nextStepButton.disabled = true;
    getRes('https://www.mocky.io/v2/5dfcef48310000ee0ed2c281').then(data => {
      Object.keys(data.errors).forEach(item => {
        const id = document.querySelector('.is-show').querySelector('.js-data');
        if (data.errors[item].name === id.getAttribute('id')) {
          const errorField = id.closest('.js-step').querySelector('.form-error');
          errorField.textContent = data.errors[item].message;
          errorField.classList.add('is-active');
          const observer = new MutationObserver(() => {
            removeErrorActivateButton();
          });
          observer.observe(id, {
            childList: true
          });
          id.addEventListener('input', () => {
            if (!(0,_validation__WEBPACK_IMPORTED_MODULE_0__.validationCondition)()) {
              removeErrorActivateButton();
            }
          });
        }
      });
    });
  } else {
    nextStep();
  }
});
prevStepButton.addEventListener('click', prevStep);

/***/ }),

/***/ "./src/components/form/steps/validation.js":
/*!*************************************************!*\
  !*** ./src/components/form/steps/validation.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validationCondition: function() { return /* binding */ validationCondition; }
/* harmony export */ });
const validationCondition = () => {
  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const age = document.querySelector('#age');
  const locat = document.querySelector('#location');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const ageValidation = age.textContent === '' && age.closest('.js-step').classList.contains('is-show');
  const locationValidation = locat.value === '' && locat.closest('.js-step').classList.contains('is-show');
  const emailValidation = email.value === '' && email.closest('.js-step').classList.contains('is-show') || !emailReg.test(email.value) && email.closest('.js-step').classList.contains('is-show');
  const passwordValidation = password.value === '' && password.closest('.js-step').classList.contains('is-show');
  const condition = ageValidation || locationValidation || emailValidation || passwordValidation;
  return condition;
};

/***/ }),

/***/ "./src/components/header/header.js":
/*!*****************************************!*\
  !*** ./src/components/header/header.js ***!
  \*****************************************/
/***/ (function() {

const header = document.querySelector('.js-header');
if (header) {
  const setHeaderHeight = () => {
    const headerHeight = header.clientHeight;
    document.body.style.setProperty('--header-height', `${headerHeight / 10}rem`);
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  // detect header height change (if needed)
  const observer = new MutationObserver(() => {
    setHeaderHeight();
  });
  observer.observe(header, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
    characterDataOldValue: false,
    attributeOldValue: false
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/header/header */ "./src/components/header/header.js");
/* harmony import */ var _components_header_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_header_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_form_steps_steps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/form/steps/steps */ "./src/components/form/steps/steps.js");
/* harmony import */ var _components_form_steps_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/form/steps/dropdown */ "./src/components/form/steps/dropdown.js");
/* harmony import */ var _components_form_steps_dropdown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_form_steps_dropdown__WEBPACK_IMPORTED_MODULE_2__);
// components



}();
/******/ })()
;
//# sourceMappingURL=main.js.map