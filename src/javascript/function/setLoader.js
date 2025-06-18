/**
 * Display or hide Loader
 *
 * @param {boolean} arg if true display loader / if false hide loader
 * @param {number} time display time of loader in second for UX (no flash loader if fast fetch)
 */
function setLoader(arg, time = 0.5) {
  const loaderDiv = document.querySelector(".loader");
  

  if (!loaderDiv) {
    console.log("impossible to set loader");
    return;
  }

  if (arg) {
    loaderDiv.classList.remove("hide");
    
    return;
  } else {
    setTimeout(() => {
      loaderDiv.classList.add("hide");
      
    }, time * 1000);
  }
}


export {setLoader}