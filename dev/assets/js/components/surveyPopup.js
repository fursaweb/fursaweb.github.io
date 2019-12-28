import Swiper from 'swiper';
import { surveyDescSlider, surveyProductSlider } from './swup';

const surveyPopupBtn = document.querySelectorAll('.survey-btn');
const surveyPopup = document.querySelector('.popup-survey');
const productList = document.querySelector('.coffee-list');
const productListSlider = document.querySelector('.coffee-list-slider');
const productSlider = document.querySelector('.product-slider');
const closeBtns = document.querySelectorAll('.popup-survey__close');

surveyPopupBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    surveyPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

productList.addEventListener('click', ({ target }) => {
  productSlider.classList.add('active');
  let productIndex;

  if (Array.from(target.classList).includes('coffee-list__item')) {
    productIndex = target.dataset.productIndex;
  } else {
    productIndex = target.parentNode.dataset.productIndex;
  }

  surveyProductSlider.slideToLoop(+productIndex);
  surveyDescSlider.slideToLoop(+productIndex);

  setTimeout(() => {
    surveyPopup.classList.remove('active');
  }, 1000);
});

productListSlider.addEventListener('click', ({ target }) => {
  productSlider.classList.add('active');
  let productIndex;

  if (Array.from(target.classList).includes('coffee-list__item')) {
    productIndex = target.dataset.productIndex;
  } else {
    productIndex = target.parentNode.dataset.productIndex;
  }

  surveyProductSlider.slideToLoop(+productIndex);
  surveyDescSlider.slideToLoop(+productIndex);

  setTimeout(() => {
    surveyPopup.classList.remove('active');
  }, 1000);
});

Array.from(closeBtns).forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();

    surveyPopup.classList.remove('active');
    productSlider.classList.remove('active');
    document.body.removeAttribute('style');
  });
});

// likes
if (localStorage.getItem('likedSlideIndex')) {
  const likedSlideIndex = localStorage.getItem('likedSlideIndex');
  const likesCount = localStorage.getItem('likesCount');
  const likedSlide = productSlider.querySelector(`.product-slider__items [data-swiper-slide-index = "${likedSlideIndex}"]`);
  const count = likedSlide.querySelector('.count');

  count.innerHTML = likesCount;
  console.log(count);
};

surveyProductSlider.on('click', ({ target }) => {
  if (localStorage.getItem('isLiked')) {
    return;
  }

  if (target.closest('.like')) {
    const slide = target.closest('[data-swiper-slide-index]');
    const count = target.closest('.like').querySelector('.count');
    const currentCount = count.textContent;
    count.innerHTML = +currentCount + 1;

    localStorage.setItem('isLiked', JSON.stringify(true));
    localStorage.setItem('likedSlideIndex', slide.dataset.swiperSlideIndex);
    localStorage.setItem('likesCount', +currentCount + 1);
  }
});

const mobileProducts = new Swiper('.coffee-list-slider', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
});

// const sliderItems = document.querySelector('.popup-survey .product-slider__items');
// const activeSlide = sliderItems.querySelector('.product-slider__slide--active');
// activeSlide.addEventListener('click', e => {
//   const count = e.currentTarget.querySelector('.count');
//   const currentCount = count.textContent;
//   count.innerHTML = +currentCount + 1;

//   console.log(e.currentTarget);
// });
