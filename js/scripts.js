/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/src/animations.js":
/*!******************************!*\
  !*** ./js/src/animations.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* SLIDE UP */
let slideUp = (target, duration=300) => {

    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
          target.style.display = 'none';
          target.style.removeProperty('height');
          target.style.removeProperty('padding-top');
          target.style.removeProperty('padding-bottom');
          target.style.removeProperty('margin-top');
          target.style.removeProperty('margin-bottom');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
          //alert("!");
    }, duration);
}

/* SLIDE DOWN */
let slideDown = (target, duration=300) => {

    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
}

/* TOOGLE */
var slideToggle = (target, duration = 300) => {
    if (window.getComputedStyle(target).display === 'none') {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    slideUp,
    slideDown,
    slideToggle
});


/***/ }),

/***/ "./js/src/form.js":
/*!************************!*\
  !*** ./js/src/form.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formInit)
/* harmony export */ });
/* harmony import */ var _animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations.js */ "./js/src/animations.js");


function formSubmitListener(e) {
    e.preventDefault();
    const form = e.target;
    _animations_js__WEBPACK_IMPORTED_MODULE_0__["default"].slideUp(form);
    const modal = form.closest('.modal');
    if(modal) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('service_tc0fgps', 'template_x64v6v1', this)
            .then(() => {
                console.log('SUCCESS!');
                const closeButton = modal.querySelector('.modal-close');
                _animations_js__WEBPACK_IMPORTED_MODULE_0__["default"].slideDown(closeButton);
                const formResult = modal.querySelector('.form-result');
                formResult.innerHTML = formResult.dataset.defaultText;
                _animations_js__WEBPACK_IMPORTED_MODULE_0__["default"].slideDown(formResult);
            }, (error) => {
                console.log('FAILED...', error);
                formResult.innerHTML = "Произошла ошибка при отправке. Пожалуйста, попробуйте позже.";
            });
    }
}

function formInit() {
    const formSubmit = document.querySelectorAll('form');
    formSubmit.forEach((element) => {
        element.addEventListener('submit', formSubmitListener);
    });
}


/***/ }),

/***/ "./js/src/functions.js":
/*!*****************************!*\
  !*** ./js/src/functions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function onDocumentReady(callback) {
    if (document.readyState === "loading") {
        // Если документ еще загружается, ждем события DOMContentLoaded
        document.addEventListener("DOMContentLoaded", callback);
    } else {
        // Если документ уже загружен, выполняем сразу
        callback();
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    onDocumentReady
});

/***/ }),

/***/ "./js/src/modal.js":
/*!*************************!*\
  !*** ./js/src/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modalInit)
/* harmony export */ });
function openModal(e) {
    if(e.target.dataset.modal) {
        let modal = document.getElementById(e.target.dataset.modal);
        if(e.target.dataset.modalTitle) {
            modal.querySelector('.modal-title').innerHTML = e.target.dataset.modalTitle;
        }
        modal.style.display = "flex";
    }
}
function closeModal(e) {
    let modal = e.target.closest('.modal');
    if(modal) {
        modal.style.display = "none";
    }
}
function closeModalButton(e) {
    closeModal(e);
}
function closeModalWindow(e) {
    if(!e.target.closest('.modal-content')) {
        closeModal(e);
    }
}

function modalInit() {
    const orderButton = document.querySelectorAll('.js_order-button');
    orderButton.forEach((element) => {
        element.addEventListener('click', openModal);
    });
    const modalWindow = document.querySelectorAll('.modal');
    modalWindow.forEach((element) => {
        element.addEventListener('click', closeModalWindow);
    });
    const modalClose = document.querySelectorAll('.modal-close');
    modalClose.forEach((element) => {
        element.addEventListener('click', closeModalButton);
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./js/src/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions.js */ "./js/src/functions.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./js/src/modal.js");
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.js */ "./js/src/form.js");





console.log(111);
_functions_js__WEBPACK_IMPORTED_MODULE_0__["default"].onDocumentReady(function() {
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_form_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=scripts.js.map