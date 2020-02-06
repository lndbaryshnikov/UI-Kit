import Datepicker from './Datepicker';

(() => {
  const $elements = $('.js-datepicker');

  $elements.each((index, item) => {
    new Datepicker($(item));
  });
})();
