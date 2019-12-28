import axios from 'axios';

export default (orderBtn) => {
  const popup = document.querySelector('.popup-order');
  const close = document.querySelector('.popup-order__close');
  const form = document.querySelector('.form-order');

  for (let i = 0; i < orderBtn.length; i++) {
    orderBtn[i].addEventListener('click', (even) => {
      even.preventDefault();
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
      popup.classList.remove('sending');
    })
  }

  form.addEventListener('submit', (even) => {
    even.preventDefault();
    popup.classList.add('sending');

    setTimeout(() => {
      popup.classList.remove('active');
      popup.classList.remove('sending');
      document.body.removeAttribute('style');
    }, 4000);

    let dataSend = new FormData(form);

    axios({
      method: 'post',
      url: 'myurl',
      data: dataSend,
      config: {headers: {'Content-Type': 'multipart/form-data'}}
    }).then(function (response) {
      console.log(response);
    }).catch(function (response) {
      console.log(response);
    });
  });


  close.addEventListener('click', (even) => {
    even.preventDefault();
    popup.classList.remove('active');
    popup.classList.remove('sending');
    document.body.removeAttribute('style');
  });

  document.addEventListener('keyup', (e) => {
    if (e.keyCode === 27 && popup.classList.contains('active')) {
      popup.classList.remove('active');
      popup.classList.remove('sending');
      document.body.removeAttribute('style');
    }
  });
}
