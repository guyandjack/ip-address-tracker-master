//function import
import { setLoader } from "./setLoader";
import { displayData } from "./displayData";
import { showError } from "./showError";
import {localOrProd} from "./localOrProd"

//data import
import { defaultData } from "../../data/data";





/**
 * Request user for API
 *
 * @param {object} data Object for API
 */
async function fetchApi(data) {
  try {
    setLoader(true);

    const urlApi = localOrProd();

    const response = await fetch(`${urlApi}/requestinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.statusText === "success") {
      setLoader(false);
      displayData(result.data);
      return result.data
    } else {
      setLoader(false, 1);
      displayData(defaultData);
      showError(".toast", 5, result.statusText);
      
      return defaultData
    }
  } catch (error) {
    console.log("Error request API: ", error);
    setLoader(false, 1);
    displayData(defaultData);
    console.log("Error append: ", error.message)
    return defaultData;
  }
}

export {fetchApi}
