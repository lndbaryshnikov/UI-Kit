class MessageForm {
  constructor(form) {
    this._elements = { form };

    this._state = {
      name: false,
      email: false,
    };

    this._defineElements();
  }

  init() {
    this._addTooltips();
    this._addHandlers();
  }

  _defineElements() {
    const { form } = this._elements;
    const inputs = form.querySelectorAll('.js-message-form__data-field_type_input input');

    this._elements.inputs = {
      nameInput: {
        input: inputs[0],
        inputType: 'name',
      },
      emailInput: {
        input: inputs[1],
        inputType: 'email',
      },
    };

    this._elements.button = form.querySelector('.js-message-form__button button');
  }

  _addHandlers() {
    Object.values(this._elements.inputs).forEach((inputObject) => {
      const {
        checkAndShowTooltipHandler,
        hideTooltipsHandler,
      } = this._getInputHandlers(inputObject.inputType);

      const { input } = inputObject;

      input.addEventListener('focus', hideTooltipsHandler);
      input.addEventListener('blur', checkAndShowTooltipHandler);
    });

    this._elements.form.addEventListener('submit', this._formSubmitHandler.bind(this));
  }

  _addTooltips() {
    Object.keys(this._elements.inputs).forEach((inputObject) => {
      this._elements.inputs[inputObject].thanksTooltip = this._createTooltip('thanks');
      this._elements.inputs[inputObject].errorTooltip = this._createTooltip('error');

      const { input, thanksTooltip, errorTooltip } = this._elements.inputs[inputObject];

      input.parentElement.append(thanksTooltip, errorTooltip);
    });
  }

  _createTooltip(type) {
    let text;
    let color;

    if (type === 'thanks') {
      text = 'Thanks!';
      color = 'cyan';
    } else if (type === 'error') {
      text = 'Error!';
      color = 'orange-red';
    }

    const className = `message-form__tooltip message-form__tooltip_color_${color}`;

    const tooltip = document.createElement('div');
    tooltip.setAttribute('class', className);
    tooltip.innerHTML = text;
    tooltip.style.display = 'none';

    return tooltip;
  }

  _getInputHandlers(inputType) {
    const maybeNameInput = inputType === 'name' ? 'nameInput' : undefined;
    const inputName = inputType === 'email' ? 'emailInput' : maybeNameInput;

    return {
      hideTooltipsHandler: () => {
        const { thanksTooltip, errorTooltip } = this._elements.inputs[inputName];

        thanksTooltip.style.display = 'none';
        errorTooltip.style.display = 'none';
      },
      checkAndShowTooltipHandler: (event) => {
        const { value } = event.currentTarget;

        if (this._isValid(value, inputType)) {
          this._state[inputType] = true;

          this._showTooltip(inputType, 'thanks');
        } else {
          this._state[inputType] = false;

          this._showTooltip(inputType, 'error');
        }
      },
    };
  }

  _formSubmitHandler(event) {
    const isEmailValid = this._state.email;
    const isNameValid = this._state.name;

    if (!isEmailValid || !isNameValid) {
      if (!isEmailValid) this._showTooltip('email', 'error');
      if (!isNameValid) this._showTooltip('name', 'error');

      event.preventDefault();
    }
  }

  _isValid(value, checkType) {
    const validators = {
      email: (email) => {
        if (!email) return false;

        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email.toLowerCase());
      },

      name: (name) => {
        if (!name) return false;

        return /^[a-zа-я ]*$/.test(name.toLowerCase());
      },
    };

    return validators[checkType](value);
  }

  _showTooltip(inputType, tooltipType) {
    const maybeNameInput = inputType === 'name' ? 'nameInput' : undefined;
    const inputName = inputType === 'email' ? 'emailInput' : maybeNameInput;

    const maybeErrorTooltip = tooltipType === 'error' ? 'errorTooltip' : undefined;
    const tooltipName = tooltipType === 'thanks' ? 'thanksTooltip'
      : maybeErrorTooltip;

    this._elements.inputs[inputName][tooltipName].style.display = 'inline-block';
  }
}

export default MessageForm;
