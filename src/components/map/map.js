window.mapsContainer = [];

const map = L.map('map__map-container').setView([37.791097, -122.415073], 14);
const mapBoxToken = 'pk.eyJ1IjoibGVvYmFyIiwiYSI6ImNrM2EwM3pmdzA3bGgzbXF0bG11cjhqdnkifQ.BcgmIzwCilGUFZljSUMAfQ';

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: mapBoxToken
}).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/leobar/ck3ae7zcr12001cqjy07attbx/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    accessToken: mapBoxToken
}).addTo(map);

const markerIcon = L.divIcon({
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<div class="map-marker"><span class="map-marker__circle" /></div>>`
});

const marker = L.marker([37.791097, -122.415073], {
    icon: markerIcon
}).addTo(map);

const mapObject = {
    map: map,
    marker: marker
};

mapsContainer.push(mapObject);

document.querySelector(".map__button").addEventListener("click", () => {
    map.setView([37.791097, -122.415073], 14);
});



