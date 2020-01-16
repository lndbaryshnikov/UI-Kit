(() => {
  const error = $('<div class="message-form__tooltip message-form__tooltip_color_orange-red"></div>').text('Error');
  const thanks = $('<div class="message-form__tooltip message-form__tooltip_color_cyan" /></div>').text('Thanks!');

  $('.message-form .message-form__data-field_type_input:nth-of-type(1)').append(error);
  $('.message-form .message-form__data-field_type_input:nth-of-type(2)').append(thanks);
})();
