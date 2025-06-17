/**
 * Display data from API
 *
 * @param {object} data Object data from api
 */
function displayData(data = null) {
  //dom element reference
  const divIp = document.querySelector("#item-ip");
  const divLocation = document.querySelector("#item-location");
  const divTime = document.querySelector("#item-time");
  const divIsp = document.querySelector("#item-isp");

  //data to use from api
  const ipAdress = data?.ip || "ip adress no found";
  const city = data?.location?.city || "location no found";
  const postalCode = data?.location?.postalCode || "postal code no found";
  const timeZone = data?.location?.timezone || "no found";
  const isp = data?.isp || "isp no found";

  //display content
  if (divIp) divIp.textContent = ipAdress;
  if (divLocation) divLocation.textContent = `${city}, ${postalCode}`;
  if (divTime) divTime.textContent = `UTC ${timeZone}`;
  if (divIsp) divIsp.textContent = isp;
}

export {displayData}