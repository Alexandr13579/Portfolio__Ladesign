"use strict"

let wrapper = document.querySelector('.wrapper');
let dopItem = document.querySelectorAll('.dop__item');
let photoBtnMore = document.querySelector('.photo__btn-more');

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
}

//main__comanda
let infoListImg1 = document.querySelectorAll('.info-list__item');

infoListImg1.forEach(item => {
	item.addEventListener('click', event => {
		const menu = event.currentTarget.dataset.list;
			document.querySelector(`[data-tar=${menu}]`).classList.toggle('comanda__active');
			document.querySelector(`[data-list=${menu}]`).classList.toggle('comanda__active');
	});
});

//photo
wrapper.addEventListener('click', event => {
	if (event.target.closest('.photo__btn-more')){ 
			photoBtnMore.classList.add('dop__active');
			dopItem.forEach(item => {
				item.classList.add('dop__active')});
			}
		});

let photoFilter = document.querySelectorAll('.photo__item');
let menuList = document.querySelector('.menu__list');

menuList.addEventListener('click', event => {
	let datas = event.target.dataset.photo;
		photoFilter.forEach( item => {
			item.classList.remove('photo__hide');
			if (!item.classList.contains(datas) && datas !== 'all') {
				item.classList.add('photo__hide');
			}
		});
});

//forma
let photoListApplication = document.querySelector('.photo__list-application');
let photoListApplicationSuccesfully = document.querySelector('.photo__list-application-succesfully');

wrapper.addEventListener('click', event => {
	if (event.target.closest('.photo__btn-application')) {
		photoListApplication.classList.add('application__active');
	} else if (event.target.closest('.application__btn')) {
		event.preventDefault();
		resetInput();
		photoListApplication.classList.remove('application__active');
		photoListApplicationSuccesfully.classList.add('succesfully__active');
		setTimeout(function() {
			photoListApplicationSuccesfully.classList.remove('succesfully__active');
		}, 9000);
	} else if (event.target.closest('.application__exit')) {
		photoListApplication.classList.remove('application__active');
		photoListApplicationSuccesfully.classList.remove('succesfully__active');
	}
	
	//Отключаем скролл при октрытом окне form и меню мобилки
	if (photoListApplication.classList.contains('application__active') || photoListApplicationSuccesfully.classList.contains('succesfully__active') || headerNav.classList.contains('active')) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
});

//функция cleaning input
function resetInput() {
	document.getElementById('tel').value = '';
	document.getElementById('name').value = '';
}

//Всплывающее меню
let header = document.querySelector('.header');
let ladasignHeight = document.querySelector('.ladasign').clientHeight;

window.addEventListener('scroll', e => {	
		if (scrollY > ladasignHeight) {
			header.classList.add('header__active');
		} else {
			header.classList.remove('header__active');
		}
	}
)

//кнопка скролла к портфолио
let headerPortfolioLink = document.getElementById('header__portfolio-link');

function scrollTo(element) {
	window.scroll({
		left: 0,
		top: element.offsetTop - 130,
		behavior: 'smooth'
	})
}

//Прокрутка к общему портфолио
let mainPhoto = document.querySelector('.main__photo');

headerPortfolioLink.addEventListener('click', (event) => {
	event.preventDefault()
	scrollTo(mainPhoto);

	if (headerBurger.classList.contains('active')) {
	toggleActiveBurger();//закрываем меню, если оно открыто
	}
});

//Анимируем страницу, плавное появление блоков
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