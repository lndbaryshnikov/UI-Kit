class MessageFormInputValidation {
  constructor(input) {
    this._inputObject = { input };
  }

  init(checkFor) {
    if (checkFor !== 'email' && checkFor !== 'name') {
      throw new Error('It\'s only "email" and "name" check possible');
    }

    this._mode = checkFor;

    this._addTooltips();
    this._addHandlers();
  }

  _addHandlers() {
    const { checkAndShowTooltipHandler, hideTooltipsHandler } = this._getHandler();
    const { input } = this._inputObject;

    input.addEventListener('focus', hideTooltipsHandler);
    input.addEventListener('change', checkAndShowTooltipHandler);
  }

  _addTooltips() {
    this._inputObject.thanksTooltip = this._createTooltip('Thanks!', 'cyan');
    this._inputObject.errorTooltip = this._createTooltip('Error!', 'orange-red');

    const { thanksTooltip, errorTooltip } = this._inputObject;

    this._inputObject.input.parentElement.append(thanksTooltip, errorTooltip);
  }

  _createTooltip(text, color) {
    const className = `message-form__tooltip message-form__tooltip_color_${color}`;

    const tooltip = document.createElement('div');
    tooltip.setAttribute('class', className);
    tooltip.innerHTML = text;
    tooltip.style.display = 'none';

    return tooltip;
  }

  _getHandler() {
    const { thanksTooltip, errorTooltip } = this._inputObject;

    const showTooltip = (type) => {
      const maybeErrorTooltip = type === 'error' ? 'errorTooltip' : undefined;
      const tooltipName = type === 'thanks' ? 'thanksTooltip'
        : maybeErrorTooltip;

      this._inputObject[tooltipName].style.display = 'inline-block';
    };

    return {
      hideTooltipsHandler: () => {
        thanksTooltip.style.display = 'none';
        errorTooltip.style.display = 'none';
      },
      checkAndShowTooltipHandler: (event) => {
        const { value } = event.currentTarget;

        if (this._isValid(value)) {
          showTooltip('thanks');
        } else {
          showTooltip('error');
        }
      },
    };
  }

  _isValid(value) {
    const validators = {
      email: (email) => {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email.toLowerCase());
      },

      name: (name) => /^[a-zа-я ]*$/.test(name.toLowerCase()),
    };

    const checkType = this._mode;

    return validators[checkType](value);
  }
}

export default MessageFormInputValidation;
