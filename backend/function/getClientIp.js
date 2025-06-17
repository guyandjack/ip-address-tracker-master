

function getClientIp(req) {
    const xForwardedFor = req.headers['x-forwarded-for'];
    const pattern_ipV4 =
      /^(25[0-5]|2[0-4]\d|1?\d{1,2})(\.(25[0-5]|2[0-4]\d|1?\d{1,2})){3}$/g;

    if (xForwardedFor) {
        // x-forwarded-for can contain many "IP" ;
        const ipList = xForwardedFor.split(',').map(ip => ip.trim());
        const clientIp = ipList[0];

        if (clientIp && pattern_ipV4.test(clientIp)) {
            return clientIp;
        }
        throw new Error("IP client non conforme a IpV4")
    }
    throw new Error("Aucune IP client detectée");
}

module.exports = getClientIp