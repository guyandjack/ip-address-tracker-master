const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const handleAxiosError = require("./handleAxiosError");


async function fetchGeoApi(req) {
  try {
    // Maybe we're neighbors
    if (req.body.data === "z.z.z.z") {
      const home = {
        ip: "z.z.z.z",
        location: {
          country: "CH",
          region: "Valais",
          city: "Crans-Montana",
          lat: 37.40599,
          lng: -122.078514,
          postalCode: "3963",
          timezone: "+02:00",
          
        },
      };
    }

    //get ip client
    const ipClient = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const type = req.body.type;
    //const data = req.body.data === "8.8.8.8" ? ipClient : req.body.data;
    const data = req.body.data;
    const key = process.env.IPFY_API_KEY;

    const urlApi =
      type === "ip"
        ? `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${data}`
        : `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&domain=${data}`;

    const response = await axios.get(`${urlApi}`, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (e) {
    const errorMessage = handleAxiosError(e);
    console.log("erreur call api: ", errorMessage);
    const regex = /^.*(forbidden).*$/i;
    
        return {
          status: "error",
          message: regex.test(errorMessage)? "nocredit": "Error 500",
        };
       
    }
    
}

module.exports = fetchGeoApi