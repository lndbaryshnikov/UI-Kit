import ArrowButtons from '../../ui-kit-components/arrow-buttons/ArrowButtons';

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

    const arrows = new ArrowButtons(getDaughter('js-arrow-buttons'));
    const slider = getDaughter('js-slider');

    this.elements.arrows = arrows;
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
      currentStage: {
        index: startFrom - 1,
        name: stages[startFrom - 1],
      },
    };
  }

  _setHandlers() {
    const setArrowHandlers = (side) => {
      this.elements.arrows
        .setListener(side, 'click', this._makeArrowClickHandler(side));
    };

    setArrowHandlers('left');
    setArrowHandlers('right');

    this.elements.slider.classInstance.onChange(this._makeSliderChangeHandler());
  }

  _makeArrowClickHandler(side) {
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

  _makeSliderChangeHandler() {
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

  _refreshArrowsClasses() {
    const currentIndex = this.options.currentStage.index;
    const lastIndex = this.options.stages.length - 1;

    if (currentIndex === 0) {
      this.elements.arrows.switchArrows('left', 'off');
    } else {
      this.elements.arrows.switchArrows('left', 'on');
    }

    if (currentIndex === lastIndex) {
      this.elements.arrows.switchArrows('right', 'off');
    } else {
      this.elements.arrows.switchArrows('right', 'on');
    }
  }
}

export default Stages;
