import '../../../pips-float-plugin/jquery-ui-slider-pips';

class SliderPips {
  constructor($sliderDom) {
    this._$slider = $sliderDom;
  }

  init(options, mode) {
    this._options = options;
    this._mode = mode;

    this._$slider.slider('pips', {
      rest: 'label',
    });

    this._extendPluginClasses();
  }

  _extendPluginClasses() {
    this._pipsOriginalClasses = {
      pip: 'ui-slider-pip',
      selected: 'ui-slider-pip-selected',
      inrange: 'ui-slider-pip-inrange',
      label: 'ui-slider-label',
      line: 'ui-slider-line',
    };

    Object.entries(this._pipsOriginalClasses).forEach(([type, originalClass]) => {
      const name = type === 'label' || type === 'line' ? type : 'pip';

      this._$slider.find(`.${originalClass}`).addClass(`slider__labels-${name}`);
    });

    if (this._mode === 'with-labels') {
      this._toggleModifier('pip', 'type', 'for-labels');
      this._toggleModifier('pip', 'color', this._options.sliderColor);
    }

    if (this._mode === 'with-stages') {
      this._toggleModifier('label', 'type', 'for-stages');
      this._toggleModifier('pip', 'type', 'for-stages');

      const value = this._$slider.slider('option', 'value');

      this._appendCustomClasses(value);

      this._$slider.on('slidechange', this._getValueChangedHandlerForStages());
    }
  }

  _getValueChangedHandlerForStages() {
    const { sliderColor, rangeColor } = this._options;

    return (event, { value }) => {
      this._toggleModifier('pip', 'background-color', sliderColor, { mode: 'remove' });
      this._toggleModifier('pip', 'color', 'dark-gray', { mode: 'remove' });
      this._toggleModifier('pip', 'background-color', rangeColor, { mode: 'remove' });
      this._toggleModifier('pip', 'color', 'white', { mode: 'remove' });

      this._appendCustomClasses(value);
    };
  }

  _appendCustomClasses(value) {
    const { pip } = this._pipsOriginalClasses;
    const { sliderColor, rangeColor } = this._options;

    const $pips = this._$slider.find(`.${pip}`);

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

    const domElement = dom || this._$slider.find(`.${initialClass}`);

    domElement[`${mode}Class`](`${customClass}_${modifier}_${value}`);
  }
}

export default SliderPips;
