import { _get } from '~/utility/object.js'

const userCurrentOrgInfo = (store) => {
  const currentOrg = store.state.currentOrg
  const orgList = store.state.auth.user
    ? store.state.auth.user.data.orgList
    : []
  console.log('currentOrg in userApps.js', currentOrg)
  console.log('orgList in userApps.js', orgList)
  const currentDetails =
    Array.isArray(orgList) &&
    orgList.filter((org) => {
      return org.name === currentOrg.name
    })
  console.log('currentDetails in userApps.js', currentDetails)
  const userOrgInfo = _get(currentDetails, '0')
  console.log('userOrgInfo in userApps.js', userOrgInfo)
  return userOrgInfo || {}
}

const userUtils = {
  userCurrentOrgInfo,
}

export default userUtils
