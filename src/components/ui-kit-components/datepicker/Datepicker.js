import 'jquery-ui/ui/widgets/datepicker';

class Datepicker {
  constructor($element) {
    this.$datepickerContainer = $element;

    this._defineElements();
    this._init();
  }

  _init() {
    this.$datepicker.datepicker({
      firstDay: 1,
      dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      showButtonPanel: true,
      showOtherMonths: true,
      selectOtherMonths: true,
      onSelect: this._displayCurrentDay.bind(this),
    });

    this.$todayButton.on('click', this._todayButtonClickHandler.bind(this));

    this._displayCurrentDay();
  }

  _defineElements() {
    const container = this.$datepickerContainer;

    this.$datepicker = container.find('.js-datepicker__datepicker-wrapper');
    this.$currentDay = container.find('.js-datepicker__current-day');
    this.$todayButton = container.find('.js-datepicker__today-button');
  }

  _todayButtonClickHandler() {
    const todayDate = new Date();

    this.$datepicker.datepicker('setDate', todayDate);
    this._displayCurrentDay();
  }

  _displayCurrentDay() {
    const currentDay = this.$datepicker.datepicker('getDate').getDate();

    this.$currentDay.text(currentDay);
  }
}

export default Datepicker;
