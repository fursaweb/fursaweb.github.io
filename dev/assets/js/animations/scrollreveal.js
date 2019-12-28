/*Scroll Reveal*/
import ScrollReveal from 'scrollreveal';

export default () => {

    /*show visible*/
    ScrollReveal().reveal('.show-visible', {
        distance: '-15px',
        interval: 190,
        opacity: 0,
        duration: 800,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });


    /*show x*/
    ScrollReveal().reveal('.show-left', {
        distance: '-50px',
        origin: 'right',
        interval: 250,
        duration: 1000,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    ScrollReveal().reveal('.show-right', {
        distance: '50px',
        origin: 'right',
        interval: 250,
        duration: 1000,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });


    /*show y*/
    ScrollReveal().reveal('.show-bottom', {
        distance: '50px',
        interval: 250,
        duration: 1000,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
    ScrollReveal().reveal('.show-top', {
        distance: '-50px',
        interval: 250,
        duration: 1000,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });


}

