import Datepicker from './datepicker';

(() => {
  const $elements = $('.js-datepicker');

  $elements.each((index, item) => {
    new Datepicker($(item));
  });
})();

