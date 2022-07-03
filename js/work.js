'use strict'

var swiper = new Swiper(".slider__gallery", {
	slidesPerView: 1,
	spaceBetween: 30,
	speed: 1400,
	keyboard: {
	enabled: true,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	 },
	navigation: {
	  nextEl: ".next",
	  prevEl: ".prev",
	},
});

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
	if (headerNav.classList.contains('active')) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
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

//gallery
let offset = 0;
let loading = 20;
let gallery = document.querySelector('.gallery');
let btnNext = document.querySelector('.gallery__next');
let btnPrev = document.querySelector('.gallery__prev');
let galleryItemWidth = document.querySelector('.gallery__item').offsetWidth;
let galleryItemWidthMargin = parseInt(getComputedStyle(document.querySelector('.gallery__item')).marginRight);


btnNext.addEventListener('click', () => {
	offset -= galleryItemWidth + galleryItemWidthMargin;
	loading +=20;

	if (loading > 100) {
		offset = 0;
		loading = 20;
	}

	gallery.style.left = offset + 'px';
	document.querySelector('.gallery__line-loading').style.width = loading + '%';
})

btnPrev.addEventListener('click', () => {
	offset += galleryItemWidth + galleryItemWidthMargin;
	loading -=20;

	if (loading < 20) {
		offset = - (galleryItemWidth + galleryItemWidthMargin) * 4 ;
		loading = 100;
	}

	gallery.style.left = offset + 'px';
	document.querySelector('.gallery__line-loading').style.width = loading + '%';
});

//forma
let ListApplication = document.querySelector('.list-application');
let ListApplicationSuccesfully = document.querySelector('.application-succesfully');

wrapper.addEventListener('click', event => {
	if (event.target.closest('.btn__application')) {
		ListApplication.classList.add('application__active');
	} else if (event.target.closest('.application__btn')) {
		event.preventDefault();
		resetInput();
		ListApplication.classList.remove('application__active');
		ListApplicationSuccesfully.classList.add('succesfully__active');
		setTimeout(function() {
			ListApplicationSuccesfully.classList.remove('succesfully__active');
		}, 9000);
	} else if (event.target.closest('.application__exit')) {
		ListApplication.classList.remove('application__active');
		ListApplicationSuccesfully.classList.remove('succesfully__active');
	}
	//Отключаем скролл при октрытом окне form и меню мобилки
	if (ListApplication.classList.contains('application__active') || ListApplicationSuccesfully.classList.contains('succesfully__active') || headerNav.classList.contains('active')) {
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

//Плавное появление блоков
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