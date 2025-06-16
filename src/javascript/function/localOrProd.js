
/**
 *  Select the url for call API selction depending on the environment
 *
 * @return {string}  Url for call API
 */
function localOrProd() {
  const mode = import.meta.env.MODE; // 'development' ou 'production'
  const urlDev = import.meta.env.VITE_URL_API_DEV || null;
  const urlProd = import.meta.env.VITE_URL_API_PROD || null;

  if (!urlDev || !urlProd) {
    console.warn("no environement variable ");
    return null;
  }

  if (mode === "development") {
    console.log("dev environment");
    return urlDev.toString();
  } else {
    console.log("prod environement.");
    return urlProd.toString();
  }
}

export { localOrProd };
