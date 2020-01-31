import 'jquery-ui/ui/widgets/datepicker'

class Datepicker {
  constructor($element) {
    this._$datepickerContainer = $element;

    this.init()
  }

  init() {
    this._$datepicker = this._$datepickerContainer.find('.js-datepicker__datepicker-wrapper');
    this._$datepickerHeader = this._$datepickerContainer.find('.js-datepicker__header');

    this._$datepicker.datepicker({
      classes: {
        'ui-datepicker-current': 'datepicker__today-button',
      },
      firstDay: 1,
      dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      showButtonPanel: true,
      showOtherMonths: true,
      selectOtherMonths: true
    });

    this._$datepickerHeader.append(String(new Date().getDate()));
  }
}

export default Datepicker;
