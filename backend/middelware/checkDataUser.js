
/**
 * check validity of user data
 *
 * @param {*} dataUser object
 * @return {*} boolean
 */
function checkDataUser(req, res, next) {
  
  const dataUser = req.body;

  const pattern_ipV4 =
    /^(25[0-5]|2[0-4]\d|1?\d{1,2})(\.(25[0-5]|2[0-4]\d|1?\d{1,2})){3}$/g;

  const pattern_domain = /^(www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,}$/g;

  const pattern_type = /^(ip|domain)$/g;

  const pattern_neighbor = /^z\.z\.z\.z$/;

  if (
    (
      pattern_ipV4.test(dataUser.data) ||
      pattern_domain.test(dataUser.data) ||
      pattern_neighbor.test(dataUser.data)) &&
    pattern_type.test(dataUser.type) &&
    dataUser.isValid
  ) {
    next();
  } else {
    console.log("user data no valid in middelware");
    res.status(400).json({
      status: 400,
      statusText: "User data no valid",
      message: "",
    });
  }
  
}

module.exports = checkDataUser
