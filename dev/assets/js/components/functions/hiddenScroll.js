const header = document.querySelector('.header-main');

export default (boll, elem) => {
  if (boll) {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.cssText = `overflow:hidden; padding-right:${scrollWidth}px`;
    header.style.width = `calc(100% - ${scrollWidth}px)`;
    if (elem) {
      elem.style.width = `calc(100% - ${scrollWidth}px)`;
    }
  } else {
    document.body.removeAttribute('style');
    header.style.width = `100%`;
    if (elem) {
      elem.removeAttribute('style');
    }
  }
};
