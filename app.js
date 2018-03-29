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

const calculatePercentage = (i, destination, originalGap) => {
  let currentGap = Math.abs(i - destination);
  let remainder = originalGap - currentGap;
  let percentage = remainder / originalGap;
  return percentage;
};

const calculateCoefficient = (i, destination, originalGap) => {
  return Math.round(90 * calculatePercentage(i, destination, originalGap));
};

const swipe = (start, destination) => {
  let i = start;
  let originalGap = Math.abs(start - destination);
  if (originalGap <= 10) {
    return;
  } 
  let scrollDown = start <= destination; // True: Scroll Down, False: Scroll Up
  let int = setInterval(() => {
    if (scrollDown) {
      window.scrollTo(0, i);
      i += (100 - calculateCoefficient(i, destination, originalGap)); // Incrementation based on visual testing
      if (i >= destination) {
        clearInterval(int);
      }
    } else {
      window.scrollTo(0, i);
      i -= (100 - calculateCoefficient(i, destination, originalGap)); // Incrementation based on visual testing
      if (i <= destination) {
        clearInterval(int);
      }
    }
  }, 0.5);
}

/*

  when the view is mobile, we want to create a select component

  in order to use a select component, we will have to create a onchange function that will take in the value of the range end



*/

const buildNavTargets = (canvasHeight, contentBody, controlsBody) => {

  // Remove all existing buttons from the app

  while (controlsBody.firstChild) {
    controlsBody.removeChild(controlsBody.firstChild);
  }

  // check if the user's viewport is mobile

  let mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // get the height of the content and the number of sections

  let contentHeight = contentBody.offsetHeight;
  let numContentSections = contentBody.children[0].children.length;

  // start the range where the yOffset is directly on the transition between the canvas and the first block of content

  let rangeStart = canvasHeight;

  function buildButtons() {

    for (let i = 0; i < numContentSections; i++) {

      let button = document.createElement('button');
      let buttonId = `button${i}`;

      let sectionHeight = contentBody.children[0].children[i].offsetHeight;
      let end = rangeStart;

      button.classList.add('control-button');
      button.classList.add('no-select');
      button.classList.add('control-button');
      button.setAttribute('id', buttonId);

      button.innerHTML = buttonId;

      button.onclick = () => {
        let start = window.pageYOffset;;
        swipe(start, end);
      }

      rangeStart += sectionHeight + 1;

      controlsBody.append(button);

    }
  }

  function buildSelect() {

    let menu = document.createElement('div');
    menu.classList.add('menu-container');
    menu.classList.add('no-select');
    let bar1 = document.createElement('div');
    bar1.classList.add('bar1');
    bar1.classList.add('no-select');
    let bar2 = document.createElement('div');
    bar2.classList.add('bar2');
    bar2.classList.add('no-select');
    let bar3 = document.createElement('div');
    bar3.classList.add('bar3');
    bar3.classList.add('no-select');

    menu.append(bar1);
    menu.append(bar2);
    menu.append(bar3);

    let clickHandler = (element) => {
      element.classList.toggle('change');
    }

    menu.onclick = () => clickHandler(menu);

    controlsBody.append(menu);
 
  }


  if (mobile) {
    buildSelect();
  } else {
    buildButtons();
  }

};





const init = () => {

  particlesJS.load('particles-js', 'particles.json', function() {

    let documentHeight = getElementHeight('element', 'html');
    let canvasHeight = getElementHeight('id', 'particles-js');
    let controlsHeight = getElementHeight('id', 'controls');
    let logo = document.getElementById('logo-box');

    let controlsBody = document.getElementById('controls');
    let contentBody = document.getElementById('particles-js-white');

    buildNavTargets(canvasHeight, contentBody, controlsBody);

    let scrollListener = () => {
      if (window.pageYOffset + controlsHeight / 2  >= canvasHeight) {
        let controlsChildren = Array.prototype.slice.call(controls.children);
        controlsChildren.forEach(child => {
          if (child.nodeName === 'BUTTON') {
            child.classList.remove('bg-color-white-op10');
            child.classList.add('bg-color-black-op30');
          }
        });
        logo.classList.remove('font-color-white-op30');
        logo.classList.add('font-color-black-op30');
      } else {
        let controlsChildren = Array.prototype.slice.call(controls.children);
        controlsChildren.forEach(child => {
          if (child.nodeName === 'BUTTON') {
            child.classList.remove('bg-color-black-op30');
            child.classList.add('bg-color-white-op10');
          }
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

  });

  
}

init();