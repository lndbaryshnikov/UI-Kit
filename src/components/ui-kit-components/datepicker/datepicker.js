import 'jquery-ui/ui/widgets/datepicker'

(() => {
  $('.js-datepicker__datepicker-wrapper').datepicker({
    classes: {
      'ui-datepicker-current': 'datepicker__today-button',
    },
    firstDay: 1,
    dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    showButtonPanel: true,
    showOtherMonths: true,
    selectOtherMonths: true
  });

  document.querySelector('.js-datepicker__header').innerHTML += String(new Date().getDate());
})();

