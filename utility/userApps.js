import { _get } from '~/utility/object.js'

const userCurrentOrgInfo = (store) => {
  console.log('In userApps.js ',JSON.stringify(store.state))
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

const userUtils = {
  userCurrentOrgInfo,
}

export default userUtils
