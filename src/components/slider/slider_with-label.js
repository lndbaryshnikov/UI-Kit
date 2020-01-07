import "jquery-ui/ui/widgets/slider"
import "../../pips-float-plugin/jquery-ui-slider-pips"

$('.slider_with-label')
    .slider({
        animate: "slow",
        range: "min",
        value: 75,
        step: 25,

        classes: {
            "ui-slider": "slider__scale_color_gray",
            "ui-slider-range": "slider__range_color_green",
            "ui-slider-handle": "slider__handle_color_green"
        },
    })
    .slider("pips", {
        rest: "label",
    });

