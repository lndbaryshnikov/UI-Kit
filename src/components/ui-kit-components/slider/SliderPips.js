import '../../../vendor/pips-float-plugin/jquery-ui-slider-pips';

class SliderPips {
  constructor($sliderDom) {
    this.$slider = $sliderDom;
  }

  init(options, mode) {
    this.options = options;
    this.mode = mode;

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
      this._toggleModifier('pip', 'type', 'for-labels');
      this._toggleModifier('pip', 'color', this.options.sliderColor);
    }

    if (this.mode === 'with-stages') {
      this._toggleModifier('label', 'type', 'for-stages');
      this._toggleModifier('pip', 'type', 'for-stages');

      const value = this.$slider.slider('option', 'value');

      this._appendCustomClasses(value);

      this.$slider.on('slidechange', this._makeValueChangedHandlerForStages());
    }
  }

  _makeValueChangedHandlerForStages() {
    const { sliderColor, rangeColor } = this.options;

    return (event, { value }) => {
      this._toggleModifier('pip', 'background-color', sliderColor, { mode: 'remove' });
      this._toggleModifier('pip', 'color', 'dark-gray', { mode: 'remove' });
      this._toggleModifier('pip', 'background-color', rangeColor, { mode: 'remove' });
      this._toggleModifier('pip', 'color', 'white', { mode: 'remove' });

      this._appendCustomClasses(value);
    };
  }

  _appendCustomClasses(value) {
    const { pip } = this.pipsOriginalClasses;
    const { sliderColor, rangeColor } = this.options;

    const $pips = this.$slider.find(`.${pip}`);

    const appendModifiers = (dom, backgroundColor, color) => {
      const properties = ['background-color', 'color'];
      const values = [backgroundColor, color];

      properties.forEach((currentProperty, index) => {
        this._toggleModifier('pip', currentProperty, values[index], { dom });
      });
    };

    $pips.each((index, currentPip) => {
      const $currentPip = $(currentPip);

      if (index < value) {
        appendModifiers($currentPip, rangeColor, 'white');
      } else {
        appendModifiers($currentPip, sliderColor, 'dark-gray');
      }
    });
  }

  _toggleModifier(labelsElement, modifier, value, { dom, originalClass, mode = 'add' } = {}) {
    if (mode !== 'add' && mode !== 'remove') {
      throw new Error('Mode should be \'add\', \'remove\'');
    }

    const customClass = `slider__labels-${labelsElement}`;
    const initialClass = originalClass || customClass;

    const domElement = dom || this.$slider.find(`.${initialClass}`);

    domElement[`${mode}Class`](`${customClass}_${modifier}_${value}`);
  }
}

export default SliderPips;
