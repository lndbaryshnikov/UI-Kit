(() => {
  const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email.toLowerCase());
  };

  const isNameValid = (name) => {
    return /^[a-zа-я ]*$/.test(name.toLowerCase());
  };

  const createTooltip = (text, color) => {
    const className = 'message-form__tooltip message-form__tooltip_color_' + color;

    const tooltip = document.createElement('div');
    tooltip.setAttribute('class', className);
    tooltip.innerHTML = text;
    tooltip.style.display = 'none';

    return tooltip;
  };

  const getInputs = (typeNumber) => {
    return document
      .querySelectorAll(
        `.js-message-form .js-message-form__data-field_type_input:nth-of-type(${typeNumber}) input`
      );
  };

  const getInputsObjects = (inputs) => {
    const inputsObjects = [];

    inputs.forEach((input) => {
      const object = {
        input,
        thanksTooltip: createTooltip('Thanks!', 'cyan'),
        errorTooltip: createTooltip('Error!', 'orange-red')
      };

      object.input.parentElement.append(object.thanksTooltip, object.errorTooltip);

      inputsObjects.push(object);
    });

    return inputsObjects;
  };

  const addInputsHandlers = (inputsObjects, isValueCorrectFunction) => {
    const getHideTooltipsHandler = (...tooltips) => {
      return () => {
        tooltips.forEach((tooltip) => {
          tooltip.style.display = 'none';
        });
      }
    };

    const showTooltip = (tooltip) => {
      tooltip.style.display = 'inline-block';
    };

    const getCheckInputHandler = (thanksTooltip, errorTooltip) => {
      return (event) => {
        const value = event.currentTarget.value;

        if (isValueCorrectFunction(value)) {
          showTooltip(thanksTooltip);
          console.log('ok', thanksTooltip);
        } else {
          console.log('not ok');
          showTooltip(errorTooltip);
        }
      }
    };


    inputsObjects.forEach((object) => {
      console.log(object);

      object.input.addEventListener('focus', getHideTooltipsHandler(object.thanksTooltip, object.errorTooltip));
      object.input.addEventListener('change', getCheckInputHandler(object.thanksTooltip, object.errorTooltip));
    });
  };

  const nameInputs = getInputs(1);
  const emailInputs = getInputs(2);

  const nameObjects = getInputsObjects(nameInputs);
  const emailObjects = getInputsObjects(emailInputs);

  addInputsHandlers(nameObjects, isNameValid);
  addInputsHandlers(emailObjects, isEmailValid);
})();
