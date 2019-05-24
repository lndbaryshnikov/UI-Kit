var messageBox = {};
messageBox['Sarah Brown'] = {};
messageBox['Sarah Brown'].name = 'Sarah Brown';
messageBox['Sarah Brown'].lastMessage = 'Hey! So are we cool to meet at the art gallery? Say 8pm';

$('.message-box').find('.message-box__name').text(messageBox['Sarah Brown'].name);
$('.message-box').find('.message-box__message').text(messageBox['Sarah Brown'].lastMessage);