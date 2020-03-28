class Map {
  constructor($mapContainer, id) {
    this.$mapContainer = $mapContainer;

    this._defineOptions();
    this._init(id);
  }

  _defineOptions() {
    const getData = (property) => window.Number(this.$mapContainer.data(property));

    this.options = {
      longitude: getData('longitude'),
      latitude: getData('latitude'),
      zoom: getData('zoom'),
    };

    this.mapBoxToken = 'pk.eyJ1IjoibGVvYmFyIiwiYSI6ImNrM2EwM3pmdz'
      + 'A3bGgzbXF0bG11cjhqdnkifQ.BcgmIzwCilGUFZljSUMAfQ';
  }

  _init(id) {
    const { longitude, latitude, zoom } = this.options;

    this.map = L.map(id).setView([longitude, latitude], zoom);

    this._setLayers();
    this._addMarker();
    this._addButtonHandler();
  }

  _setLayers() {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
        + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
        + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.mapBoxToken,
    }).addTo(this.map);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/leobar/ck3ae7zcr12001cqjy07attbx/'
      + 'tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        accessToken: this.mapBoxToken,
      },
    ).addTo(this.map);
  }

  _addMarker() {
    const markerIcon = L.divIcon({
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: '<div class="map__map-marker"><span class="map__map-marker-circle"></span></div>',
    });

    const { longitude, latitude } = this.options;

    this.marker = L.marker([longitude, latitude], {
      icon: markerIcon,
    }).addTo(this.map);
  }

  _addButtonHandler() {
    const { longitude, latitude, zoom } = this.options;

    const buttonClickHandler = () => {
      this.map.setView([longitude, latitude], zoom);
    };

    this.$mapContainer.parent().find('.js-map__button').on('click', buttonClickHandler);
  }
}

export default Map;
