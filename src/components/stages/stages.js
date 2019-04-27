$('.stages')
    .slider({
        animate: "slow",
        max: 5,
        range: "min",
        value: 2,

        classes: {
            "ui-slider": "slider__scale_color_gray stages__scale",
            "ui-slider-range": "slider__range_color_orange-red",
            "ui-slider-handle": "slider__handle_color_orange-red stages__handle"
        }
    })
    .slider("pips", {
        rest: "label",
    });
