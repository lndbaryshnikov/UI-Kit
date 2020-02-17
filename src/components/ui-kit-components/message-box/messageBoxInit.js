import MessageBox from './MessageBox';

(() => {
  const $messageBoxes = $('.js-message-box');

  $messageBoxes.each((index, box) => {
    const $currentBox = $(box);
    const consultantName = $currentBox.data('consultant');

    new MessageBox($currentBox, consultantName);
  });
})();
