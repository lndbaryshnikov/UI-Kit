import '../../../vendor/pips-float-plugin/jquery-ui-slider-pips';

class SliderPips {
  constructor({ $slider, options, mode }) {
    this.$slider = $slider;
    this.options = options;
    this.mode = mode;

    this._init();
  }

  _init() {
    this.$slider.slider('pips', {
      rest: 'label',
    });

    this._extendPluginClasses();
  }

  _extendPluginClasses() {
    this.pipsOriginalClasses = {
      pip: 'ui-slider-pip',
      selected: 'ui-slider-pip-selected',
      inrange: 'ui-slider-pip-inrange',
      label: 'ui-slider-label',
      line: 'ui-slider-line',
    };

    Object.entries(this.pipsOriginalClasses).forEach(([type, originalClass]) => {
      const name = type === 'label' || type === 'line' ? type : 'pip';

      this.$slider.find(`.${originalClass}`).addClass(`slider__labels-${name}`);
    });

    if (this.mode === 'with-labels') {
      this._toggleModifier({ modifier: 'type', value: 'for-labels' });
      this._toggleModifier({ modifier: 'color', value: this.options.sliderColor });
    }

    if (this.mode === 'with-stages') {
      this._toggleModifier({ labelsElement: 'label', modifier: 'type', value: 'for-stages' });
      this._toggleModifier({ modifier: 'type', value: 'for-stages' });

      const value = this.$slider.slider('option', 'value');

      this._appendCustomClasses(value);

      this.$slider.on('slidechange', this._makeValueChangedHandler());
    }
  }

  _makeValueChangedHandler() {
    const { sliderColor, rangeColor } = this.options;

    return (event, { value }) => {
      this._toggleModifier({ modifier: 'background-color', value: sliderColor, mode: 'remove' });
      this._toggleModifier({ modifier: 'color', value: 'dark-gray', mode: 'remove' });
      this._toggleModifier({ modifier: 'background-color', value: rangeColor, mode: 'remove' });
      this._toggleModifier({ modifier: 'color', value: 'white', mode: 'remove' });

      this._appendCustomClasses(value);
    };
  }

  _appendCustomClasses(value) {
    const { pip } = this.pipsOriginalClasses;
    const { sliderColor, rangeColor } = this.options;

    const $pips = this.$slider.find(`.${pip}`);

    const appendModifiers = ({ $dom, backgroundColor, color }) => {
      this._toggleModifier({ modifier: 'background-color', value: backgroundColor, $dom });
      this._toggleModifier({ modifier: 'color', value: color, $dom });
    };

    $pips.each((index, currentPip) => {
      const $currentPip = $(currentPip);

      if (index < value) {
        appendModifiers({ $dom: $currentPip, backgroundColor: rangeColor, color: 'white' });
      } else {
        appendModifiers({ $dom: $currentPip, backgroundColor: sliderColor, color: 'dark-gray' });
      }
    });
  }

  _toggleModifier({
    labelsElement = 'pip', modifier, value, $dom, originalClass, mode = 'add',
  } = {}) {
    if (mode !== 'add' && mode !== 'remove') {
      throw new Error('Mode should be \'add\' or \'remove\'');
    }

    const customClass = `slider__labels-${labelsElement}`;
    const initialClass = originalClass || customClass;

    const domElement = $dom || this.$slider.find(`.${initialClass}`);

    domElement[`${mode}Class`](`${customClass}_${modifier}_${value}`);
  }
}

export default SliderPips;
