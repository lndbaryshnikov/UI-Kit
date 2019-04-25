import sliderTooltip from './__tooltip/slider_tooltip';

$('.slider_with-tooltip').slider({
    animate: "slow",
    range: "min",
    value: 100,

    classes: {
        "ui-slider": "slider__scale_color_orange-red",
        "ui-slider-range": "slider__range_color_orange-red",
        "ui-slider-handle": "slider__handle_color_orange-red"
    },

    slide: function (event, ui) {
        sliderTooltip.text(ui.value);
        $('.slider_with-tooltip').find('.ui-slider-handle').append(sliderTooltip);
    },
});