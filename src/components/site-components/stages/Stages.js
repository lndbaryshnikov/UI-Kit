class Stages {
  constructor(stages) {
    this.elements = { stages };

    this._defineElements();
    this._defineOptions();

    this._init();
  }

  _init() {
    this._setHandlers();
  }

  _defineElements() {
    const getDaughter = (daughterClassName) => this.elements.stages.querySelector(`.${daughterClassName}`);

    const arrows = getDaughter('arrow-buttons');
    const slider = getDaughter('js-slider');

    this.elements.arrows = {
      left: arrows.children[0],
      right: arrows.children[1],
    };
    this.elements.stageTitle = getDaughter('stages__stage');
    this.elements.slider = {
      classInstance: $(slider).data('slider'),
    };
  }

  _defineOptions() {
    const getData = (data) => $(this.elements.stages).data(data);

    const stages = getData('stages');
    const startFrom = Number(getData('start-from'));

    this.options = {
      stages,
      startFrom,
      arrowsClasses: {
        classesActive: 'arrow-buttons__arrow-container ripple',
        classesDisabled: 'arrow-buttons__arrow-container arrow-buttons__arrow-container_disabled',
      },
      currentStage: {
        index: startFrom - 1,
        name: stages[startFrom - 1],
      },
    };
  }

  _setHandlers() {
    const setArrowHandlers = (side) => {
      this.elements.arrows[side]
        .addEventListener('click', this._getArrowClickHandler(side));
    };

    setArrowHandlers('left');
    setArrowHandlers('right');

    this.elements.slider.classInstance.onChange(this._getSliderChangeHandler());
  }

  _getArrowClickHandler(side) {
    if (side !== 'left' && side !== 'right') {
      throw new Error('Only "right" and "left" side is allowed');
    }

    const { stages } = this.options;

    const limitIndex = side === 'left' ? 0 : stages.length - 1;

    return () => {
      let currentStageIndex = this.options.currentStage.index;

      if (currentStageIndex !== limitIndex) {
        currentStageIndex += side === 'left' ? -1 : +1;

        this._refreshStage(currentStageIndex);
      }
    };
  }

  _getSliderChangeHandler() {
    return (event, ui) => {
      const { index } = this.options.currentStage;

      if (ui.value === index + 1) return;

      this._refreshStage(ui.value - 1);
    };
  }

  _refreshStage(index) {
    if (index === this.options.currentStage.index) return;

    this.options.currentStage.index = index;
    this.options.currentStage.name = this.options.stages[index];

    this._refreshStageTitle();
    this._refreshSliderValue();
    this._refreshArrowsClasses();
  }

  _refreshStageTitle() {
    this.elements.stageTitle.innerHTML = this.options.currentStage.name;
  }

  _refreshSliderValue() {
    this.elements.slider.classInstance.moveTo(this.options.currentStage.index + 1);
  }

  _switchArrowsClasses(side, mode) {
    if (mode !== 'on' && mode !== 'off') {
      throw new Error('Only "on" and "off" mode is allowed');
    }

    const { classesActive, classesDisabled } = this.options.arrowsClasses;
    const arrow = this.elements.arrows[side];

    arrow.className = mode === 'on' ? classesActive : classesDisabled;
  }

  _refreshArrowsClasses() {
    const currentIndex = this.options.currentStage.index;
    const lastIndex = this.options.stages.length - 1;

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
