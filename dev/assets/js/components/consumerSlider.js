import Swiper from 'swiper';

const slider = new Swiper('.consumers__slider', {
  loop: true,
  centeredSlides: true,
  autoplay: true,
  allowTouchMove: true,
  pagination: {
    el: '.swiper-pagination',
  }
});

