'use strict';
/**
 *************************************** Variables
 **/
/*filter doter*/
const arrFilterDoter = document.querySelectorAll('.filter-doter');
/*popup form*/
const orderBtn = document.querySelectorAll('.getOrder');

/**
 *************************************** Import
 **/
import './components/localization';
import swup from './components/swup';
import filterDoter from "./components/filterDoter";
import order from './components/order';
import './components/featurePopup';
import './components/surveyPopup';
import './components/consumerSlider';
import burgerMenu from './components/burgerMenu';

swup();
burgerMenu();
/**
 *************************************** Processing
 **/
/*filter doter*/
if (arrFilterDoter.length > 0) {
    filterDoter(arrFilterDoter);
}
/*popup form*/
if (orderBtn !== null) {
    order(orderBtn);
}

window.addEventListener('scroll', event => {
  const order = document.querySelector('.order-mobile');
  const headerMobile = document.querySelector('.header-mobile');

  if (order.offsetTop <= window.pageYOffset) {
    headerMobile.classList.add('white');
  } else {
    headerMobile.classList.remove('white');
  }
});

