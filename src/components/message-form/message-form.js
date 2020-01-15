var error = $('<div class="message-form__tooltip message-form__tooltip_color_orange-red" />').text('Error');
var thanks = $('<div class="message-form__tooltip message-form__tooltip_color_cyan" />').text('Thanks!');

$('.message-form .message-form__data-field_type_input:nth-of-type(1)').after(error);
$('.message-form .message-form__data-field_type_input:nth-of-type(2)').after(thanks);