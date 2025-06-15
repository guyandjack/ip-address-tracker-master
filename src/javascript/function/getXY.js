/**
 *
 *  get longitude and latitude
 * @param {object} data object data from API
 * @return {object} with latitude and longitude
 */
function getXY(data) {
  // Home default value
  return {
    lng: data?.location?.lng || "7.4763",
    lat: data?.location?.lat || "46.3072",
  };
}

export {getXY}