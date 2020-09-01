class ArrowButton {
  constructor(arrowButton) {
    this.arrowButton = arrowButton;
  }

  switch(mode) {
    const disabledClass = 'arrow-button_disabled';
    const rippleClass = 'js-ripple';

    const { arrowButton } = this;

    arrowButton.classList.toggle(rippleClass, mode === 'on');
    arrowButton.classList.toggle(disabledClass, mode === 'off');
  }

  onClick(listener) {
    this.arrowButton.addEventListener('click', listener);
  }
}

export default ArrowButton;
