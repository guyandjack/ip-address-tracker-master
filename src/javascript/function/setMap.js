





/**
 * Init map with the data from API
 *
 * @param {object} data object data from response API
 */
function setMap(data = null) {
  const textPopup = data ? "You are here!" : "A quiet place for coding...";

  //get longitude and latitude
  const detail = getXY(data);

  //kill instance of map
  if (map) {
    map.remove();
  }

  //Init map with good location
   map = L.map("map", { zoomControl: false }).setView(
    [detail.lat, detail.lng],
    16
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //option personnal icon
  const iconLocation = L.icon({
    iconUrl: "images/icon-location.svg",

    iconSize: [40, 50], // size of the icon
    iconAnchor: [22, -94], // point of the icon which will correspond to marker's location
    popupAnchor: [-5, 76], // point from which the popup should open relative to the iconAnchor
  });

  //Add personnal icon on map
  const markerLocation = L.marker([detail.lat, detail.lng], {
    icon: iconLocation,
  }).addTo(map);

  //personnal popup
  markerLocation.bindPopup(textPopup).openPopup();
}

export {setMap}
