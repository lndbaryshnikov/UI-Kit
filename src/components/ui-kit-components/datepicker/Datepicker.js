import 'jquery-ui/ui/widgets/datepicker';

class Datepicker {
  constructor($element) {
    this.$datepickerContainer = $element;

    autoBind(this);

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
      onSelect: this._displayCurrentDay,
    });

    this.$todayButton.on('click', this._handleTodayButtonClick);

    this._displayCurrentDay();
  }

  _defineElements() {
    const container = this.$datepickerContainer;

    this.$datepicker = container.find('.js-datepicker__datepicker-wrapper');
    this.$currentDay = container.find('.js-datepicker__current-day');
    this.$todayButton = container.find('.js-datepicker__today-button');
  }

  _handleTodayButtonClick() {
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
