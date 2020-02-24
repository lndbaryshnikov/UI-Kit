class HelpForm {
  constructor(form) {
    this.form = form;
    this._init();
  }

  _init() {
    this.button = this._getElement('header');
    this.messageBox = this._getElement('message-box');
    this.arrow = this._getElement('arrow');

    this._toggleElementModifier('message-box', 'invisible');

    this.button.addEventListener('click', this._buttonClickHandler.bind(this));
  }

  _buttonClickHandler() {
    this._toggleElementModifier('message-box', 'invisible');
    this._toggleElementModifier('arrow', 'direction', 'down');
  }

  _getElement(elementName) {
    return this.form.querySelector(`.js-help-form__${elementName}`);
  }

  _toggleElementModifier(elementName, modifier, value) {
    const elementClassName = `help-form__${elementName}`;
    const modifierName = value ? `${elementClassName}_${modifier}_${value}`
      : `${elementClassName}_${modifier}`;

    this.form.querySelector(`.js-${elementClassName}`).classList.toggle(modifierName);
  }
}

export default HelpForm;
