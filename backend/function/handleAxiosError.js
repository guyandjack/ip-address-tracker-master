const axios = require("axios");

function handleAxiosError(error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(
        "Error HTTP :",
        error.response.status,
        error.response.statusText
      );
      //Return http error
      return {
        errorID: 1,
        status: error.response.status,
        message: error.response.statusText,
      };
    } else if (error.request) {
      // Aucune réponse (timeout, offline)
      console.error(" No server response :", error.request);
      return {
        errorID: 2,
        status: error.code,
        message: error.message
      }
    } else {
      // Erreur autre (mauvaise URL, etc.)
      console.error("Error Axios :", error.message);
      return {
        errorID: 3,
        status: error.code,
        message: error.message
      }
    }
  } else {
    // Erreur non Axios (ex: bug JS)
    console.error("Unknow error :", error);
    return {
      errorID: 5,
      status: error.code || 555,
      message: error.message || "Unknow error"
    };
  }
}

module.exports = handleAxiosError;
