const burgerBtn = document.querySelector('.header-mobile__left .burger');
const menu = document.querySelector('.header-mobile__menu');
const close = document.querySelector('.header-mobile__close');
const links = document.querySelectorAll('.header-mobile__link');

export default () => {
  burgerBtn.addEventListener('click', () => {
    menu.classList.add('open');
  });

  close.addEventListener('click', () => menu.classList.remove('open'));

  links.forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
};
