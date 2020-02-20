import 'jquery-ui/ui/widgets/slider';
import SliderPips from './SliderPips';

class Slider {
  constructor($slider) {
    this._$slider = $slider;

    this._defineOptions();
    this._init();
  }

  getOptions() {
    return this._options;
  }

  moveTo(value) {
    this._$slider.slider('option', 'value', value);
  }

  onChange(handler) {
    this._$slider.on('slidechange', handler);
  }

  _defineOptions() {
    this._options = {
      min: this._$slider.data('min'),
      max: this._$slider.data('max'),
      step: this._$slider.data('step'),
      value: this._$slider.data('value'),
      animate: 'slow',
      sliderColor: this._$slider.data('slider-color'),
      rangeColor: this._$slider.data('range-color'),
      handleColor: this._$slider.data('handle-color'),
    };

    const isSimpleOrWithStages = this._$slider.hasClass('js-slider_with_stages')
      ? 'with-stages' : 'simple';

    const isSimpleOrWithStagesOrWithLabels = this._$slider.hasClass('js-slider_with_labels')
      ? 'with-labels' : isSimpleOrWithStages;

    this._mode = this._$slider.hasClass('js-slider_with_tooltip')
      ? 'with-tooltip' : isSimpleOrWithStagesOrWithLabels;
  }

  _init() {
    const {
      min, max, step, value, animate, sliderColor, rangeColor, handleColor,
    } = this._options;

    this._$slider.slider({
      min,
      max,
      step,
      value,
      animate,

      classes: {
        'ui-slider': `slider__scale slider__scale_color_${sliderColor}`,
        'ui-slider-range': `slider__range slider__range_color_${rangeColor}`,
        'ui-slider-handle': `slider__handle slider__handle_color_${handleColor}`,
      },
    });

    if (this._mode !== 'simple') this._addModifier();
  }

  _addModifier() {
    if (this._mode === 'with-tooltip') {
      this._addTooltip();
    } else if (this._mode === 'with-labels') {
      this._addLabels();
    } else if (this._mode === 'with-stages') {
      this._addStages();
    }
  }

  _addTooltip() {
    const $sliderTooltip = $('<div class="slider__tooltip"></div>');

    $sliderTooltip.text(String(this._options.value));

    this._$slider.slider('option', {
      range: false,
      slide(event, ui) {
        $sliderTooltip.text(ui.value);
      },
    });

    this._$slider.find('.ui-slider-handle').append($sliderTooltip);

    this._setTooltipThemeModifier(this._options.handleColor);
  }

  _addLabels() {
    this._$slider.slider('option', {
      range: 'min',
    });

    this._setPips();
  }

  _addStages() {
    const { sliderColor, handleColor } = this._options;

    this._$slider.slider('option', {
      range: 'min',

      classes: {
        'ui-slider': `slider__scale slider__scale_type_for-stages slider__scale_color_${sliderColor}`,
        'ui-slider-handle': `slider__handle slider__handle_type_for-stages slider__handle_color_${handleColor}`,
      },
    });

    this._setPips();
  }

  _setPips() {
    const pips = new SliderPips(this._$slider);

    pips.init(this._options, this._mode);
  }

  _setTooltipThemeModifier(theme) {
    const tooltipClass = 'slider__tooltip';

    this._$slider.find(`.${tooltipClass}`).addClass(`${tooltipClass}_theme_${theme}`);
  }
}

export default Slider;
