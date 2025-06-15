/**
 * Display a error message.
 *
 * @param {string} selector css selector
 * @param {number} time display time in second
 * @param {string} message message type
 */
function showError(selector, time, message) {
  const divError = document.querySelector(selector);
  divError.textContent = message;
  divError.classList.add("show");
  setTimeout(() => {
    divError.classList.remove("show");
  }, time * 1000);
}

export {showError}