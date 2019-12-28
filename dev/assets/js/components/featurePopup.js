const featurePopup = document.querySelector('.popup-features');
const featurePopupBtn = document.querySelectorAll('.features-btn');

featurePopupBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    featurePopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

const closeBtn = document.querySelector('.popup-features__close');
closeBtn.addEventListener('click', e => {
  e.preventDefault();
  featurePopup.classList.remove('active');
  document.body.removeAttribute('style');
});
