import MessageFormInputValidation from './message-form';

(() => {
  const getInput = (form, checkType) => {
    const twoOrUndefined = checkType === 'email' ? 2 : undefined;

    const number = checkType === 'name' ? 1 : twoOrUndefined;

    return form
      .querySelector(
        `.js-message-form__data-field_type_input:nth-of-type(${number}) input`
      );
  };

  const init = (form, checkType) => {
    const input = getInput(form, checkType);

    new MessageFormInputValidation(input).init(checkType);
  };

  const messageForms = document.querySelectorAll(
      '.js-message-form'
  );

  messageForms.forEach((form) => {
    init(form, 'name');
    init(form, 'email');
  });
})();
