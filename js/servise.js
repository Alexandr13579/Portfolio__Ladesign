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
	if (headerNav.classList.contains('active')) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
}


//cost__more All
let columnSubTitle = document.querySelectorAll('.column__sub-title');
let costMore = document.querySelector('#all');
let costMoreOne = document.querySelectorAll('#one__btn');

costMore.addEventListener('click', () => {
	columnSubTitle.forEach( item => {
		item.classList.toggle('column__active');
	})
	document.querySelectorAll('.cost__column').forEach( item => {
		item.classList.toggle('cost__column-active')
	})

	costMore.classList.toggle('cost__more-active');

	if (costMore.classList.contains('cost__more-active')) {
		costMore.querySelector('p').innerHTML = 'Свернуть';
	} else {
		costMore.querySelector('p').innerHTML = 'Развернуть';
	}
});

//cost__more One
costMoreOne.forEach( item => {
	item.addEventListener('click', event => {
		const menu = event.currentTarget.dataset.btn;
		document.querySelector(`[data-list="${menu}"]`).classList.toggle('column__active');
		document.querySelector(`[data-button="${menu}"]`).classList.toggle('column__button__active');
		document.querySelector(`[data-btn="${menu}"]`).classList.toggle('cost__more-active');
		document.querySelector(`[data-column="${menu}"]`).classList.toggle('cost__column-active');
		
		if (item.classList.contains('cost__more-active')) {
			item.querySelector('p').innerHTML = 'Свернуть';
		} else {
			item.querySelector('p').innerHTML = 'Развернуть';
		}
	})
})

//gallery
let offset = 0;
let loading = 20;
let gallery = document.querySelector('.gallery');
let btnNext = document.querySelector('.next');
let btnPrev = document.querySelector('.prev');
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


//кнопки
let headerPortfolioLink = document.getElementById('header__portfolio-link');

function scrollTo(element) {
	window.scroll({
		left: 0,
		top: element.offsetTop - 130,
		behavior: 'smooth'
	})
}

//Плавная загрузка элементов
let animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll)
	function animOnScroll () {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 10;

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