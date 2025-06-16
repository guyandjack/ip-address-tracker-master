//code error list from API
//icon
const emoj = "😟";

const apiListErrors = [
  {
    status: 400,
    statusText: "Bad Request",
    message:
      "Some required fields are missing from the request's body or have invalid values.",
  },
  {
    status: 401,
    statusText: "Unauthorized",
    message: "The required 'apiKey' field value is missing or invalid.",
  },
  {
    status: 403,
    statusText: `Forbidden, ${emoj} no more balance crédit`,
    message:
      "Access restricted. Check credits balance or enter the correct API key.",
  },
  {
    status: 422,
    statusText: "Unprocessable Entity",
    message: "Input correct request parameters or search term.",
  },
  {
    status: 429,
    statusText: "Too Many Requests",
    message: "Too Many Requests. Try your call again later.",
  },
  {
    status: 500,
    statusText: "Server Error",
    message: "Internal server error, please contact our support team.",
  },
];

const mockUpApi = {
  ip: "mockup API",
  location: {
    country: "FR",
    region: "Auvergne-Rhône-Alpes",
    city: "Saint-Maurice-en-Trièves",
    lat: 44.76458,
    lng: 5.66404,
    postalCode: "38930",
    timezone: "+02:00",
    geonameId: 2978138,
  },
  as: {
    asn: 53589,
    name: "PLANETHOSTER-8",
    route: "146.88.232.0/21",
    domain: "https://www.planethoster.com",
    type: "Content",
  },
  isp: "PlanetHoster",
};

module.exports = { apiListErrors, mockUpApi }