import userUtils from '~/utility/userApps'
import { appList } from '~/config/apps/list'
import { intersection } from '~/utility/object.js'

const isValidPage = (store, route) => {
  if (!route.params.app) {
    return true
  }
  const userCurrentOrg = userUtils.userCurrentOrgInfo(store) || {}
  const userRoles = userCurrentOrg.roles || []
  console.log('In isValidPage ', userCurrentOrg)
  if (
    userRoles.includes('$orgowner') &&
    userCurrentOrg &&
    userCurrentOrg.id === 1
  ) {
    return true
  }
  const currentRouteApp =
    appList(store).find(({ name }) => {
      console.log('app name match', name, route.params.app)
      return name === route.params.app
    }) || {}
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
  const { store, route, redirect, $auth } = context

  if (getUsersOrg(store)?.name) {
    if (process.server) {
      const { req } = context
      const hostName = req.headers.host
      const publicDomain = process.env.PUBLIC_DOMAIN
      console.log('Inside request initiation - server',JSON.stringify(req.headers), publicDomain)
      if (hostName === publicDomain) {
        const provider = $auth.strategy.name
        const userFirstOrgName = getUsersOrg(store).name || ''
        const basePath = process.env.PUBLIC_PATH || ''
        return redirect(
          `http://${userFirstOrgName}-${publicDomain}${basePath}/login?p=${provider}`
        )
      }
    }
    if (!isValidPage(store, route)) {
      return redirect('/unauthorized')
    }
  }
}
