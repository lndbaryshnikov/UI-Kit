import '../../ui-kit-components/message-box/message-box';

(() => {
  const button = document.querySelector('.js-menu-message__header');
  const box = document.querySelector('.js-menu-message__message-box');
  box.style.display = 'none';

  button.addEventListener('click', () => {
    const { display } = box.style;

    box.style.display = display === 'none' ? 'block' : 'none';
  });
})();
