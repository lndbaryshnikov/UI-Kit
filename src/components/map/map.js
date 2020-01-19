(() => {
  const $mapContainers = $('.js-map__map-container');

  $mapContainers.each(function (index) {
    const $this = $(this);
    const id = `js-map-${index + 1}`;

    const longitude = window.Number($this.data('longitude'));
    const latitude = window.Number($this.data('latitude'));
    const zoom = window.Number($this.data('zoom'));

    this.setAttribute('id', id);

    const map = L.map(id).setView([longitude, latitude], zoom);

    const mapBoxToken = 'pk.eyJ1IjoibGVvYmFyIiwiYSI6ImNrM2EwM3pmdz' +
      'A3bGgzbXF0bG11cjhqdnkifQ.BcgmIzwCilGUFZljSUMAfQ';

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapBoxToken
    }).addTo(map);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/leobar/ck3ae7zcr12001cqjy07attbx/' +
      'tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        accessToken: mapBoxToken
      }).addTo(map);

    const markerIcon = L.divIcon({
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<div class="map__map-marker"><span class="map__map-marker-circle"></span></div>`
    });

    const marker = L.marker([longitude, latitude], {
      icon: markerIcon
    }).addTo(map);

    const mapObject = {
      map: map,
      marker: marker
    };

    this.parentElement.querySelector('.js-map__button').addEventListener('click', () => {
      map.setView([longitude, latitude], zoom);
    });
  });
})();





