import { _get } from '~/utility/object.js'
import nuxtconfig from '~/nuxt.config'

const userCurrentOrgInfo = (store) => {
  const currentOrg = store.state.currentOrg
  const orgList = store.state.auth.user
    ? store.state.auth.user.data.orgList
    : []
  const currentDetails =
    Array.isArray(orgList) &&
    orgList.filter((org) => {
      return org.name === currentOrg.name
    })
  const userOrgInfo = _get(currentDetails, '0')
  return userOrgInfo || {}
}

const getCurrentHostname = (req) => {
  const host = req.get('host')
  if (host && host.includes('localhost')) {
    return nuxtconfig.axios.backendBaseUrl
  }
  return host
}

const userUtils = {
  getCurrentHostname,
  userCurrentOrgInfo,
}

export default userUtils
