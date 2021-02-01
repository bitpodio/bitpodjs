import userUtils from '~/utility/userApps'
import { appList } from '~/config/apps/list'
import { intersection } from '~/utility/object.js'

const isValidPage = (store, route) => {
  if (!route.params.app) {
    return true
  }
  const userCurrentOrg = userUtils.userCurrentOrgInfo(store) || {}
  const userRoles = userCurrentOrg.roles || []
  if (
    userRoles.includes('$orgowner') &&
    userCurrentOrg &&
    userCurrentOrg.id === 1
  ) {
    return true
  }
  const currentRouteApp =
    appList(store).find(({ name }) => name === route.params.app) || {}
  const currentRouteAppRoles = currentRouteApp.roles || []
  const isAuthorizedApp =
    intersection(currentRouteAppRoles, userRoles).length > 0
  return isAuthorizedApp
}

const getUsersOrg = (store) => {
  const orgList = store.state.auth.user
    ? store.state.auth.user.data.orgList
    : []
  return orgList[0] || {}
}

export default function (context) {
  const { store, route, redirect } = context
  const userOrgStore = getUsersOrg(store)
  if (userOrgStore && userOrgStore.name) {
    const userOrgStore = getUsersOrg(store)
    if (userOrgStore && userOrgStore.name) {
      if (process.server) {
        isLoggedIn = store.state.auth.loggedIn
        console.log('inside if and is server===>')
        console.log('isLoggedIn===>',isLoggedIn)
        const { req } = context
        const hostName = req.headers.host
        const publicDomain = process.env.PUBLIC_DOMAIN
        if (hostName === publicDomain || isLoggedIn) {
          const userFirstOrgName = userOrgStore.name || ''
          const basePath = process.env.PUBLIC_PATH || ''
          return redirect(
            `https://${publicDomain}${basePath}/forwardLogin?targetDomain=${userFirstOrgName}`
          )
        }
      }
      if (!isValidPage(store, route)) {
        return redirect('/unauthorized')
      }
    }
  }
}
