import authenticationPopups from 'authentication-popups'

const POPUP_DIMENSIONS = { width: 400, height: 640 }

export const openAuthPopups = (options, callback) => {
  debugger
  const path = `/oauth/index.html?${queryParams(options)}`
  authenticationPopups(path, POPUP_DIMENSIONS)
  window.authAgent.removeAllListeners('suspend')
  window.authAgent.once('suspend', function (event) {
    if (typeof callback === 'function') {
      callback(event)
    }
  })
}

function queryParams(source) {
  const array = []
  for (const key in source) {
    array.push(encodeURIComponent(key) + '=' + encodeURIComponent(source[key]))
  }
  return array.join('&')
}
