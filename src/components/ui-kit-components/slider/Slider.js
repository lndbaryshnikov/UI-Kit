import 'jquery-ui/ui/widgets/slider';

import SliderPips from './SliderPips';

class Slider {
  constructor($slider) {
    this.$slider = $slider;

    this._defineOptions();
    this._init();
  }

  getOptions() {
    return this.options;
  }

  moveTo(value) {
    this.$slider.slider('option', 'value', value);
  }

  onChange(handler) {
    this.$slider.on('slidechange', handler);
  }

  _defineOptions() {
    this.options = { ...this.$slider.data(), animate: 'slow' };

    const { $slider } = this;

    const isSimpleOrWithStages = $slider.hasClass('js-slider_with_stages')
      ? 'with-stages'
      : 'simple';

    const isSimpleOrWithStagesOrWithLabels = $slider.hasClass('js-slider_with_labels')
      ? 'with-labels'
      : isSimpleOrWithStages;

    this.mode = $slider.hasClass('js-slider_with_tooltip')
      ? 'with-tooltip'
      : isSimpleOrWithStagesOrWithLabels;
  }

  _init() {
    const {
      min, max, step, value, animate, sliderColor, rangeColor, handleColor,
    } = this.options;

    this.$slider.slider({
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

    if (this.mode !== 'simple') this._addModifier();
  }

  _addModifier() {
    const { mode } = this;

    if (mode === 'with-tooltip') {
      this._addTooltip();
    } else if (mode === 'with-labels') {
      this._addLabels();
    } else if (mode === 'with-stages') {
      this._addStages();
    }
  }

  _addTooltip() {
    const $sliderTooltip = $('<div class="slider__tooltip"></div>');
    const { handleColor, value } = this.options;

    $sliderTooltip
      .text(String(value))
      .addClass(`slider__tooltip_theme_${handleColor}`);

    this.$slider.slider('option', {
      range: false,
      slide(event, ui) {
        $sliderTooltip.text(ui.value);
      },
    });

    this.$slider.find('.ui-slider-handle').append($sliderTooltip);
  }

  _addLabels() {
    this.$slider.slider('option', {
      range: 'min',
    });

    this._setPips();
  }

  _addStages() {
    const { sliderColor, handleColor } = this.options;

    this.$slider.slider('option', {
      range: 'min',

      classes: {
        'ui-slider': `slider__scale slider__scale_type_for-stages slider__scale_color_${sliderColor}`,
        'ui-slider-handle': `slider__handle slider__handle_type_for-stages slider__handle_color_${handleColor}`,
      },
    });

    this._setPips();
  }

  _setPips() {
    const { $slider, options, mode } = this;

    new SliderPips({ $slider, options, mode });
  }
}

export default Slider;
