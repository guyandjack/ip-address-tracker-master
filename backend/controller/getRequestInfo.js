//librairie import
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

//function import
const handleAxiosError = require("../function/handleAxiosError");
const getClientIp = require("../function/getClientIp");

//data
const { apiListErrors, mockUpApi } = require("../data/apiListError");

async function getRequestInfo(req, res) {
  try {
    let ipClient = null;
    //get ip user for display data user place
    if (req.body.data === "8.8.8.8" || req.body.data === "z.z.z.z") {
      ipClient = getClientIp(req);
      if (!ipClient) {
        res
          .status(400)
          .json({ status: 450, statusText: "Invalid ip client", message: "" });
        return;
      }
    } else {
      ipClient = req.body.data;
    }
    const type = req.body.type;
    const data = ipClient === "::1" ? "8.8.8.8" : ipClient;
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
      if (apiListErrors[i].status === errorMessage.status) {
        errorFounded.status = apiListErrors[i].status;
        errorFounded.statusText = apiListErrors[i].statusText;
        errorFounded.message = apiListErrors[i].message;
        break
      }
    }

    if (!errorFounded.status) {
      errorFounded.status = errorMessage.status;
      errorFounded.statusText = "Unknown Error";
      errorFounded.message = errorMessage.message || "Unexpected error";
    }

    if (!res.headersSent) {
      console.log("error object sended: ", errorFounded);
      res.status(errorFounded.status).json(errorFounded);
    }
  }
}

module.exports = getRequestInfo;
