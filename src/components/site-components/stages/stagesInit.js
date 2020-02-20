import '../../ui-kit-components/slider/sliderInit';

import Stages from './Stages';

(() => {
  const stages = document.querySelectorAll('.js-stages');

  stages.forEach((stage) => {
    new Stages(stage);
  });
})();
