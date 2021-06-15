import userUtils from '~/utility/userApps'
import { appList } from '~/config/apps/list'
import { intersection } from '~/utility/object.js'

const isValidPage = (store, route) => {
  if (!route.params.app) {
    return true
  }
  debugger
  const userCurrentOrg = userUtils.userCurrentOrgInfo(store) || {}
  console.log('userCurrentOrg', userCurrentOrg)
  const userRoles = userCurrentOrg.roles || []
  console.log('userRoles', userRoles)
  if (
    userRoles.includes('$orgowner') &&
    userCurrentOrg &&
    userCurrentOrg.id === 1
  ) {
    return true
  }
  const currentRouteApp =
    appList(store).find(({ name }) => name === route.params.app) || {}
  console.log('currentRouteApp', currentRouteApp)
  const currentRouteAppRoles = currentRouteApp.roles || []
  console.log('currentRouteAppRoles', currentRouteAppRoles)
  const isAuthorizedApp =
    intersection(currentRouteAppRoles, userRoles).length > 0
  console.log('isAuthorizedApp', isAuthorizedApp)
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
    if (process.server) {
      const { req } = context
      const hostName = req.headers.host
      const publicDomain = process.env.PUBLIC_DOMAIN
      if (!hostName.includes('localhost')) {
        if (hostName === publicDomain) {
          const userFirstOrgName = userOrgStore.name || ''
          const basePath = process.env.PUBLIC_PATH || ''
          return redirect(
            `https://${publicDomain}${basePath}/forwardLogin?targetDomain=${userFirstOrgName}`
          )
        }
      }
    }
    if (!isValidPage(store, route)) {
      return redirect('/unauthorized')
    }
    return
  }
  if (
    context.route.path !== `/get-started` &&
    !context.req.headers.host.includes('localhost')
  ) {
    return redirect('/unauthorized')
  }
}
