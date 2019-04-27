import sliderTooltip from './__tooltip/slider_tooltip';

sliderTooltip.text(30);

$('.slider_with-tooltip').slider({
    animate: "slow",
    range: "min",
    value: 30,

    classes: {
        "ui-slider": "slider__scale_color_orange-red",
        "ui-slider-range": "slider__range_color_orange-red",
        "ui-slider-handle": "slider__handle_color_orange-red"
    },

    slide: function (event, ui) {
        sliderTooltip.text(ui.value);
        //$('.slider_with-tooltip').find('.ui-slider-handle').append(sliderTooltip);
    },
});

$('.slider_with-tooltip').find('.ui-slider-handle').append(sliderTooltip);