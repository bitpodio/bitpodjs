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
  console.debug('authorization1')
  const userOrgStore = getUsersOrg(store)
  console.debug('userOrgStore2', userOrgStore)
  if (userOrgStore && userOrgStore.name) {
    console.debug('userOrgStore3', userOrgStore.name)
    if (process.server) {
      console.debug('userOrgStore4', process.server)
      const { req } = context
      console.debug('userOrgStore5', req)
      const hostName = req.headers.host
      console.debug('userOrgStore6', hostName)
      const publicDomain = process.env.PUBLIC_DOMAIN
      console.debug('userOrgStore7', publicDomain)
      if (!hostName.includes('localhost')) {
        console.debug('userOrgStore7 does not include hostname')
        if (hostName === publicDomain) {
          console.debug('both are same')
          const userFirstOrgName = userOrgStore.name || ''
          console.debug('userorgstore8', userFirstOrgName)
          const basePath = process.env.PUBLIC_PATH || ''
          console.debug('userorgstore8', basePath)
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
    console.debug('unauthorized')
    return redirect('/unauthorized')
  }
}
