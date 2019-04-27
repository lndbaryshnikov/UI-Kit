$('.slider_with-label')
    .slider({
        animate: "slow",
        range: "min",
        value: 50,
        step: 25,

        classes: {
            "ui-slider": "slider__scale_color_green",
            "ui-slider-range": "slider__range_color_green",
            "ui-slider-handle": "slider__handle_color_green"
        },
    })
    .slider("pips", {
        rest: "label",
    });



//     .each(function() {
//     var option = $(this).data().slider.options;
//     var values = option.max - option.min;
//     for (var i = 0; i<=values; i++) {
//         var item = $('<label>' + '|' + (i+1) + '</label>')
//             .css('left', (i / values * 100) + '%');
//         $('.slider_with__label').append(item);
//     }
// });