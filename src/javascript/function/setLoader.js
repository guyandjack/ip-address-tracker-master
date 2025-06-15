/**
 * Display or hide Loader
 *
 * @param {boolean} arg if true display loader / if false hide loader
 * @param {number} time display time of loader in second for UX (no flash loader if fast fetch)
 */
function setLoader(arg, time = 0.5) {
  const loaderDiv = document.querySelector(".loader");
  const inputDiv = document.querySelector(".input");

  if (!loaderDiv || !inputDiv) {
    console.log("impossible to set loader");
    return;
  }

  if (arg) {
    loaderDiv.classList.remove("hide");
    inputDiv.setAttribute("readonly", "true");
    return;
  } else {
    setTimeout(() => {
      loaderDiv.classList.add("hide");
      inputDiv.removeAttribute("readonly");
    }, time * 1000);
  }
}


export {setLoader}