import { userCurrentOrgInfo } from '~/utility/userApps'
import { appList } from '~/config/apps/list'
import { intersection } from '~/utility/object.js'

const isValidPage = (store, route) => {
  if (!route.params.app) {
    return true
  }
  const userCurrentOrg = userCurrentOrgInfo(store) || {}
  const userRoles = userCurrentOrg.roles || []
  if (
    userRoles.includes('$orgowner') &&
    userCurrentOrg &&
    userCurrentOrg.id === 1
  ) {
    return true
  }
  const currentRouteApp =
    appList.find(({ name }) => name === route.params.app) || {}
  const currentRouteAppRoles = currentRouteApp.roles || []
  const isAuthorizedApp =
    intersection(currentRouteAppRoles, userRoles).length > 0
  return isAuthorizedApp
}

export default function ({ store, route, redirect }) {
  // If the user is not authorized
  if (!isValidPage(store, route)) {
    return redirect('/unauthorized')
  }
}
