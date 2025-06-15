const axios = require("axios");

function handleAxiosError(error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Erreur côté serveur (ex: 401, 403, 500)
      console.error(
        "Error HTTP :",
        error.response.status,
        error.response.statusText
      );
      return `Error http: ${error.response.statusText}`;
    } else if (error.request) {
      // Aucune réponse (timeout, offline)
      console.error(" No server response :", error.request);
      return ` No server response: ${error.message}`;
    } else {
      // Erreur autre (mauvaise URL, etc.)
      console.error("Error Axios :", error.message);
      return `Error Axios : ${error.message}`;
    }
  } else {
    // Erreur non Axios (ex: bug JS)
    console.error("Unknow error :", error);
    return `Unknow error: ${error}`;
  }
}

module.exports = handleAxiosError 
