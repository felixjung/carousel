const $ = require('jquery');
const TweenLite = require('gsap').TweenLite;
const TimelineMax = require('gsap').TimelineMax;
const Quad = require('gsap').Quad;
const _ = require('lodash');

// Initialization
const slider = $('.slider');
const [previousButton, nextButton] = $('.slider__button');
const slides = $('.slider__slide');
const MIN_DURATION = 0.2;
const MAX_DURATION = 0.7;
const SCALE = 1.0;
let currentElement = slides[0];
let latestTimeStamp = 0;
let globalTimeline;
let zIndex = 1;

init();

function init() {
  $(previousButton).on('click', clickHandler);
  $(nextButton).on('click', clickHandler);
  TweenLite.defaultEase = Quad.easeIn;
  globalTimeline = setStage(slides);
}

function setStage() {
  const timeline = new TimelineMax();
  return timeline.set(currentElement, { x: '-100%', xIndex: 3 });
}

function next(duration = MAX_DURATION) {
  const nextElement = getNextElement(currentElement);
  const timeline = new TimelineMax();
  timeline
    .add(createEnter(nextElement), 0)
    .add(createLeave(currentElement), 0)
    .duration(duration);
  currentElement = nextElement;
  return timeline;
}

function previous() {

}

function createEnter(el) {
  const timeline = new TimelineMax();
  return timeline.to(el, 1, { x: '-100%' });
}

function createLeave(el) {
  const timeline = new TimelineMax();
  return timeline
    .to(el, 1, { x: '-150%' })
    .to(el, 0, { x: '0%', zIndex: ++zIndex });
}

function clickHandler(e) {
  const duration = calculateDuration(latestTimeStamp, e.timeStamp);
  latestTimeStamp = e.timeStamp;
  const recentAnimation = globalTimeline.recent();
  const scaleFactor = calculateScaleFactor(recentAnimation.duration(), duration);
  globalTimeline.timeScale(scaleFactor);

  globalTimeline.add(next());
}

function calculateScaleFactor(currentDuration, targetDuration) {
  if (currentDuration === 0) { return targetDuration; }
  return currentDuration / targetDuration;
}

function calculateDuration(lastTimeStamp, currentTimeStamp) {
  const diff = _.round(currentTimeStamp - lastTimeStamp) / 1000;
  return Math.min(MAX_DURATION, Math.max(MIN_DURATION, diff));
}

function getNextElement(el) {
  const next = $(el).next();
  return _.isEmpty(next) ? $(slides).first() : next;
}

function tween(el, config) {
  const animatedState = _.get(config, 'animated', {});
  const immediateState = _.get(config, 'immediate', {});

  TweenLite.set(el, immediateState);
  return TweenLite.to(el, 1, animatedState);
}
