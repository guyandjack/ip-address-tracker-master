const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const handleAxiosError = require("./handleAxiosError");


async function fetchGeoApi(req) {
    try {
    const type = req.body.type;
    const data = req.body.data;
    const key = process.env.IPFY_API_KEY;

    const urlApi =
      type === "ip"
        ? `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${data}`
          : `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&domain=${data}`;
      
    
        const response = await axios.get(
          `${urlApi}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        );

        return {
            status: "success",
            data: response.data
       }
        
    } catch (e) {
        handleAxiosError(e);
        return {
          status: "error",
          message: e,
        };
       
    }
    
}

module.exports = fetchGeoApi