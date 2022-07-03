"use strict"

//Плавный переход
let navList = document.querySelector('.nav__list');
let homeLink = document.getElementById('home__link').id;
let servisLink = document.getElementById('servis__link').id;
let wrapper = document.querySelector('.wrapper');
let portfolioLink = document.getElementById('portfolio__link').id;

wrapper.addEventListener('contextmenu', (event) => event.preventDefault());

//burger
let headerNav = document.querySelector('.header__nav');
let headerBurger = document.querySelector('.header__burger');
let headerLogo = document.querySelector('.header__logo');
let phone = document.querySelector('.phone');

headerBurger.addEventListener('click', toggleActiveBurger);

function toggleActiveBurger () {
	headerNav.classList.toggle('active');
	headerBurger.classList.toggle('active');
	headerLogo.classList.toggle('active'); // 2 последних элемента для изменения цвета, проскролленого открытого меню
	phone.classList.toggle('active');
	if (headerNav.classList.contains('active')) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
}

//Плавное появление элементов
let animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll)
	function animOnScroll () {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_visible');
			} else if (!animItem.classList.contains('no-visible')) {
				animItem.classList.remove('_visible');
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}
	setTimeout (() => {
		animOnScroll();
	}, 800)
}

//Сохранение заполненной и не отправленной формы при перезагрузке сайта
let formData = {};
const form = document.querySelector('.form__input');
const LS = localStorage;
let inputButton = document.querySelector('.input__button');

//Получаем данные
form.addEventListener('input', (event) => {
	formData[event.target.name] = event.target.value;
	LS.setItem('formData', JSON.stringify(formData));
	
});

//Восстановить данные
if (LS.getItem('formData')) {
	formData = JSON.parse(LS.getItem('formData'));
	for (let key in formData) {
		form.elements[key].value = formData[key];
	}
}
inputButton.addEventListener('click', () => {LS.clear('formData')})
