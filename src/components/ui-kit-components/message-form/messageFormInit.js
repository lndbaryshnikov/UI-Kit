import MessageForm from './MessageForm';

(() => {
  const messageForms = document.querySelectorAll(
    '.js-message-form',
  );

  messageForms.forEach((form) => {
    new MessageForm(form);
  });
})();
