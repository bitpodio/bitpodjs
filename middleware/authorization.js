import userUtils from '~/utility/userApps'
import { appList } from '~/config/apps/list'
import { intersection } from '~/utility/object.js'

const isValidPage = (store, route) => {
  console.log('route.params.app in isValidPage', route.params.app)
  if (!route.params.app) {
    return true
  }
  const userCurrentOrg = userUtils.userCurrentOrgInfo(store) || {}
  console.log('userCurrentOrg in isValidPage', userCurrentOrg)
  const userRoles = userCurrentOrg.roles || []
  console.log('userRoles in isValidPage', userRoles)
  if (
    userRoles.includes('$orgowner') &&
    userCurrentOrg &&
    userCurrentOrg.id === 1
  ) {
    return true
  }
  const currentRouteApp =
    appList(store).find(({ name }) => name === route.params.app) || {}
  console.log('currentRouteApp in isValidPage', currentRouteApp)
  const currentRouteAppRoles = currentRouteApp.roles || []
  console.log('currentRouteAppRoles in isValidPage', currentRouteAppRoles)
  const isAuthorizedApp =
    intersection(currentRouteAppRoles, userRoles).length > 0
  console.log('isAuthorizedApp in isValidPage', isAuthorizedApp)
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

  if (getUsersOrg(store)?.name) {
    const userOrgStore = getUsersOrg(store)
    if (userOrgStore && userOrgStore.name) {
      if (process.server) {
        const { req } = context
        const hostName = req.headers.host
        const publicDomain = process.env.PUBLIC_DOMAIN
        if (hostName === publicDomain) {
          const userFirstOrgName = getUsersOrg(store).name || ''
          const basePath = process.env.PUBLIC_PATH || ''
          return redirect(
            `https://${publicDomain}${basePath}/forwardLogin?targetDomain=${userFirstOrgName}`
          )
        }
      }
      if (!isValidPage(store, route)) {
        console.log('store in isValidPage', store)
        console.log('route in isValidPage', route)
        return redirect('/unauthorized')
      }
    }
  }
}
