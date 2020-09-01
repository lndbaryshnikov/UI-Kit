import ArrowButton from '../../ui-kit-components/arrow-button/ArrowButton';

class Stages {
  constructor(stages) {
    this.elements = { stages };

    this._init();
  }

  _init() {
    this._defineElements();
    this._defineOptions();
    this._setHandlers();
  }

  _defineElements() {
    const { stages } = this.elements;

    const stageTitle = stages.querySelector('.js-stages__stage');
    const [leftArrow, rightArrow] = stages.querySelectorAll('.js-arrow-button');
    const slider = stages.querySelector('.js-slider');

    this.elements = {
      ...this.elements,
      stageTitle,
      arrows: {
        leftArrow: new ArrowButton(leftArrow),
        rightArrow: new ArrowButton(rightArrow),
      },
      slider: { classInstance: $(slider).data('slider') },
    };
  }

  _defineOptions() {
    const { dataset } = this.elements.stages;

    const stages = JSON.parse(dataset.stages);
    const startFrom = Number(dataset.startFrom);

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
    const { leftArrow, rightArrow } = this.elements.arrows;

    leftArrow.onClick(this._makeArrowClickHandler('left'));
    rightArrow.onClick(this._makeArrowClickHandler('right'));

    this.elements.slider.classInstance.onChange(this._makeSliderChangeHandler());
  }

  _makeArrowClickHandler(side) {
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

      if (ui.value === (index + 1)) return;

      this._refreshStage(ui.value - 1);
    };
  }

  _refreshStage(index) {
    if (index === this.options.currentStage.index) return;

    this.options.currentStage.index = index;
    this.options.currentStage.name = this.options.stages[index];

    this._refreshStageTitle();
    this._refreshSliderValue();
    this._refreshArrowsState();
  }

  _refreshStageTitle() {
    this.elements.stageTitle.innerHTML = this.options.currentStage.name;
  }

  _refreshSliderValue() {
    this.elements.slider.classInstance.moveTo(this.options.currentStage.index + 1);
  }

  _refreshArrowsState() {
    const currentIndex = this.options.currentStage.index;
    const lastIndex = this.options.stages.length - 1;
    const { leftArrow, rightArrow } = this.elements.arrows;

    if (currentIndex === 0) {
      leftArrow.switch('off');
    } else {
      leftArrow.switch('on');
    }

    if (currentIndex === lastIndex) {
      rightArrow.switch('off');
    } else {
      rightArrow.switch('on');
    }
  }
}

export default Stages;
