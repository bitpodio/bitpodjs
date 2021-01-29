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
      if (context && context.req.headers.host.includes('localhost')) {
        const postLogoutUrl = `http://${context.req.headers.host}/`
        context.app.$cookies.set('auth.domain_url', postLogoutUrl)
      } else {
        const postLogoutUrl = `https://${context.req.headers.host}${this.$router.options.base}`
        context.app.$cookies.set('auth.domain_url', postLogoutUrl)
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
    console.log('state in numutation in setCurrentOrg', state)
    console.log('payload in numutation in setCurrentOrg', payload)
    state.currentOrg = payload
  },
  setCurrentOrgInfo(state, payload) {
    console.log('state in numutation in setCurrentOrgInfo', state)
    console.log('payload in numutation in setCurrentOrgInfo', payload)
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
  // const protocol = req.protocol
  return 'https://event.test.bitpod.io'
}
