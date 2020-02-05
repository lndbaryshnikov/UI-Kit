import Map from './Map';

(() => {
  const $mapContainers = $('.js-map__map-container');

  $mapContainers.each((index, item) => {
    const $item = $(item);
    const id = `js-map-${index + 1}`;

    $item.attr('id', id);

    new Map($item, id);
  });
})();
