import nuxtconfig from '../nuxt.config'
export const actions = {
  async nuxtServerInit({ commit }, context) {
    const origin = getApiUrl(
      context.req.headers.host,
      context.req,
      context.$config
    )
    const apiEndpoint = nuxtconfig.axios.apiEndpoint
    try {
      const orgPromise = context.$axios.get(
        `${origin}${apiEndpoint}Organizations/this`
      )
      const orgInfoPromise = context.$axios.get(
        `${origin}${apiEndpoint}OrganizationInfos`
      )
      const [currentOrgRes, currentOrgInfoRes] = await Promise.all([
        orgPromise,
        orgInfoPromise,
      ])
      const currentOrgInfo = currentOrgInfoRes.data
      commit('setCurrentOrg', currentOrgRes.data)
      commit('setCurrentOrgInfo', currentOrgInfo && currentOrgInfo[0])
      console.log('currentOrgRes.data.name', currentOrgRes.data.name)
      if (context && context.req.headers.host.includes('localhost')) {
        console.log('its in localhost entered once')
        console.log('===>11', context.req)
        const postLogoutUrl = `http://${context.req.headers.host}/`
        console.log('===>1', postLogoutUrl)
        context.app.$cookies.set('auth.domain_url', postLogoutUrl)
      } else {
        console.log('its not localhost entered once')
        const logoutRedirect = context.app.$cookies.get('auth.domain_url')
        console.log('getting logoutRedirectUri', logoutRedirect)
        context.app.$cookies.remove('auth.domain_url')
        const logoutRedirect1 = context.app.$cookies.get('auth.domain_url')
        console.log('getting logoutRedirectUri after removed', logoutRedirect1)
        const postLogoutUrl = `https://${currentOrgRes.data.name}-${context.req.headers.host}${this.$router.options.base}`
        console.log('===>222', postLogoutUrl)
        context.app.$cookies.set('auth.domain_url', postLogoutUrl)
        const logoutRedirectUri = context.app.$cookies.get('auth.domain_url')
        console.log('after setting cookie', logoutRedirectUri)
        // if (logoutRedirectUri) {
        //   console.log(' included so not setting', logoutRedirectUri)
        //   return
        // } else {
        //   console.log(' included in else  setting', logoutRedirectUri)
        //   context.app.$cookies.remove('auth.domain_url')
        //   const postLogoutUrl = `https://${currentOrgRes.data.name}-${context.req.headers.host}${this.$router.options.base}`
        //   console.log('===>222', postLogoutUrl)
        //   context.app.$cookies.set('auth.domain_url', postLogoutUrl)
        // }
      }
    } catch (err) {
      commit('setCurrentOrg', err)
    }
  },
}

export const state = () => ({
  currentOrg: [],
  currentOrgInfo: {},
  exportInProgress: { value: false, key: '' },
  scrollPosition: '',
})

export const mutations = {
  setCurrentOrg(state, payload) {
    state.currentOrg = payload
  },
  setCurrentOrgInfo(state, payload) {
    state.currentOrgInfo = payload
  },
  setExportInProgress(state, status) {
    state.exportInProgress = status
  },
  setScrollPosition(state, value) {
    state.scrollPosition = value
  },
}

function getApiUrl(host, req, config) {
  if (host && host.includes('localhost')) {
    return `https://${config.axios.backendBaseUrl}`
  }
  const protocol = req.protocol
  return `${protocol}://${host}`
}
