export const _set = (obj, path, value) => {
  if (Object(obj) !== obj) return obj // When obj is not an object
  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
  path.slice(0, -1).reduce(
    (
      a,
      c,
      i // Iterate all of them except the last one
    ) =>
      Object(a[c]) === a[c] // Does the key exist and is its value an object?
        ? // Yes: then follow that path
          a[c]
        : // No: create the key. Is the next key a potential array-index?
          (a[c] =
            Math.abs(path[i + 1]) >> 0 === +path[i + 1]
              ? [] // Yes: assign a new array object
              : {}), // No: assign a new plain object
    obj
  )[path[path.length - 1]] = value // Finally assign the value to the last key
  return obj // Return the top-level object to allow chaining
}

export function _get(object, path, defval = null) {
  if (typeof path === 'string') path = path.split('.')
  return path.reduce((xs, x) => (xs && xs[x] ? xs[x] : defval), object)
}

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function isPlainObject(o) {
  if (isObject(o) === false) return false

  // If has modified constructor
  const ctor = o.constructor
  if (ctor === undefined) return true

  // If has modified prototype
  const prot = ctor.prototype
  if (isObject(prot) === false) return false

  // If constructor does not have an Object-specific method
  if (Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf') === false) {
    return false
  }

  // Most likely a plain Object
  return true
}

export function _isUndefined(value) {
  return value === undefined
}

export function _isNull(value) {
  return value === null
}

export function debounce(fn, delay) {
  let timeoutID = null
  return () => {
    clearTimeout(timeoutID)
    const args = arguments
    const that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}

export const intersection = (arrA, arrB) => arrA.filter((x) => arrB.includes(x))
