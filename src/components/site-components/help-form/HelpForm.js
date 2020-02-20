class HelpForm {
  constructor(form) {
    this._form = form;
    this._init();
  }

  _init() {
    this._button = this._getElement('header');
    this._messageBox = this._getElement('message-box');
    this._arrow = this._getElement('arrow');

    this._toggleElementModifier('message-box', 'invisible');

    this._button.addEventListener('click', this._buttonClickHandler.bind(this));
  }

  _buttonClickHandler() {
    this._toggleElementModifier('message-box', 'invisible');
    this._toggleElementModifier('arrow', 'direction', 'down');
  }

  _getElement(elementName) {
    return this._form.querySelector(`.js-help-form__${elementName}`);
  }

  _toggleElementModifier(elementName, modifier, value) {
    const elementClassName = `help-form__${elementName}`;
    const modifierName = value ? `${elementClassName}_${modifier}_${value}`
      : `${elementClassName}_${modifier}`;

    this._form.querySelector(`.js-${elementClassName}`).classList.toggle(modifierName);
  }
}

export default HelpForm;
