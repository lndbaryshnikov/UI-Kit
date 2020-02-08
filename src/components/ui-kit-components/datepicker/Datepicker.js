import 'jquery-ui/ui/widgets/datepicker';

class Datepicker {
  constructor($element) {
    this._$datepickerContainer = $element;

    this._defineElements();
    this.init();
  }

  init() {
    this._$datepicker.datepicker({
      firstDay: 1,
      dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      showButtonPanel: true,
      showOtherMonths: true,
      selectOtherMonths: true,
      onSelect: this._displayCurrentDay.bind(this),
    });

    this._$todayButton.on('click', this._todayButtonClickHandler.bind(this));

    this._displayCurrentDay();
  }

  _defineElements() {
    const container = this._$datepickerContainer;

    this._$datepicker = container.find('.js-datepicker__datepicker-wrapper');
    this._$currentDay = container.find('.js-datepicker__current-day');
    this._$todayButton = container.find('.js-datepicker__today-button');

    console.log(container, this._$todayButton);
  }

  _todayButtonClickHandler() {
    const todayDate = new Date();
    console.log('im here');

    this._$datepicker.datepicker('setDate', todayDate);
    this._displayCurrentDay();
  }

  _displayCurrentDay() {
    const currentDay = this._$datepicker.datepicker('getDate').getDate();

    this._$currentDay.text(currentDay);
  }
}

export default Datepicker;
