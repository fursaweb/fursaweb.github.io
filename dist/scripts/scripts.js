$( document ).ready(function() {
    $('.menu-btn').click( function () {
       $(this).toggleClass('active');
       $('.side-menu').toggleClass('is-visible');
    });
});