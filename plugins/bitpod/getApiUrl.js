import nuxtconfig from '~/nuxt.config'
function getCurrentOrigin() {
  let currentOrigin = ''
  if (
    typeof window === 'undefined' ||
    window.location.origin.includes('localhost')
  ) {
    currentOrigin = `https://${nuxtconfig.axios.backendBaseUrl}`
  } else {
    currentOrigin = `${window.location.origin}`
  }
  return currentOrigin
}

export default function getApiUrl() {
  const currentOrigin = getCurrentOrigin()
  return `${currentOrigin}${nuxtconfig.axios.apiEndpoint}`
}
