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

    const disabledClass = 'arrow-buttons__button_disabled';
    const rippleClass = 'js-ripple';

    const toggle = (arrow) => {
      arrow.classList.toggle(disabledClass, mode === 'off');
      arrow.classList.toggle(rippleClass, mode === 'on');
    };

    const { arrows } = this;

    if (side === 'all') {
      Object.values(arrows).forEach((arrow) => {
        toggle(arrow);
      });
    } else {
      toggle(arrows[side]);
    }
  }

  setListener(side, event, listener) {
    this._checkSide(side);

    const addListener = (arrow) => {
      arrow.addEventListener(event, listener);
    };

    const { arrows } = this;

    if (side === 'all') {
      Object.values(arrows).forEach((arrow) => {
        addListener(arrow);
      });
    } else addListener(arrows[side]);
  }

  _defineElements() {
    const [left, right] = this.arrowsContainer.children;

    this.arrows = { left, right };
  }

  _checkSide(side) {
    const isSideValueCorrect = side === 'all' || side === 'left' || side === 'right';

    if (!isSideValueCorrect) {
      throw new Error('Side can only be \'left\', \'right\' or \'all\'');
    }
  }
}

export default ArrowButtons;
