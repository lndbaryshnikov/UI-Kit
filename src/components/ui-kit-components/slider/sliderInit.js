import Slider from './Slider';

(() => {
  const $slider = $('.js-slider');

  $slider.each((index, item) => {
    const slider = new Slider($(item));

    $slider.data('slider', slider);
  });
})();
