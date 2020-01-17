import "jquery-ui/ui/widgets/slider"
import "../../pips-float-plugin/jquery-ui-slider-pips"

$('.stages')
    .slider({
        animate: "slow",
        min: 1,
        max: 5,
        range: "min",
        value: 3,

        classes: {
            "ui-slider": "slider__scale slider__scale_color_gray stages__scale",
            "ui-slider-range": "slider__range slider__range_color_orange-red",
            "ui-slider-handle": "slider__handle slider__handle_color_orange-red stages__handle"
        }
    })
    .slider("pips", {
        rest: "label",
    });
