let position = 1; //0: left, 1: centre, 2: right
let wantsToMoveTo = null;
isAnimating = false; //helps lock it out while animating
const el = document.getElementById('tri-state-slider-handle');
const sliderContainer = document.getElementById('tri-state-slider');

el.addEventListener('animationend', () => {
  isAnimating = false;
});

sliderContainer.addEventListener('click', (event) => {
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
  removeAllKeyframeClasses(el);

  if (position === 0 && wantsToMoveTo === 1) {
    el.classList.add('left-to-centre');
    position = 1;
  } else if (position === 1 && wantsToMoveTo === 2) {
    el.classList.add('centre-to-right');
    position = 2;
  } else if (position === 0 && wantsToMoveTo === 2) {
    el.classList.add('left-to-right');
    position = 2;
  } else if (position === 2 && wantsToMoveTo === 1) {
    el.classList.add('right-to-centre');
    position = 1;
  } else if (position === 2 && wantsToMoveTo === 0) {
    el.classList.add('right-to-left');
    position = 0;
  } else if (position === 1 && wantsToMoveTo === 0) {
    el.classList.add('centre-to-left');
    position = 0;
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
  function removeAllKeyframeClasses(el) {
    el.classList.remove('left-to-right');
    el.classList.remove('right-to-left');
    el.classList.remove('right-to-centre');
    el.classList.remove('left-to-centre');
    el.classList.remove('centre-to-right');
    el.classList.remove('centre-to-left');
  }
});
