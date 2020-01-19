import 'jquery-ui/ui/widgets/datepicker'

(() => {
  $('.datepicker__datepicker-wrapper').datepicker({
    classes: {
      'ui-datepicker-current': 'datepicker__today-button',
    },

    showButtonPanel: true,
    showOtherMonths: true,
    selectOtherMonths: true
  });

  document.querySelector('.datepicker__header').innerHTML += String(new Date().getDate());
})();

