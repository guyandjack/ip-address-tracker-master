function getClientIp(req) {
  const xForwardedFor = req.headers["x-forwarded-for"] || null;
  const socketIp = req.socket?.remoteAddress || null;
  const pattern_ipV4 = /^(25[0-5]|2[0-4]\d|1?\d{1,2})(\.(25[0-5]|2[0-4]\d|1?\d{1,2})){3}$/g;
  const pattern_ipLocal = /^::1$/g;
    console.log("ip client xfor: ", xForwardedFor);
    console.log("ip client socket: ", socketIp);
    console.log("ip client data: ", req.body.data);

  

   if (xForwardedFor) {
    // x-forwarded-for can contain many "IP" ;
    const ipList = xForwardedFor.split(",").map((ip) => ip.replace(/^::ffff:/, "").trim());
    const clientIp = ipList.pop();

     if (pattern_ipV4.test(clientIp)  ) {
      return clientIp;
    } else {
         return null
    }
  }
  // Supprime préfixe IPv6 "::ffff:" si présent (pour IPv4 mappée)
  else if (socketIp) {
      let cleanedIp = socketIp.replace(/^::ffff:/, "");
      if (pattern_ipV4.test(cleanedIp) || pattern_ipLocal.test(cleanedIp)) {
          return cleanedIp
      }
      else {
          return null
      }
    }
  else {
      return null
    }
}


module.exports = getClientIp;
