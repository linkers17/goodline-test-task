document.addEventListener('DOMContentLoaded', () => {

    // Popups
    const openPopupBtn = [...document.querySelectorAll('.js-open-popup')];
    const activePopup = document.querySelectorAll('.popup');

    // Ограничение скролла
    function disableScroll(height) {
        const clientHeight = document.documentElement.clientHeight; // Высота документа
        const scroll = this.pageYOffset + clientHeight;
        if (scroll >= height) {
            window.scrollTo(0, height - clientHeight);
        }
    }
    
    let disableScrollFn/* = disableScroll.bind(window, height)*/;

    openPopupBtn.map(elem => {
        elem.addEventListener('click', function() {
            const popupName = this.dataset.popup;
            const popup = document.getElementById(popupName);
            popup.classList.add('active');

            // Позиционирование диалогового окна на широких экранах
            const dialog = popup.querySelector('.popup__dialog');
            const clientWidth = document.documentElement.clientWidth;   // Ширина документа
            const breakpoint = 995; // До какой ширины позиционировать окно

            // Первоначальное позиционирование при клике
            if (popup.classList.contains('popup_left') && clientWidth > breakpoint) {
                const elemRect = elem.getBoundingClientRect();
                const left = elemRect.width / 2 + elemRect.left;
                dialog.style.left = `${left}px`;
            }

            if (popup.classList.contains('popup_right') && clientWidth > breakpoint) {
                const elemRect = elem.getBoundingClientRect();
                const right = -(clientWidth - dialog.clientWidth -  elemRect.width / 2 - (clientWidth - elemRect.right));
                dialog.style.right = `${right}px`;
            }

            // Ограничить высоту body на мобильных устройствах при открытии popup => ширина экрана <= 767px
            const height = dialog.clientHeight + 82;     // Высота диалогового окна + нижний отступ

            if (clientWidth <= 767) {
                console.log(1);
                popup.style.height = `${height}px`;
                disableScrollFn = disableScroll.bind(window, height);

                window.addEventListener('scroll', disableScrollFn, true);
            }

            window.onresize = () => {
                
                // Узнаем координаты и размеры элемента, по которому кликаем
                const elemRect = elem.getBoundingClientRect();
                
                const clientWidth = document.documentElement.clientWidth;   // Ширина документа
            
                // Если popup_left
                if (popup.classList.contains('popup_left') && clientWidth > breakpoint) {
                    const left = elemRect.width / 2 + elemRect.left;
                    dialog.style.left = `${left}px`;
                } else if (clientWidth <= breakpoint) dialog.style.left = '';

                if (popup.classList.contains('popup_right') && clientWidth > breakpoint) {
                    const right = -(clientWidth - dialog.clientWidth -  elemRect.width / 2 - (clientWidth - elemRect.right));
                    dialog.style.right = `${right}px`;
                } else if (clientWidth <= breakpoint) dialog.style.right = '';
            }
        });
    });

    activePopup.forEach(elem => {
        elem.addEventListener('click', function(e) {

            const closeBtn = e.target.closest('.popup__close-btn');
            const active = e.target.classList.contains('active');
            const dialog = elem.querySelector('.popup__dialog');
            
            if (closeBtn || active) {
                this.classList.remove('active');
                this.style.height = '';
                dialog.style.left = dialog.style.right = '';
                window.removeEventListener('scroll', disableScrollFn, true);
            }
        });
    });
    // /*Popups

    // Mask Input
    const input = document.querySelectorAll('input[type=tel]');
    const pattern = /^\+7\s\d{3}\s\d{3}\s\d{4}$/;
    input.forEach(function(elem) {
        const message = elem.nextElementSibling.querySelector('span');

        elem.addEventListener('focus', () => {
            elem.classList.remove('error', 'filled');
            message.textContent = 'Контактный телефон';
        });

        elem.addEventListener('blur', () => {
            if (!pattern.test(elem.value)) {
                elem.classList.remove('filled');
                elem.classList.add('error');
                message.textContent = 'Проверьте набранный номер';
            } else {
                elem.classList.remove('error');
                elem.classList.add('filled');
                message.textContent = 'Контактный телефон';
            }
        });

        elem.addEventListener('input', mask);
        setCursorPosition(3, elem);

    });

    function setCursorPosition(pos, elem) {
        
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            const range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function mask (e) {

        let template = '+7 ___ ___ ____';
        let i = 0;
        const def = template.replace(/\D/g, "");
        let val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;

        template = template.replace(/[_\d]/g, _ => val.charAt(i++) || "_");
        this.value = template;
        i = template.lastIndexOf(val.substr(-1));
        i < template.length && template != '+7 ___ ___ ____' ? i++ : i = template.indexOf("_");
        setCursorPosition(i, this);
    }
    // /*Mask Input

    // Form submit
    const sendForm = (url, formData) => {
        return fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(formData)
        });
    };

    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const input = this.querySelector('input[type=tel]');
        const message = input.nextElementSibling.querySelector('span');
        const btn = this.querySelector('button[type=submit]');
        const card = this.parentNode;
        const text = card.querySelector('.feedback__card__text');
        
        // Проверка на валидность
        // Если не валидна - вывести ошибку и не отправлять форму
        if (!pattern.test(input.value)) {
            input.classList.add('error');
            message.textContent = 'Проверьте набранный номер';
        
        // Иначе отправить форму
        } else {
            btn.disabled = true;
            let formData = new FormData(this);
            formData = Object.fromEntries(formData);

            sendForm('https://jsonplaceholder.typicode.com/posts', formData)
                .then(res => {
                    if (res.ok) {
                        card.classList.add('success');
                        text.innerHTML = 'Спасибо, что оставили заявку. <br> Мы скоро вам перезвоним.';
                        input.classList.remove('filled');
                        form.reset();
                    }
                })
                .catch(err => console.error(err))
        }
    });
    // /*Form submit

    // Slide

    // Индекс слайда по-умолчанию
    let slideIndex = 0;
    const slides = [...document.querySelectorAll('.slider .slider__item')];

    // Клонируем любой элемент слайдера
    const cloneSlide = slides[0].cloneNode(true);
    cloneSlide.classList.add('slider__hide');

    document.querySelector('.slider').insertAdjacentElement('afterbegin', cloneSlide);
    
    // Клик по кнопкам
    slides.map((slide, i) => {
        const btn = slide.querySelector('.slider__next-btn');
        btn.addEventListener('click', nextSlide.bind(this, i));
    });

    showSlides(slideIndex);

    // Следующий слайдер
    function nextSlide(idx) {

        const currentSlide = slides[idx];

        const nextIdx = idx + 1 === slides.length ? 0 : idx + 1

        const nextSlide = slides[nextIdx];

        currentSlide.classList.add('animate');
        nextSlide.classList.add('animate');
        
        setTimeout(() => {
            currentSlide.classList.remove('slider__item_current', 'animate');
            nextSlide.classList.remove('slider__item_next', 'animate');

            showSlides(nextIdx);
        }, 600);
    }

    // Текущий слайдер
    function currentSlide(idx) {
        showSlides(slideIndex = idx);
    }

    function showSlides(idx) {
        
        const currentSlide = slides[idx];
        const nextSlide = slides[idx + 1 === slides.length ? 0 : idx + 1];

        currentSlide.classList.add('slider__item_current');
        nextSlide.classList.add('slider__item_next');
    }
    // /*Slide

});