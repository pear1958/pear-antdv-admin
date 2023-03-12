export function isDef(val) {
  return typeof val !== 'undefined'
}

export function isUnDef(val) {
  return !isDef(val)
}

export function isFunction(val) {
  return typeof val === 'function'
}
