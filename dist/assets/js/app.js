/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.addEventListener('DOMContentLoaded', () => {\r\n\r\n    // Popups\r\n    const openPopupBtn = [...document.querySelectorAll('.js-open-popup')];\r\n    const activePopup = document.querySelectorAll('.popup');\r\n\r\n    // Ограничение скролла\r\n    function disableScroll(height) {\r\n        const clientHeight = document.documentElement.clientHeight; // Высота документа\r\n        const scroll = this.pageYOffset + clientHeight;\r\n        if (scroll >= height) {\r\n            window.scrollTo(0, height - clientHeight);\r\n        }\r\n    }\r\n    \r\n    let disableScrollFn/* = disableScroll.bind(window, height)*/;\r\n\r\n    openPopupBtn.map(elem => {\r\n        elem.addEventListener('click', function() {\r\n            const popupName = this.dataset.popup;\r\n            const popup = document.getElementById(popupName);\r\n            popup.classList.add('active');\r\n\r\n            // Позиционирование диалогового окна на широких экранах\r\n            const dialog = popup.querySelector('.popup__dialog');\r\n            const clientWidth = document.documentElement.clientWidth;   // Ширина документа\r\n            const breakpoint = 995; // До какой ширины позиционировать окно\r\n\r\n            // Первоначальное позиционирование при клике\r\n            if (popup.classList.contains('popup_left') && clientWidth > breakpoint) {\r\n                const elemRect = elem.getBoundingClientRect();\r\n                const left = elemRect.width / 2 + elemRect.left;\r\n                dialog.style.left = `${left}px`;\r\n            }\r\n\r\n            if (popup.classList.contains('popup_right') && clientWidth > breakpoint) {\r\n                const elemRect = elem.getBoundingClientRect();\r\n                const right = -(clientWidth - dialog.clientWidth -  elemRect.width / 2 - (clientWidth - elemRect.right));\r\n                dialog.style.right = `${right}px`;\r\n            }\r\n\r\n            // Ограничить высоту body на мобильных устройствах при открытии popup => ширина экрана <= 767px\r\n            const height = dialog.clientHeight + 82;     // Высота диалогового окна + нижний отступ\r\n\r\n            if (clientWidth <= 767) {\r\n                console.log(1);\r\n                popup.style.height = `${height}px`;\r\n                disableScrollFn = disableScroll.bind(window, height);\r\n\r\n                window.addEventListener('scroll', disableScrollFn, true);\r\n            }\r\n\r\n            window.onresize = () => {\r\n                \r\n                // Узнаем координаты и размеры элемента, по которому кликаем\r\n                const elemRect = elem.getBoundingClientRect();\r\n                \r\n                const clientWidth = document.documentElement.clientWidth;   // Ширина документа\r\n            \r\n                // Если popup_left\r\n                if (popup.classList.contains('popup_left') && clientWidth > breakpoint) {\r\n                    const left = elemRect.width / 2 + elemRect.left;\r\n                    dialog.style.left = `${left}px`;\r\n                } else if (clientWidth <= breakpoint) dialog.style.left = '';\r\n\r\n                if (popup.classList.contains('popup_right') && clientWidth > breakpoint) {\r\n                    const right = -(clientWidth - dialog.clientWidth -  elemRect.width / 2 - (clientWidth - elemRect.right));\r\n                    dialog.style.right = `${right}px`;\r\n                } else if (clientWidth <= breakpoint) dialog.style.right = '';\r\n            }\r\n        });\r\n    });\r\n\r\n    activePopup.forEach(elem => {\r\n        elem.addEventListener('click', function(e) {\r\n\r\n            const closeBtn = e.target.closest('.popup__close-btn');\r\n            const active = e.target.classList.contains('active');\r\n            const dialog = elem.querySelector('.popup__dialog');\r\n            \r\n            if (closeBtn || active) {\r\n                this.classList.remove('active');\r\n                this.style.height = '';\r\n                dialog.style.left = dialog.style.right = '';\r\n                window.removeEventListener('scroll', disableScrollFn, true);\r\n            }\r\n        });\r\n    });\r\n    // /*Popups\r\n\r\n    // Mask Input\r\n    const input = document.querySelectorAll('input[type=tel]');\r\n    const pattern = /^\\+7\\s\\d{3}\\s\\d{3}\\s\\d{4}$/;\r\n    input.forEach(function(elem) {\r\n        const message = elem.nextElementSibling.querySelector('span');\r\n\r\n        elem.addEventListener('focus', () => {\r\n            elem.classList.remove('error', 'filled');\r\n            message.textContent = 'Контактный телефон';\r\n        });\r\n\r\n        elem.addEventListener('blur', () => {\r\n            if (!pattern.test(elem.value)) {\r\n                elem.classList.remove('filled');\r\n                elem.classList.add('error');\r\n                message.textContent = 'Проверьте набранный номер';\r\n            } else {\r\n                elem.classList.remove('error');\r\n                elem.classList.add('filled');\r\n                message.textContent = 'Контактный телефон';\r\n            }\r\n        });\r\n\r\n        elem.addEventListener('input', mask);\r\n        setCursorPosition(3, elem);\r\n\r\n    });\r\n\r\n    function setCursorPosition(pos, elem) {\r\n        \r\n        if (elem.setSelectionRange) {\r\n            elem.setSelectionRange(pos, pos);\r\n        } else if (elem.createTextRange) {\r\n            const range = elem.createTextRange();\r\n            range.collapse(true);\r\n            range.moveEnd('character', pos);\r\n            range.moveStart('character', pos);\r\n            range.select();\r\n        }\r\n    }\r\n\r\n    function mask (e) {\r\n\r\n        let template = '+7 ___ ___ ____';\r\n        let i = 0;\r\n        const def = template.replace(/\\D/g, \"\");\r\n        let val = this.value.replace(/\\D/g, \"\");\r\n\r\n        if (def.length >= val.length) val = def;\r\n\r\n        template = template.replace(/[_\\d]/g, _ => val.charAt(i++) || \"_\");\r\n        this.value = template;\r\n        i = template.lastIndexOf(val.substr(-1));\r\n        i < template.length && template != '+7 ___ ___ ____' ? i++ : i = template.indexOf(\"_\");\r\n        setCursorPosition(i, this);\r\n    }\r\n    // /*Mask Input\r\n\r\n    // Form submit\r\n    const sendForm = (url, formData) => {\r\n        return fetch (url, {\r\n            method: 'POST',\r\n            headers: {\r\n                'Content-Type': 'application/json; charset=UTF-8'\r\n            },\r\n            body: JSON.stringify(formData)\r\n        });\r\n    };\r\n\r\n    const form = document.querySelector('form');\r\n    form.addEventListener('submit', function(e) {\r\n        e.preventDefault();\r\n\r\n        const input = this.querySelector('input[type=tel]');\r\n        const message = input.nextElementSibling.querySelector('span');\r\n        const btn = this.querySelector('button[type=submit]');\r\n        const card = this.parentNode;\r\n        const text = card.querySelector('.feedback__card__text');\r\n        \r\n        // Проверка на валидность\r\n        // Если не валидна - вывести ошибку и не отправлять форму\r\n        if (!pattern.test(input.value)) {\r\n            input.classList.add('error');\r\n            message.textContent = 'Проверьте набранный номер';\r\n        \r\n        // Иначе отправить форму\r\n        } else {\r\n            btn.disabled = true;\r\n            let formData = new FormData(this);\r\n            formData = Object.fromEntries(formData);\r\n\r\n            sendForm('https://jsonplaceholder.typicode.com/posts', formData)\r\n                .then(res => {\r\n                    if (res.ok) {\r\n                        card.classList.add('success');\r\n                        text.innerHTML = 'Спасибо, что оставили заявку. <br> Мы скоро вам перезвоним.';\r\n                        input.classList.remove('filled');\r\n                        form.reset();\r\n                    }\r\n                })\r\n                .catch(err => console.error(err))\r\n        }\r\n    });\r\n    // /*Form submit\r\n\r\n    // Slide\r\n\r\n    // Индекс слайда по-умолчанию\r\n    let slideIndex = 0;\r\n    const slides = [...document.querySelectorAll('.slider .slider__item')];\r\n\r\n    // Клонируем любой элемент слайдера\r\n    const cloneSlide = slides[0].cloneNode(true);\r\n    cloneSlide.classList.add('slider__hide');\r\n\r\n    document.querySelector('.slider').insertAdjacentElement('afterbegin', cloneSlide);\r\n    \r\n    // Клик по кнопкам\r\n    slides.map((slide, i) => {\r\n        const btn = slide.querySelector('.slider__next-btn');\r\n        btn.addEventListener('click', nextSlide.bind(this, i));\r\n    });\r\n\r\n    showSlides(slideIndex);\r\n\r\n    // Следующий слайдер\r\n    function nextSlide(idx) {\r\n\r\n        const currentSlide = slides[idx];\r\n\r\n        const nextIdx = idx + 1 === slides.length ? 0 : idx + 1\r\n\r\n        const nextSlide = slides[nextIdx];\r\n\r\n        currentSlide.classList.add('animate');\r\n        nextSlide.classList.add('animate');\r\n        \r\n        setTimeout(() => {\r\n            currentSlide.classList.remove('slider__item_current', 'animate');\r\n            nextSlide.classList.remove('slider__item_next', 'animate');\r\n\r\n            showSlides(nextIdx);\r\n        }, 600);\r\n    }\r\n\r\n    // Текущий слайдер\r\n    function currentSlide(idx) {\r\n        showSlides(slideIndex = idx);\r\n    }\r\n\r\n    function showSlides(idx) {\r\n        \r\n        const currentSlide = slides[idx];\r\n        const nextSlide = slides[idx + 1 === slides.length ? 0 : idx + 1];\r\n\r\n        currentSlide.classList.add('slider__item_current');\r\n        nextSlide.classList.add('slider__item_next');\r\n    }\r\n    // /*Slide\r\n\r\n});\n\n//# sourceURL=webpack:///./src/assets/js/main.js?");

/***/ })

/******/ });