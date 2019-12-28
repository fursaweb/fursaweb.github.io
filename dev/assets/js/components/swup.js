import Swiper from 'swiper';

const infoTexts = {
  ru: [
    'Контролируй крепость напитка',
    'Готовь до шести порций кофе за раз',
    'Регулируй количество всех ингредиентов',
  ],
  ua: [
    'Контролюй міцність напою',
    'Готуй до шести порцій кави за раз',
    'Регулюй кількість всіх інгредієнтів',
  ],
};

function getPercentInData(elem) {
  return `${elem.getAttribute('data-percent') || 50}%`;
}

function getPercentInDataDote(elem) {
  const wrap = elem.parentElement;
  const step = wrap.getAttribute('data-step');
  const maxCount = wrap.getAttribute('data-max-count');
  const part = 100 / maxCount;
  let result = '100%';

  if (step !== maxCount) {
    result = `${(step - 1) * part + 12.5}%`;
  }
  return result;
}

function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
  const mql = window.matchMedia(mediaQuery);
  mql.addListener(e => layoutChangedCallback(e.matches));
  layoutChangedCallback(mql.matches);
};

/***************************slider**************************************/
const mySwiper = new Swiper('.types-coffee .machine-slider__wrap', {
  slidesPerView: 7,
  centeredSlides: true,
  uniqueNavElements: true,
  allowTouchMove: false,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  navigation: {
    prevEl: '.slide-prev',
    nextEl: '.slide-next',
  },
});

const currentLng = localStorage.getItem('language')
  ? localStorage.getItem('language')
  : (navigator.language || navigator.userLanguage);


mySwiper.on('slideChange', function() {
  const { activeIndex } = this;
  const sliderInfoTitle = document.querySelector('.slider-info__title');
  sliderInfoTitle.innerHTML = infoTexts[currentLng][activeIndex % infoTexts[currentLng].length];
});

const mobileSwiper = new Swiper('.types-coffee-mobile .machine-slider__wrap', {
  slidesPerView: 7,
  centeredSlides: true,
  uniqueNavElements: true,
  allowTouchMove: true,
  navigation: {
    prevEl: '.slide-prev',
    nextEl: '.slide-next',
  },
});

const slideInfoTitle = document.querySelector('.slide-info__title');
slideInfoTitle.innerHTML = infoTexts[currentLng][0]

mobileSwiper.on('slideChange', function() {
  const { activeIndex } = this;
  slideInfoTitle.innerHTML = infoTexts[currentLng][activeIndex % infoTexts[currentLng].length];
});

export const surveyDescSlider = new Swiper('.product-slider__description', {
  slidesPerView: 'auto',
  loop: true,
  loopedSlides: 7,
  allowTouchMove: true,

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

  breakpoints: {
    920: {
      allowTouchMove: false,
    },
  },
});

export const surveyProductSlider = new Swiper('.product-slider__items', {
  slidesPerView: 'auto',
  loopedSlides: 7,
  centeredSlides: true,
  allowTouchMove: true,
  loop: true,
  slideActiveClass: 'product-slider__slide--active',

  watchSlidesVisibility: true,
  watchSlidesProgress: true,

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  navigation: {
    prevEl: '.slider-control__left',
    nextEl: '.slider-control__right',
  },

  breakpoints: {
    920: {
      allowTouchMove: false,
    },
  },
});

surveyDescSlider.controller.control = surveyProductSlider;
surveyProductSlider.controller.control = surveyDescSlider;

