
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

  if (
    (pattern_ipV4.test(dataUser.data) || pattern_domain.test(dataUser.data)) &&
    pattern_type.test(dataUser.type) &&
    dataUser.isValid
  ) {
    next()
  }
  else {
    
    res.status(400).json({"message":"User data unvalid!!"})
  }
  
}

module.exports = checkDataUser
