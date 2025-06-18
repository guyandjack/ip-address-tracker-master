/**
 *
 *
 * @param {boolean} state true add disabled attribut
 * @param {array} selectorCSS for reach dom element
 */
function enableOrDisableElement(state, selectorsCSS, time = 0.5) {
  if (
    !Array.isArray(selectorsCSS) ||
    selectorsCSS.length === 0 ||
    typeof state !== "boolean"
  ) {
    return;
  }

  selectorsCSS.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      if (state) {
        element.disabled = state;
      } else {
        setTimeout(() => {
          element.disabled = state;
        }, time * 1000);
      }
      return;
    }
  });
}

export { enableOrDisableElement };
