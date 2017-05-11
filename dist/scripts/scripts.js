$( document ).ready(function() {
    $('.menu-btn').click( function () {
       $(this).toggleClass('active');
       $('.side-menu').toggleClass('is-visible');
    });

    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay: '3000',
        autoHeight: true,
        slidesPerView: 1
        // Navigation arrows
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev'
    });

});