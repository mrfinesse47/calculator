//focus slider on label click
document
  .getElementById('tri-state-mode-display')
  .addEventListener('click', () => {
    document.getElementById('tri-state-slider').focus();
  });

let position = 0; //0: left, 1: centre, 2: right
let wantsToMoveTo = null;
let isAnimating = false; //helps lock it out while animating
const sliderHandle = document.getElementById('tri-state-slider-handle');
const sliderContainer = document.getElementById('tri-state-slider');

triStateSliderInit(position);

sliderHandle.addEventListener('animationend', () => {
  isAnimating = false;
});

sliderContainer.addEventListener('click', (event) => {
  triStateSliderMove(event);
});

function triStateSliderInit(position) {
  if (position === 0) {
    sliderHandle.classList.add('left');
  }
  //1:(centre) is the default in terms of css
  if (position === 2) {
    sliderHandle.classList.add('right');
  }
}

function triStateSliderMove(event) {
  if (isAnimating) return; //weird effects if you trigger 2 animations or more
  let target = event.target;
  if (event.target.id === 'tri-state-slider-handle') {
    target = event.target.parentNode;
  } //makes sure the event is considered on the sliderContainer

  if (!event.pointerType) {
    wantsToMoveTo = (position + 1) % 3; //for mostly keyboard
  } else {
    wantsToMoveTo = determineDestBasedOnMouseOrTouchPosition(target);
  }

  isAnimating = true;
  //remove all keyframe classes
  removeAllKeyframeClasses(sliderHandle);

  if (position === 0 && wantsToMoveTo === 1) {
    sliderHandle.classList.add('left-to-centre');
    position = 1;
  } else if (position === 1 && wantsToMoveTo === 2) {
    sliderHandle.classList.add('centre-to-right');
    position = 2;
  } else if (position === 0 && wantsToMoveTo === 2) {
    sliderHandle.classList.add('left-to-right');
    position = 2;
  } else if (position === 2 && wantsToMoveTo === 1) {
    sliderHandle.classList.add('right-to-centre');
    position = 1;
  } else if (position === 2 && wantsToMoveTo === 0) {
    sliderHandle.classList.add('right-to-left');
    position = 0;
  } else if (position === 1 && wantsToMoveTo === 0) {
    sliderHandle.classList.add('centre-to-left');
    position = 0;
  }

  // default style dark mode -- see theme.css

  // darkAccent

  if (position === 0) {
    rootElement.classList.remove('lightMode');
    rootElement.classList.remove('darkAccent');
  } else if (position === 1) {
    rootElement.classList.add('lightMode');
    rootElement.classList.remove('darkAccent');
  } else {
    rootElement.classList.remove('lightMode');
    rootElement.classList.add('darkAccent');
  }

  console.log('position is: ', position); //here you can either make use of the position variable

  //----------helpers-----------------------------------------//

  function determineDestBasedOnMouseOrTouchPosition(slideEl) {
    const bcr = slideEl.getBoundingClientRect();

    const relXClickPercent =
      ((event.clientX - bcr.left) / (bcr.right - bcr.left)) * 100;

    let destination = Math.floor(relXClickPercent / 33.33333333);

    if (destination === position) {
      if (position === 0) {
        destination = 1;
      } else if (position === 1) {
        destination = 2;
      } else {
        destination = 0;
      }
    }
    return destination;
  }
  function removeAllKeyframeClasses(sliderHandle) {
    sliderHandle.classList.remove('left-to-right');
    sliderHandle.classList.remove('right-to-left');
    sliderHandle.classList.remove('right-to-centre');
    sliderHandle.classList.remove('left-to-centre');
    sliderHandle.classList.remove('centre-to-right');
    sliderHandle.classList.remove('centre-to-left');
  }
}
