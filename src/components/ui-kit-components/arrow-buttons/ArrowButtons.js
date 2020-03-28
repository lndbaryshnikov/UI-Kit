class ArrowButtons {
  constructor(arrowsContainer) {
    this.arrowsContainer = arrowsContainer;

    this._defineElements();
  }

  switchArrows(side, mode) {
    this._checkSide(side);
    if (mode !== 'on' && mode !== 'off') {
      throw new Error('Mode can only be \'on\' or \'off\'');
    }

    const disabledClass = 'arrow-buttons__arrow-container_disabled';
    const rippleClass = 'ripple';

    const toggle = (arrow) => {
      arrow.classList.toggle(disabledClass, mode !== 'on');
      arrow.classList.toggle(rippleClass, mode === 'on');
    };

    if (side === 'all') {
      Object.values(this.arrows).forEach((arrow) => {
        toggle(arrow);
      });
    } else toggle(this.arrows[side]);
  }

  setListener(side, event, listener) {
    this._checkSide(side);

    const addListener = (arrow) => {
      arrow.addEventListener(event, listener);
    };

    if (side === 'all') {
      Object.values(this.arrows).forEach((arrow) => {
        addListener(arrow);
      });
    } else addListener(this.arrows[side]);
  }

  _defineElements() {
    const arrows = this.arrowsContainer.children;

    this.arrows = {
      left: arrows[0],
      right: arrows[1],
    };
  }

  _checkSide(side) {
    const isSideValueCorrect = side === 'all' || side === 'left' || side === 'right';

    if (!isSideValueCorrect) {
      throw new Error('Side can only be \'left\', \'right\' or \'all\'');
    }
  }
}

export default ArrowButtons;
