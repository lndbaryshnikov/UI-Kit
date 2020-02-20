import '../../ui-kit-components/message-box/messageBoxInit';
import HelpForm from './HelpForm';

(() => {
  const helpForms = document.querySelectorAll('.js-help-form');

  helpForms.forEach((currentForm) => {
    new HelpForm(currentForm);
  });
})();
