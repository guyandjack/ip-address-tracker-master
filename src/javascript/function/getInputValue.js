/**
 * Returns the value of a `<input>` element selected by a CSS selector.
 *
 * @param {string} selector - The CSS selector of the element to be targeted.
 * @returns {string | null} The value of the element or `null` if not found.
 */
function getInputValue(selector) {
  const el = document.querySelector(selector);
  return el ? el.value : null;
}

export {getInputValue}