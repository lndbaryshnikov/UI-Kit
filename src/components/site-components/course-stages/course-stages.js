import '../../ui-kit-components/arrow-buttons/arrow-buttons';
import '../../../components/ui-kit-components/slider/slider'

(() => {
  const arrows = document.querySelector('.js-course-stages .arrow-buttons');
  const $slider = $('.js-course-stages .js-slider.js-slider_with_stages');

  console.log($slider);

  const leftArrow = arrows.children[0];
  const rightArrow = arrows.children[1];

  const stages = document.querySelector('.course-stages__stage');
  const classesNormal = 'arrow-buttons__arrow-container ripple';
  const classesDisabled = 'arrow-buttons__arrow-container arrow-buttons_disabled';

  const stagesArray = ['HTML', 'CSS', 'JavaScript', 'Project', 'Internship'];

  leftArrow.addEventListener('click', () => {
    let currentStage = stages.innerHTML;
    let currentIndex = stagesArray.indexOf(currentStage);

    if (currentIndex !== 0) {
      if (currentIndex === 4) {
        rightArrow.className = classesNormal;
      }

      stages.innerHTML = stagesArray[currentIndex - 1];
      $slider.slider('option', 'value', currentIndex);

      currentStage = stages.innerHTML;
      currentIndex = stagesArray.indexOf(currentStage);

      if (currentIndex === 0) {
        leftArrow.className = classesDisabled;
      }
    }
  });

  rightArrow.addEventListener('click', () => {
    let currentStage = stages.innerHTML;
    let currentIndex = stagesArray.indexOf(currentStage);

    if (currentIndex !== 4) {
      if (currentIndex === 0) {
        leftArrow.className = classesNormal;
      }

      stages.innerHTML = stagesArray[currentIndex + 1];
      $slider.slider('option', 'value', currentIndex + 2);

      currentStage = stages.innerHTML;
      currentIndex = stagesArray.indexOf(currentStage);

      if (currentIndex === 4) {
        rightArrow.className = classesDisabled;
      }
    }
  });

  $slider.slider({
    change: function (event, ui) {
      const index = ui.value - 1;
      stages.innerHTML = stagesArray[index];

      if (index === 0) {
        leftArrow.className = classesDisabled;
      } else leftArrow.className = classesNormal;

      if (index === 4) {
        rightArrow.className = classesDisabled;
      } else rightArrow.className = classesNormal;
    }
  })
})();
