const slider = $('.slider__list').bxSlider({
  pager: false,  
  controls: false,
});

$('.slider__btn--left').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$('.slider__btn--right').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});