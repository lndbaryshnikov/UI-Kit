(($) => {
  $('.js-ripple').click((event) => {
    const $element = $(event.currentTarget);

    if ($element.find('.ink').length === 0) {
      const inkColor = $element.data('ripple-color') || 'white';
      const colorClasses = {
        white: 'ink-white',
        primary: 'ink-primary',
        secondary: 'ink-secondary',
      };
      const className = `ink ${colorClasses[inkColor]}`;

      $element.prepend(`<span class='${className}'></span>`);
    }
    const $ink = $element.find('.ink');

    $ink.removeClass('animate');

    if (!$ink.height() && !$ink.width()) {
      const diameter = Math.max($element.outerWidth(), $element.outerHeight());
      $ink.css({
        height: diameter,
        width: diameter,
      });
    }

    const x = event.pageX - $element.offset().left - $ink.width() / 2;
    const y = event.pageY - $element.offset().top - $ink.height() / 2;

    $ink.css({
      top: `${y}px`,
      left: `${x}px`,
    }).addClass('animate');
  });
})(jQuery);
