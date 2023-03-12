export function on(element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

export function off(element, event, handler) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}
