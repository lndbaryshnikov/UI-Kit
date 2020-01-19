import 'jquery-ui/ui/widgets/slider'
import '../../pips-float-plugin/jquery-ui-slider-pips'

(() => {
  const $slider = $('.js-slider');

  $slider.each(function (index) {
    const $this = $(this);

    $this.slider({
      min: $this.data('min'),
      max: $this.data('max'),
      step: $this.data('step'),
      value: $this.data('value'),
      animate: 'slow',

      classes: {
        'ui-slider': 'slider__scale slider__scale_color_' + $this.data('slider-color'),
        'ui-slider-range': 'slider__range slider__range_color_' + $this.data('range-color'),
        'ui-slider-handle': 'slider__handle slider__handle_color_' + $this.data('handle-color')
      }
    });

    if ($this.hasClass('js-slider_with_tooltip')) {
      const $sliderTooltip = $('<div class="slider__tooltip"></div>');

      $sliderTooltip.text(40);

      $this.slider('option', {
        range: false,
        slide: function (event, ui) {
          $sliderTooltip.text(ui.value);
        },
      });

      $this.find('.ui-slider-handle').append($sliderTooltip);
    } else if ($this.hasClass('js-slider_with_labels')) {
      $this.slider('option', {
        range: 'min'
      }).slider('pips', {
        rest: 'label',
      });
    } else if ($this.hasClass('js-slider_with_stages')) {
      $this.slider('option', {
        range: 'min',

        classes: {
          'ui-slider': 'slider__scale slider__scale_type_for-stages slider__scale_color_'
            + $this.data('slider-color'),
          'ui-slider-handle': 'slider__handle slider__handle_type_for-stages slider__handle_color_'
            + $this.data('handle-color')
        }
      }).slider('pips', {
        rest: 'label',
      });

      $this.find('.ui-slider-pip').addClass(`slider__pip_color_${$this.data('slider-color')}`);
      $this.find('.ui-slider-pip-selected').addClass(`slider__pip-selected_color_${$this.data('range-color')}`)
    }
  });
})();

