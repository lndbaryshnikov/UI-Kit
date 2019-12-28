import "./course-stages.scss"
import "./course-stages__title.scss"
import "./course-stages__stage.scss"
import "./course-stages__arrows.scss"
import "./course-stages__slider.scss"

import "jquery-ui/ui/widgets/slider"
import "jquery-ui/themes/base/core.css"
import "jquery-ui/themes/base/slider.css"

import "../../../components/slider/pips-float-plugin/jquery-ui-slider-pips"
import "../../../components/slider/pips-float-plugin/jquery-ui-slider-pips.css"

import "../../../components/stages/stages"
import "../../../components/slider/slider.styles"
import "../../../components/stages/stages.styles"

import "../../../components/arrow-button/arrow-button.styles"
import "../../../components/ripple-effect/ripple-effect.styles"

import "../../../components/stages/stages.styles"

(()=> {
    const arrows = document.querySelector(".arrow-buttons");
    const $slider = $(".stages");

    const leftArrow = arrows.children[0];
    const rightArrow = arrows.children[1];
    console.log(leftArrow, arrows);

    const stages = document.querySelector(".course-stages__stage");
    const classesNormal = "arrow-buttons__arrow-container ripple";
    const classesDisabled = "arrow-buttons__arrow-container arrow-buttons_disabled";

    const stagesArray = ["HTML", "CSS", "JavaScript", "Project", "Internship"];

    leftArrow.addEventListener("click", () => {
        let currentStage = stages.innerHTML;
        let currentIndex = stagesArray.indexOf(currentStage);

        if ( currentIndex !== 0 ) {
            if ( currentIndex === 4 ) {
                rightArrow.className = classesNormal;
            }

            stages.innerHTML = stagesArray[currentIndex - 1];
            $slider.slider("option", "value", currentIndex);

            currentStage = stages.innerHTML;
            currentIndex = stagesArray.indexOf(currentStage);

            if ( currentIndex === 0 ) {
                leftArrow.className = classesDisabled;
            }
        }
    });

    rightArrow.addEventListener("click", () => {
        let currentStage = stages.innerHTML;
        let currentIndex = stagesArray.indexOf(currentStage);

        if ( currentIndex !== 4 ) {
            if ( currentIndex === 0 ) {
                leftArrow.className = classesNormal;
            }

            stages.innerHTML = stagesArray[currentIndex + 1];
            $slider.slider("option", "value", currentIndex + 2);

            currentStage = stages.innerHTML;
            currentIndex = stagesArray.indexOf(currentStage);

            if ( currentIndex === 4 ) {
                rightArrow.className = classesDisabled;
            }
        }
    });

    $slider.slider({
        change: function(event, ui) {
            const index = ui.value - 1;
            stages.innerHTML = stagesArray[index];

            if ( index === 0 ) {
                leftArrow.className = classesDisabled;
            } else leftArrow.className = classesNormal;

            if ( index === 4 ) {
                rightArrow.className = classesDisabled;
            } else rightArrow.className = classesNormal;
        },

        classes: {
            "ui-slider": "slider__scale_color_gray stages__scale",
            "ui-slider-range": "slider__range_color_green",
            "ui-slider-handle": "slider__handle_color_green stages__handle"
        }
    })
})();
