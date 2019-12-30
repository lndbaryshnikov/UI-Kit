import "../components/common"

import "./contact__address-billboard.scss"
import "./contact__address.scss"
import "./contact__map.scss"

import "../../components/map/map.styles"
// import "../../components/map/map"
import "../../components/billboard/billboard.styles"

const map = window.mapsContainer[0].map;
const marker = window.mapsContainer[0].marker;

console.log(map);

map.setView([55.785124, 49.121856], 14);
marker.setLatLng([55.785124, 49.121856]);

document.querySelector(".contact__map .map__footer-address").innerHTML = "Ostrovsky Street, 38. Kazan";

document.querySelector(".contact__map .map__button").addEventListener("click", () => {
    map.setView([55.785124, 49.121856], 14);
});

const billboardButton = document.querySelector(".contact__address-billboard .billboard__button");
billboardButton.onclick = () => { window.location.href="./enroll.html" };
document.querySelector(".contact__address-billboard .billboard__button button").innerHTML = "Enroll";


