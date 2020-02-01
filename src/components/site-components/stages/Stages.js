class Stages {
  constructor(stages) {
    this._elements = { stages: stages };

    this._defineElements();
    this._defineOptions();

    this._init();
  }

  _init() {
    this._setHandlers();
  }

  _defineElements() {
    const getDaughter = (daughterClassName) => {
      return this._elements.stages.querySelector(`.${daughterClassName}`);
    };

    const arrows = getDaughter('arrow-buttons');
    const slider = getDaughter('js-slider');

    this._elements.arrows = {
        left: arrows.children[0],
        right: arrows.children[1]
    };
    this._elements.stageTitle = getDaughter('stages__stage');
    this._elements.slider = {
      classInstance: $(slider).data('slider')
    }
  }

  _defineOptions() {
    const getData = (data) => {
      return $(this._elements.stages).data(data);
    };

    const stages = getData('stages');
    const startFrom = Number(getData('start-from'));

    this._options = {
      stages: stages,
      startFrom: startFrom,
      arrowsClasses: {
        classesActive: 'arrow-buttons__arrow-container ripple',
        classesDisabled: 'arrow-buttons__arrow-container arrow-buttons_disabled'
      },
      currentStage: {
        index: startFrom - 1,
        name: stages[startFrom - 1]
      }
    }
  }

  _setHandlers() {
    const setArrowHandlers = (side) => {
      this._elements.arrows[side]
        .addEventListener('click', this._getArrowClickHandler(side));
    };

    setArrowHandlers('left');
    setArrowHandlers('right');

    this._elements.slider.classInstance.onChange(this._getSliderChangeHandler());
  }

  _getArrowClickHandler(side) {
    if (side !== 'left' && side !== 'right') {
      throw new Error('Only "right" and "left" side is allowed');
    }

    const { stages } = this._options;

    const limitIndex = side === 'left' ? 0 : stages.length - 1;

    return () => {
      let currentStageIndex = this._options.currentStage.index;

      if (currentStageIndex !== limitIndex) {
        currentStageIndex += side === 'left' ? -1 : +1;

        this._refreshStage(currentStageIndex);
      }
    };
  }

  _getSliderChangeHandler() {
    return (event, ui) => {
      let index = this._options.currentStage.index;

      if (ui.value === index + 1) return;

      this._refreshStage(ui.value - 1);
    }
  }

  _refreshStage(index) {
    if (index === this._options.currentStage.index) return;

    this._options.currentStage.index = index;
    this._options.currentStage.name = this._options.stages[index];

    this._refreshStageTitle();
    this._refreshSliderValue();
    this._refreshArrowsClasses();
  }

  _refreshStageTitle() {
    this._elements.stageTitle.innerHTML = this._options.currentStage.name;
  }

  _refreshSliderValue() {
    this._elements.slider.classInstance.moveTo(this._options.currentStage.index + 1);
  }

  _switchArrowsClasses(side, mode) {
    if ( mode !== 'on' && mode !== 'off' ) {
      throw new Error('Only "on" and "off" mode is allowed');
    }

    const { classesActive, classesDisabled } = this._options.arrowsClasses;
    const arrow = this._elements.arrows[side];

    arrow.className = mode === 'on' ? classesActive : classesDisabled;
  }

  _refreshArrowsClasses() {
    const currentIndex = this._options.currentStage.index;
    const lastIndex = this._options.stages.length - 1;

    if (currentIndex === 0) {
      this._switchArrowsClasses('left', 'off');
    } else {
      this._switchArrowsClasses('left', 'on');
    }

    if (currentIndex === lastIndex) {
      this._switchArrowsClasses('right', 'off');
    } else {
      this._switchArrowsClasses('right', 'on');
    }
  }
}

export default Stages;
