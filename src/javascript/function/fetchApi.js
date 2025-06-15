//function import
import { setLoader } from "./setLoader";
import { displayData } from "./displayData";
import { showError } from "./showError";

//data import
import { defaultData } from "../../data/data";

//icon
const emoj = "😟";



/**
 * Request user for API
 *
 * @param {object} data Object for API
 */
async function fetchApi(data) {
  try {
    setLoader(true);

    const response = await fetch("http://localhost:4000/requestinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.status === "success") {
      setLoader(false);
      displayData(result.data);
      return result.data
    } else {
      setLoader(false, 1);
      displayData(defaultData);
      console.log("Error_message: ", result);
      const errorMessage =
        result.Error_message === "nocredit"
          ? `${emoj} Crédit Balance null !`
          : "Error 500";
      showError(".toast", 5, errorMessage);
    }
    return defaultData
  } catch (error) {
    console.log("Error request API: ", error);

    setLoader(false, 1);
    displayData(defaultData);
    return defaultData;
  }
}

export {fetchApi}
