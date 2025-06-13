//functions import
import { checkDataUserInput } from "./function/checkDataUserInput.js";

//functions
function getInputValue(selector) {
  return document.querySelector(`${selector}`).value;
}

function showError() {
  const divError = document.querySelector("toast");
  divError.classList.remove("hide");
}

function displayData(data) {
    //dom element
    const divIp = document.querrySelector("#item-ip");
    const divLocation = document.querrySelector("#item-location");
    const divTime = document.querrySelector("#item-time");
    const divIsp = document.querrySelector("#item-isp");

    //data to use from api
    const ipAdress = data.ip;
    const city = data.location.city;
    const postalCode = data.location.postalCode;
    const timeZone = data.location.timezone;
    const isp = data.isp;

    //display
    divIp.textContent = ipAdress;
    divLocation.textContent = `${city}, ${postalCode}`;
    divTime.textContent = `UTC-${timeZone}`;
    divIsp.textContent = isp;
    
}

async function fetchApi(data) {
  try {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Statuts HTTP 4xx/5xx
      throw new Error(`Erreur HTTP ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    displayData(result);
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error.message);
  }
}


//get input value
const arrowButton = document.querySelector(".container-svg");
arrowButton.addEventListener("click", () => {
  let value = getInputValue("#ip");
  let result = checkDataUserInput(value);
  if (!result.isValid) {
    showError();
    return;
  }

  fetchApi(result);
});
