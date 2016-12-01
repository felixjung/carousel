window.jQuery = window.$ = require('jquery');
require('velocity-animate');
const _ = require('lodash');
let zIndex = 1;

// Initialization
const slider = $('.slider');
const [previousButton, nextButton] = $('.slider__button');
const slides = $('.slider__slide');
const MIN_DURATION = 350;
const MAX_DURATION = 800;
const easing = 'easeInQuad';
let activeIndex = 0;
let lastTime = 0;


init();

function init() {
  $(previousButton).on('click', _.throttle(previous, MIN_DURATION));
  $(nextButton).on('click', _.throttle(next, MIN_DURATION));

  $(slides[activeIndex])
    .velocity(
      { translateX: '-100%' },
      { duration: 0, easing: 'unset' }
    )
}

function next() {
  const duration = getDuration();
  const newActiveIndex = activeIndex === (slides.length - 1) ? 0 : activeIndex + 1;
  const newPreviousSlide = slides[activeIndex];
  $(newPreviousSlide)
    .velocity(
      { opacity: 1 },
      { duration: 0, easing: 'unset' }
    )
    .velocity(
      { translateZ: 0, translateX: '-200%' },
      { duration: duration * 2, easing }
    );
  $(slides[newActiveIndex])
    .velocity('finish')
    .velocity(
      { translateZ: 0, translateX: 0, zIndex: ++zIndex },
      { duration: 0 }
    )
    .velocity(
      { translateZ: 0, translateX: '-100%' },
      { duration, easing }
    );
  activeIndex = newActiveIndex
}

function previous() {
}

function getDuration() {
  const now = (new Date()).getTime();
  if (lastTime === 0) {
    lastTime = now;
    return MAX_DURATION;
  }

  const diff = now - lastTime;
  lastTime = now;

  const duration = Math.max(Math.min(diff, MAX_DURATION), MIN_DURATION);
  console.log(`Duration: ${duration}ms`);
  return duration;
}
