window.jQuery = window.$ = require('jquery');
require('velocity-animate');
const _ = require('lodash');
let zIndex = 1;

// Initialization
const slider = $('.slider');
const [previousButton, nextButton] = $('.slider__button');
const slides = $('.slider__slide');
let activeIndex = 0;

init();

window.setTimeout(next, 1500);

function init() {
  $(previousButton).on('click', _.throttle(previous, 400));
  $(nextButton).on('click', _.throttle(next, 400));

  slides.velocity({ opacity: 0 }, { duration: 0, easing: 'none' })
  .velocity({ opacity: 1 }, { duration: 1, easing: 'none', delay: 100 });
  $(slides[activeIndex])
    .velocity(
      { 'z-index': 1000, translateX: '-100%' },
      { duration: 0, easing: 'none' }
    )
}

function next() {
  const newActiveIndex = activeIndex === (slides.length - 1) ? 0 : activeIndex + 1;
  const newPreviousSlide = slides[activeIndex];
  $(newPreviousSlide)
  $(newPreviousSlide)
    .velocity(
      { translateX: '-200%' },
      { duration: 800 }
    )
    .velocity(
      { zIndex: ++zIndex },
      { duration: 0 }
    );
  $(slides[newActiveIndex])
    .velocity(
      { translateX: '-100%' },
      { duration: 500, complete: function() {
        resetSlide(newPreviousSlide);
      }}
    );
  activeIndex = newActiveIndex
}

function previous() {
}

function resetSlide(el) {
  $(el).velocity('finish')
    .velocity({ translateX: 0 }, { duration: 0, easing: 'none' });
}
