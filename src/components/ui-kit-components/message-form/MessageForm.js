import TextField from '../text-field/TextField';

class MessageForm {
  constructor(form) {
    this.elements = { form };

    this.state = {
      name: false,
      email: false,
    };

    autoBind(this);

    this._init();
  }

  _init() {
    this._defineElements();
    this._addHandlers();
  }

  _defineElements() {
    const getTooltips = (parent) => parent.querySelectorAll('.js-message-form__tooltip');

    const { form } = this.elements;
    const [nameDataField, emailDataField] = form.querySelectorAll('.js-message-form__data-field_type_input');
    const [nameInput, emailInput] = form.querySelectorAll('.js-message-form__data-field_type_input input');
    const [nameThanksTooltip, nameErrorTooltip] = getTooltips(nameDataField);
    const [emailThanksTooltip, emailErrorTooltip] = getTooltips(emailDataField);

    this.elements.inputs = {
      nameInput: {
        inputInstance: new TextField(nameInput),
        inputType: 'name',
        thanksTooltip: nameThanksTooltip,
        errorTooltip: nameErrorTooltip,
      },
      emailInput: {
        inputInstance: new TextField(emailInput),
        inputType: 'email',
        thanksTooltip: emailThanksTooltip,
        errorTooltip: emailErrorTooltip,
      },
    };

    this.elements.button = form.querySelector('.js-message-form__button button');
  }

  _addHandlers() {
    Object.values(this.elements.inputs).forEach((inputObject) => {
      const {
        checkAndShowTooltipHandler,
        hideTooltipsHandler,
      } = this._makeInputHandlers(inputObject.inputType);

      const { inputInstance } = inputObject;

      inputInstance.onFocus(hideTooltipsHandler);
      inputInstance.onBlur(checkAndShowTooltipHandler);
    });

    this.elements.form.addEventListener('submit', this._formSubmitHandler);
  }

  _makeInputHandlers(inputType) {
    const maybeNameInput = inputType === 'name' ? 'nameInput' : undefined;
    const inputName = inputType === 'email' ? 'emailInput' : maybeNameInput;

    return {
      hideTooltipsHandler: () => {
        const { thanksTooltip, errorTooltip } = this.elements.inputs[inputName];

        this._toggleTooltipModifier(thanksTooltip, 'invisible', 'on');
        this._toggleTooltipModifier(errorTooltip, 'invisible', 'on');
      },
      checkAndShowTooltipHandler: (event) => {
        const { value } = event.currentTarget;

        if (this._isValid(value, inputType)) {
          this.state[inputType] = true;

          this._showTooltip(inputType, 'thanks');
        } else {
          this.state[inputType] = false;

          this._showTooltip(inputType, 'error');
        }
      },
    };
  }

  _formSubmitHandler(event) {
    const isEmailValid = this.state.email;
    const isNameValid = this.state.name;

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

    const tooltip = this.elements.inputs[inputName][tooltipName];

    this._toggleTooltipModifier(tooltip, 'invisible', 'off');
  }

  _toggleTooltipModifier(tooltip, modifier, mode) {
    if (mode !== 'on' && mode !== 'off') {
      throw new Error('Mode can be only \'on\' or \'off\'');
    }

    const modifierClass = `message-form__tooltip_${modifier}`;

    const processModifierClass = (method) => {
      if (method === 'contains') {
        return tooltip.classList.contains(modifierClass);
      }

      tooltip.classList[method](modifierClass);

      return undefined;
    };

    if (processModifierClass('contains')) {
      if (mode === 'off') {
        processModifierClass('remove');
      }
    } else if (mode === 'on') {
      processModifierClass('add');
    }
  }
}

export default MessageForm;
