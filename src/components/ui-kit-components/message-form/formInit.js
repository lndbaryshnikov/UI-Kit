import MessageFormValidation from './MessageFormValidation';

(() => {
  const messageForms = document.querySelectorAll(
    '.js-message-form',
  );

  messageForms.forEach((form) => {
    new MessageFormValidation(form).init();
  });
})();
