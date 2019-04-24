import sliderTooltip from './__tooltip/slider_tooltip';

$('#slider').slider({
    animate: "slow",
    range: "min",
    value: 100,

    slide: function (event, ui) {
        sliderTooltip.text(ui.value);
        $('#slider').find('.ui-slider-handle').append(sliderTooltip);
    },
});