import "jquery-ui/ui/widgets/slider"

(() => {
    const $sliderWithTooltip = $('.slider_with-tooltip');
    const $sliderTooltip = $('<div id="slider__tooltip" />');

    $sliderTooltip.text(40);

    $sliderWithTooltip.slider({
        animate: "slow",
        range: "min",
        value: 40,

        classes: {
            "ui-slider": "slider__scale_color_gray",
            "ui-slider-range": "slider__range_color_gray",
            "ui-slider-handle": "slider__handle_color_orange-red"
        },

        slide: function (event, ui) {
            $sliderTooltip.text(ui.value);
        },
    });

    $sliderWithTooltip.find('.ui-slider-handle').append($sliderTooltip);
})();

