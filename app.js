const getElementHeight = (type, target) => {
  switch(type.toLowerCase()) {
    case 'id':
      let elementById = document.getElementById(target);
      return elementById.offsetHeight;
    case 'element':
      let elementByElement = document.querySelector(target);
      return elementByElement.offsetHeight;
  }
};

const init = () => {

  console.log('initializing...');

  particlesJS.load('particles-js', 'particles.json', function() {
    console.log('particles.json loaded');
  });

  let scrollListener = () => {
    let documentHeight = getElementHeight('element', 'html');
    let canvasHeight = getElementHeight('id', 'particles-js');
    let controlsHeight = getElementHeight('id', 'controls');
    let logo = document.getElementById('logo-box');
    if (window.pageYOffset + controlsHeight / 2  >= canvasHeight) {
      let controlsChildren = Array.prototype.slice.call(controls.children);
      controlsChildren.forEach(child => {
        child.classList.remove('bg-color-white-op10');
        child.classList.add('bg-color-black-op30');
      });
      logo.classList.remove('font-color-white-op30');
      logo.classList.add('font-color-black-op30');
    } else {
      let controlsChildren = Array.prototype.slice.call(controls.children);
      controlsChildren.forEach(child => {
        child.classList.remove('bg-color-black-op30');
        child.classList.add('bg-color-white-op10');
      });
      logo.classList.remove('font-color-black-op30');
      logo.classList.add('font-color-white-op30');
    }
  };

  let orientationListener = () => {
    window.removeEventListener('scroll', scrollListener);
    window.removeEventListener('orientationchange', orientationListener);
    init();
  };

  window.addEventListener('scroll', scrollListener);
  window.addEventListener('orientationchange', orientationListener);
}

init();