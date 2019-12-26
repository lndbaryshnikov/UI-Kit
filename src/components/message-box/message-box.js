(() => {
    const messageBox = {};

    messageBox['Sarah Brown'] = {};
    messageBox['Sarah Brown'].name = 'Sarah Brown';
    messageBox['Sarah Brown'].lastMessage = 'Hey! Can I help you?';

    $('.message-box').find('.message-box__name').text(messageBox['Sarah Brown'].name);
    $('.message-box').find('.message-box__message').text(messageBox['Sarah Brown'].lastMessage);
})();
