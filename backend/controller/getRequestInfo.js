const fetchGeoApi = require("../function/fetchGeoApi");

async function getRequestInfo(req, res) {
const response = await fetchGeoApi(req);
    if (response.status !== "success") {
        res.status(400).json({
            "status": response.status,
            "Error_message": response.message
        })
      return
    } 
 
  res.status(200).json({
    status: response.status,
    data: response.data,
  });
}

module.exports = getRequestInfo;
