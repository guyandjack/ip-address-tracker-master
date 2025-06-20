
//librairie import
import L from "leaflet";
import "leaflet/dist/leaflet.css";

//functions import
import { checkDataUserInput } from "./javascript/function/checkDataUserInput";
import { getInputValue } from "./javascript/function/getInputValue";
import { showError } from "./javascript/function/showError";
import { fetchApi } from "./javascript/function/fetchApi";
import { getXY } from "./javascript/function/getXY";

//variable globale

//instance of map and marker
let map = null;
let markerLocation = null;

let markerHome = null;
let markerNeighbor = null;
let line = null;

//option for personnal icon
const iconLocation = L.icon({
  iconUrl: "/icon-location.svg",
  iconSize: [40, 50], // size of the icon
  iconAnchor: [22, -94], // point of the icon which will correspond to marker's location
  popupAnchor: [-5, 76], // point from which the popup should open relative to the iconAnchor
});


function showNeighbor(data) {
  //get longitude and latitude
  const detail = getXY(data);

  //kill map instance if exist
  if (map) {
    map.remove();
  }

  // Initialiser la carte centrée sur un point quelconque
  map = L.map("map", { zoomControl: false }).setView([0, 0], 2);

  // Fond de carte (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Coordonnées des deux IP (exemple)
  const ip1 = [46.3072, 7.4763]; //home
  const ip2 = [detail.lat, detail.lng]; 

  // Ajouter les marqueurs
   markerHome = L.marker(ip1)
    .addTo(map)
    .bindPopup("Hello neighbor, it's my quiet place for coding")
    .openPopup();
  markerNeighbor = L.marker(ip2)
    .addTo(map)
    .bindPopup("You must be around here");
  
   
  // Tracer une ligne entre les deux IP
  line = L.polyline([ip1, ip2], { color: "blue" }).addTo(map);

  // Ajuster la vue pour tout voir
  map.fitBounds(line.getBounds());

  // Calcul de la distance en km
  const distanceMeters = L.latLng(ip1).distanceTo(L.latLng(ip2));
  const distanceKm = Math.ceil((distanceMeters / 1000));

  

  // Ajouter un popup sur la ligne ou dans la console
  L.popup()
    .setLatLng(line.getCenter())
    .setContent(`Just ${distanceKm} km between us`)
    .openOn(map);
}

//function
/**
 * Init map with the data from API
 *
 * @param {object} data object data from response API
 */
function setMap(data) {
  
  const useTextPopup = "It seems to be here";

  //get longitude and latitude
  const detail = getXY(data);

  //if a instance of map existe we use it
  if (map) {
    console.log("map instance detected !");
    if (markerHome) markerHome.remove();
    if (markerNeighbor) markerNeighbor.remove();
    if (line) line.remove();

    map.setView([detail.lat, detail.lng], 16);

    markerLocation.setLatLng([detail.lat, detail.lng], {
        icon: iconLocation,
      })
      .addTo(map);
  }

  //
  if (map === null || map === "undefined") {
    console.log("no map instance ");
    //Init map with good location
    map = L.map("map", { zoomControl: false }).setView(
      [detail.lat, detail.lng],
      16
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    //Place icon on map
    markerLocation = L.marker([detail.lat, detail.lng], {
      icon: iconLocation,
    }).addTo(map);

    //personnal popup
    markerLocation.bindPopup(useTextPopup).openPopup();
  }
}

//fetch to geoApi after a click
const arrowButton = document.querySelector(".container-arrow");
if (arrowButton) {
  arrowButton.addEventListener("click", async () => {
    try {
      let value = getInputValue("#ip");
      let result = checkDataUserInput(value);
      if (!result.isValid) {
        showError(".toast", 3, "Enter a valid IP or domain");
        return;
      }

      const dataApi = await fetchApi(result);
      if (!dataApi) {
        showError(".toast", 5, "No data to display");
        return
      }
      if (value === "z.z.z.z") {
        showNeighbor(dataApi);
      } else {
        
        setMap(dataApi);
        
      }
    } catch (error) {
      console.log("EROOR:", error);
    }
  });
}
//fetch to geoApi after press enter key
const input = document.querySelector(".input");
if (input) {
  input.addEventListener("keydown", async (event) => {
    try {
      if (event.key !== "Enter") {
        return
      }
      console.log("enter key presssed")
      let value = getInputValue("#ip");
      let result = checkDataUserInput(value);
      if (!result.isValid) {
        showError(".toast", 3, "Enter a valid IP or domain");
        return;
      }

      const dataApi = await fetchApi(result);
      if (!dataApi) {
        showError(".toast", 5, "No data to display");
        return
      }
      if (value === "z.z.z.z") {
        showNeighbor(dataApi);
      } else {
        
        setMap(dataApi);
        
      }
    } catch (error) {
      console.log("EROOR:", error);
    }
  });
}

//fetch to geoApi when landing page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const dataDefault = {
      type: "ip",
      isValid: true,
      data: "8.8.8.8",
    };

    const dataApi = await fetchApi(dataDefault);
    setMap(dataApi);
    return;
  } catch (error) {
    console.log("EROOR:", error);
  }
});