export default () => {
  /****** animation ******/
  installMediaQueryWatcher('(min-width: 1023px)', (matches) => {
    const consumerElem = document.querySelectorAll('.consumer__elem');
    const video = document.getElementById('video-cm');
    const machineImageElem = document.querySelectorAll('.machine__preview__image-elem');
    let videoDuration = video.duration;
    let endedVideo = false;

    let controller = new ScrollMagic.Controller();
    let timeline = new TimelineMax();
    let timelineBefore = new TimelineMax();

    let scene = new ScrollMagic.Scene({
      triggerElement: 'section',
      duration: '1101%',
      triggerHook: 0.1
    }).setTween(timeline)
      .setPin('main')
      .addTo(controller);

    // const typesCoffeeSection = document.getElementById('types-coffee');
    // const anchorLink = document.getElementById('choose').addEventListener('click', (e) => {
    //   e.preventDefault();
    //   const id = e.target.getAttribute('href');
    //   timeline.to('.types-coffee', 0, { visibility: 'visible' })
    // });

    function consumerElemTimeline() {
      for (let i = 0; i < consumerElem.length; i++) {
        if (i > 0) {
          timeline
            .to(consumerElem[0], 0.5, {opacity: 0}, `-=${1}`)
            .from(consumerElem[i].querySelector('.consumer__img'),
              1, {scale: 1.1, opacity: 0, ease: Power1.easeInOut})
            .fromTo(consumerElem[i].querySelector('.consumer__text p'), 1,
              {bottom: '-100px', opacity: 0},
              {bottom: 0, opacity: 1, ease: Power1.easeInOut}, `-=${1}`)
            .to(consumerElem[i].querySelector('.consumer__text'), 0.5, {css: {className: '+=active'}}, `-=${1}`)
            .to(consumerElem[i].querySelector('.consumer__product .pulse'), 0.5, {css: {className: '+=active'}})
            .to(consumerElem[i].querySelector('.consumer__img'),
              1, {scale: 1, opacity: 1, ease: Power1.easeInOut})
            .from(consumerElem[i].querySelector('.consumer__product'),
              1, {opacity: 0, ease: Power1.easeInOut},
              `-=${.5}`)
            .staggerFromTo(consumerElem[i].querySelectorAll('.filter__elem'), 1,
              {left: '-230px', opacity: 0},
              {left: '0', opacity: 1, ease: Power1.easeInOut}, '0.3')
            .to(consumerElem[i].querySelectorAll('.filter-slider__wrap')[0], 3,
              {width: getPercentInData(consumerElem[i].querySelectorAll('.filter-slider__wrap')[0])}, `-= 0.3`)
            .to(consumerElem[i].querySelectorAll('.filter-doter__line')[0], 3,
              {width: getPercentInDataDote(consumerElem[i].querySelectorAll('.filter-doter__line')[0])}, `-=0.3`)
            .to(consumerElem[i].querySelectorAll('.filter-doter__line')[1],
              7,
              {width: getPercentInDataDote(consumerElem[i].querySelectorAll('.filter-doter__line')[1])}, `-=1`)
            .to(consumerElem[i].querySelectorAll('.filter-slider__wrap')[1],
              7,
              {width: getPercentInData(consumerElem[i].querySelectorAll('.filter-doter__line')[1])}, `-=6`)

        }

        timeline.to(consumerElem[i].querySelector('.consumer__img'),
          1,
          {opacity: 0});
        if (i === consumerElem.length - 1) {
          timeline.to('.consumer .consumer__title',
            1,
            {scale: 1, opacity: 0}, `-=${1}`)
        }
        timeline.to(consumerElem[i].querySelector('.consumer__product'),
          1,
          {opacity: 0, ease: Power1.easeInOut}, `-=${1}`)
          .to(consumerElem[i].querySelector('.consumer__text'),
            1,
            {opacity: 0, ease: Power1.easeInOut}, `-=${1}`)
          .to(consumerElem[i].querySelector('.filter'),
            1,
            {opacity: 0, ease: Power1.easeInOut}, `-=${1}`)
      }
    }

    function machineImageAnimations() {
      for (let i = 0; i < machineImageElem.length; i++) {

        if (i < machineImageElem.length - 1) {
          if (i === 0) {
            timeline.to(machineImageElem[i], 0.8, {opacity: 1}, `-=${.5}`);
          } else {
            timeline.to(machineImageElem[i], .1, {opacity: 1}, `+=${.5}`);
          }
          if (i > 0) {
            timeline.to(machineImageElem[i - 1], .1, {opacity: 0}, `-=${.1}`)
          }
        }
      }
    }

    if (matches) {
    console.log('foo');
    /*анимация первого екрана*/
    timelineBefore.fromTo(consumerElem[0].querySelector('.consumer__img'), .5,
      {scale: 1.1, opacity: 1},
      {scale: 1, opacity: 1, ease: Power1.easeInOut})
      .fromTo(consumerElem[0].querySelector('.consumer__text p'), .5,
        {bottom: '-100px', opacity: 0},
        {bottom: 0, opacity: 1, ease: Power1.easeInOut}, ` -=${.5}`)
      .to(consumerElem[0].querySelector('.consumer__text'), 0.5, {css: {className: '+=active'}}, ` -=${1}`)
      .from(consumerElem[0].querySelector('.consumer__product'),
        1, {opacity: 0, ease: Power1.easeInOut},
        ` -=${.5}`)
      .staggerFromTo(consumerElem[0].querySelectorAll('.filter__elem'), .5,
        {left: '-230px', opacity: 0},
        {left: '0', opacity: 1, ease: Power1.easeInOut}, '0.3')
      .to(consumerElem[0].querySelectorAll('.filter-slider__wrap')[0], 1,
        {width: getPercentInData(consumerElem[0].querySelectorAll('.filter-slider__wrap')[0])}, `-= 0.3`)
      .to(consumerElem[0].querySelectorAll('.filter-doter__line')[0], 1.5,
        {width: getPercentInDataDote(consumerElem[0].querySelectorAll('.filter-doter__line')[0])}, `-=1`)
      .to(consumerElem[0].querySelectorAll('.filter-doter__line')[1],
        1.5,
        {width: getPercentInDataDote(consumerElem[0].querySelectorAll('.filter-doter__line')[1])}, `-=.5`)
      .to(consumerElem[0].querySelectorAll('.filter-slider__wrap')[1],
        1.5,
        {width: getPercentInData(consumerElem[0].querySelectorAll('.filter-doter__line')[1])}, `-=2`);

      video.onloadeddata = function () {
        videoDuration = video.duration;
      };
      video.addEventListener('ended', () => endedVideo = true, false);

      timeline
        .to('.consumer__list', 0, {display: 'block'})

      consumerElemTimeline();

      timeline
        .to('.menu__mover .menu__icon', 1, {top: '0'})
        .to('.settings', 0, {display: 'block'})
      /*анимация настройки кофемашины*/
        .fromTo('.settings .machine__preview', 1,
          {x: 200, opacity: 0},
          {x: 0, opacity: 1, ease: Power1.easeInOut})
        .fromTo('.settings .settings__title p', 1,
          {y: 200, opacity: 0},
          {y: 0, opacity: 1, ease: Power1.easeInOut}, `-=${.8}`)
        .fromTo('.settings .settings__text p', 1,
          {y: 200, opacity: 0},
          {y: 0, opacity: 1, ease: Power1.easeInOut}, `-=${1}`)
        .fromTo('.settings .settings__device img', 3,
          {y: 500, opacity: 0},
          {y: 0, opacity: 1, ease: Power1.easeInOut})
        .to('.consumer__list', 0, {display: 'none'})
        .to('.settings .settings__device .pulse--in', 2, {css: {className: '+=active'}})
        .to('.settings .settings__device .pulse--out', 2, {css: {className: '+=active'}}, `+=${2}`)
        .to('.settings .machine .pulse--preview', 2, {css: {className: '+=active'}})
        .to('.machine-img-first', 1, {opacity: 0}, `+=${1.5}`)
        .call(() => video.pause())
        .call(() => video.play())
        .to('.settings .machine .pulse--preview', 2, {css: {className: '-=active'}})
        .call(() => video.play())
        .call(() => video.pause())
        .to('.settings .settings__content',
          1,
          {y: -1000, opacity: 0})
        .to('.settings .settings__device img',
          1,
          {y: -1000, opacity: 0}, `-=${.8}`)
        .to('.settings .machine-img', .2, {opacity: 0})
        .to('.settings .video-preview', .2, {opacity: 0}, `-=${.2}`);
      machineImageAnimations();

      let isFirstSlideReversed = false;
      let isSecondSlideReversed = false;
      let isThirdSlideReversed = false;

      timeline.to('.settings .machine__preview',
        5,
        {x: -450}, `-=${4}`)
        .to('.settings .machine__preview',
          0,
          {opacity: 0}, `-=${.1}`)
      /*анимация слайдера кофемашины*/
        .to('.types-coffee', 0, {visibility: 'visible'})
        .to('.menu__mover .menu__icon', 1,
          {top: '50px'})
        .call(() => {
          mySwiper.slideTo(0);
          isFirstSlideReversed = false;
          isSecondSlideReversed = false;
          isThirdSlideReversed = false;
        })
        .fromTo('.types-coffee .types-coffee__img', .5,
          {opacity: 0},
          {opacity: 1, ease: Power1.easeInOut}, `-=${.15}`)
        .fromTo('.types-coffee .machine-slider', .5,
          {x: 300, opacity: 0},
          {x: 0, opacity: 1, ease: Power1.easeInOut}, `-=${.15}`)
        .fromTo('.types-coffee .types-coffee__title', .5,
          {y: 200, opacity: 0},
          {y: 0, opacity: 1, ease: Power1.easeInOut}, `-=${.5}`)
        .fromTo('.types-coffee .popup-qw', 2,
          {bottom: '-100%', opacity: 0},
          {bottom: '0', opacity: 1, ease: Power1.easeInOut}, `-=${.15}`)
        .call(() => isFirstSlideReversed = !isFirstSlideReversed)
        .call(() => {
          const currentLng = localStorage.getItem('language')
            ? localStorage.getItem('language')
            : (navigator.language || navigator.userLanguage);

          const sliderInfoTitle = document.querySelector('.slider-info__title');
          sliderInfoTitle.innerHTML = infoTexts[currentLng][0];
        })
        .to('.slider-info', 2, {opacity: 1, visibility: 'visible'}, `+=${.1}`)
        .to('.settings', 0, {display: 'none'})
        .to('.slider-info .slider-info__dote', 1, {opacity: 1}, `+=${.1}`)

      timeline
        .to('.types-coffee .popup-qw', 2, {bottom: '30%', ease: Power1.easeInOut}, '+=2')
        .call(() => {
          isSecondSlideReversed ? mySwiper.slidePrev() : mySwiper.slideNext();
          isSecondSlideReversed = !isSecondSlideReversed;
        })

      timeline
        .to('.types-coffee .popup-qw', 2, {bottom: '60%', ease: Power1.easeInOut}, '+=2')
        .call(() => {
          isThirdSlideReversed ? mySwiper.slidePrev() : mySwiper.slideNext();
          isThirdSlideReversed = !isThirdSlideReversed;
        })
        .to('.popup-qw', .2, {bottom: `100%`, opacity: 0, ease: Power1.easeInOut}, `+=${2}`)
        .to('.slider-info', 0, {visibility: 'visible'})
        .to('.slider-info .slider-info__text', .2, {opacity: 0})
        .to('.slider-info .slider-info__one-line', .2, {opacity: 0}, `-=${.2}`)
        .to('.slider-info .slider-info__dote', .2, {opacity: 0}, `-=${.2}`)

      /*переход на страницу заказа*/
      timeline
        .to('.machine-slider .machine-slider__wrap', .5,
          {left: '-50rem'}, `-=${1}`)
        .to('.header-main__content .btn', 0, { display: 'none' })
        .to('.machine-slider', 1,
          {opacity: 0}, `-=${1}`)
        .fromTo('.order', .5, {display: 'none'}, {display: 'block'})
        .to('.types-coffee .types-coffee__title', 1,
          {y: -200, opacity: 0}, `-=${1}`)
        .to('.types-coffee .types-coffee__title', 1,
          {y: -200, opacity: 0}, `-=${1}`)
        .to('.types-coffee .types-coffee__img', 2,
          {x: -200, opacity: 0}, `-=${1}`)
        .fromTo('.order .order__img', 1,
          {x: 125, opacity: 0},
          {x: 0, opacity: 2, ease: Power1.easeInOut}, `-=${1}`)
        .to(' .circle-white', 2,
          {width: '200vw', height: '200vw'}, `-=${2}`)
        .to('.header-main', 2, {css: {className: '+=white'}}, `-=${1}`)
        .fromTo('.order', 1,
          {opacity: 0, display: 'none'},
          {opacity: 1, display: 'block', ease: Power1.easeInOut}, `-=${3}`)
        .fromTo('.order .order__title p', 2,
          {y: -100, opacity: 0},
          {y: 0, opacity: 1, ease: Power1.easeInOut}, `-=${1}`)
        .fromTo('.order .order__text p', 2,
          {y: -100, opacity: 0},
          {y: 0, opacity: 1, ease: Power1.easeInOut}, `-=${2}`)
        .fromTo('.order .order__price .btn', 2,
          {scale: .1, opacity: 0},
          {scale: 1, opacity: 1, ease: Power1.easeInOut}, `-=${2}`)
        .fromTo('.order .order__box', 2,
          {x: 200, opacity: 0},
          {x: 0, opacity: 1, ease: Power1.easeInOut}, `-=${1}`)
        .to('.menu__mover .menu__icon', 1,
          {top: '100px'})
    } 
  });
}
