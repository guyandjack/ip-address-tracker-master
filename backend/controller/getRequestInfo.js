
//librairie import
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });


//function import
const handleAxiosError = require("../function/handleAxiosError");
const { apiListErrors, mockUpApi } = require("../data/apiListError");




async function getRequestInfo(req, res) {
  try {
    //get ip user
    const ipClient = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (req.body.data === "8.8.8.8" || req.body.data === "z.z.z.z") {
      req.body.data = ipClient
    }
    const type = req.body.type;
    const data = req.body.data;
    const key = process.env.IPFY_API_KEY;

    console.log("data ip for request:", data);

    const urlApi =
      type === "ip"
        ? `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${data}`
        : `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&domain=${data}`;

    const response = await axios.get(urlApi, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

      res.status(200).json({
      status: 200,
      statusText: "success",
      message: "",
      data: response.data,
    }); 
  } catch (e) {
    const errorMessage = handleAxiosError(e);
    console.log("error message in getRequestInfo: ", errorMessage);

    let errorFounded = {
      status: null,
      statusText: "",
      message: "",
    };

    for (let i = 0; i < apiListErrors.length; i++) {
      const listedError = apiListErrors[i];
      const is5xxMatch =
        typeof listedError.status === "string" &&
        listedError.status === "5XX" &&
        errorMessage.status >= 500;

      if (listedError.status === errorMessage.status || is5xxMatch) {
        errorFounded = {
          status: listedError.status,
          statusText: listedError.statusText,
          message: listedError.message,
        };
        break;
      }
    }

    if (!errorFounded.status) {
      errorFounded.status = errorMessage.status || 500;
      errorFounded.statusText = "Unknown Error";
      errorFounded.message = errorMessage.message || "Unexpected error";
    }

    
    if (!res.headersSent) {
      console.log("error object sended: ", errorFounded)
      res.status(errorFounded.status).json(errorFounded);
    }
  }
}

module.exports = getRequestInfo;
