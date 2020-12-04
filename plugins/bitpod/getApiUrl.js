import nuxtconfig from '~/nuxt.config'
export function getCurrentOrigin(context) {
  let currentOrigin = ''
  if (
    typeof window === 'undefined' ||
    window.location.origin.includes('localhost')
  ) {
    currentOrigin = `https://${context.$config.axios.backendBaseUrl}`
  } else {
    currentOrigin = `${window.location.origin}`
  }
  return currentOrigin
}

export default function getApiUrl(context) {
  const currentOrigin = getCurrentOrigin(context)
  return `${currentOrigin}${nuxtconfig.axios.apiEndpoint}`
}
