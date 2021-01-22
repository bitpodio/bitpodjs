import nuxtconfig from '../nuxt.config'
export const actions = {
  async nuxtServerInit({ commit }, context) {
    let postLogoutUrl = ''
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
        console.log('===>11', context.req)
        postLogoutUrl = `http://${context.req.headers.host}/`
        console.log('===>1', postLogoutUrl)
        context.app.$cookies.set('domain_url', postLogoutUrl)
      } else {
        postLogoutUrl = `https://${currentOrgRes.data.name}-${context.req.headers.host}/${this.$router.options.base}/`
        console.log('===>1', postLogoutUrl)
        context.app.$cookies.set('domain_url', postLogoutUrl)
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
