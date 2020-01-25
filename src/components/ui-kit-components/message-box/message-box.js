(() => {
  const messageBox = {};

  messageBox['Sarah Brown'] = {};
  messageBox['Sarah Brown'].name = 'Sarah Brown';
  messageBox['Sarah Brown'].lastMessage = 'Hey! Can I help you?';

  const $messageBox = $('.js-message-box');

  $messageBox.find('.js-message-box__name').text(messageBox['Sarah Brown'].name);
  $messageBox.find('.js-message-box__message').text(messageBox['Sarah Brown'].lastMessage);
})();
