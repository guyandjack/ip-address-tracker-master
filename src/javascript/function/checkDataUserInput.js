//import des librairies

/**
 * 
 * @param {*} data value of input 
 * @returns boolean
 */
function checkDataUserInput(data) {
    const dataString = data.toString();
    const pattern_ipV4 = /^(25[0-5]|2[0-4]\d|1?\d{1,2})(\.(25[0-5]|2[0-4]\d|1?\d{1,2})){3}$/g;
    //const pattern_ipV6 = /^[]$/g;
    const pattern_domain = /^(www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,}$/g;
    const pattern_neighbor = /^z\.z\.z\.z$/;
;
    if (pattern_ipV4.test(dataString)|| pattern_neighbor.test(dataString)) {

        return {
            data: dataString,
            type: "ip",
            isValid: true
        }
    }else if (pattern_domain.test(dataString)){
        return {
            data: dataString,
            type: "domain",
            isValid: true
        }
        
    }else {

        return {
            data: null,
            type: "undefined",
            isValid: false
        }
    }
}

export {checkDataUserInput}