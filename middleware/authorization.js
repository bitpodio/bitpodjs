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
  console.log('inside the auth middleware')
  const { store, route, redirect } = context
  const userOrgStore = getUsersOrg(store)
  console.log('inside the auth middleware userOrgStore',userOrgStore.name)
  if (userOrgStore && userOrgStore.name) {
    if (process.server) {
      const { req } = context
      const hostName = req.headers.host
      console.log('inside the auth middleware hostName',hostName)
      const publicDomain = process.env.PUBLIC_DOMAIN
      console.log('inside the auth middleware publicDomain',publicDomain)
      if (!hostName.includes('localhost')) {
        if (hostName === publicDomain) {
          console.log('hostName and publicDomain are same')
          const userFirstOrgName = userOrgStore.name || ''
          console.log('userFirstOrgName ==>', userFirstOrgName)
          const basePath = process.env.PUBLIC_PATH || ''
          console.log('basePath ==>', basePath)
          console.log('redirecting to forward login')
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
    context.route.fullPath !== `/get-started` &&
    !context.req.headers.host.includes('localhost')
  ) {
    return redirect('/unauthorized')
  }
}
