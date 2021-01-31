// import nuxtconfig from '../nuxt.config'
export const actions = {
  // async nuxtServerInit({ commit }, context) {
  //   const origin = getApiUrl(
  //     context.req.headers.host,
  //     context.req,
  //     context.$config
  //   )
  //   const apiEndpoint = nuxtconfig.axios.apiEndpoint
  //   try {
  //     const orgPromise = context.$axios.get(
  //       `${origin}${apiEndpoint}Organizations/this`
  //     )
  //     const orgInfoPromise = context.$axios.get(
  //       `${origin}${apiEndpoint}OrganizationInfos`
  //     )
  //     const [currentOrgRes, currentOrgInfoRes] = await Promise.all([
  //       orgPromise,
  //       orgInfoPromise,
  //     ])
  //     const currentOrgInfo = currentOrgInfoRes.data
  //     commit('setCurrentOrg', currentOrgRes.data)
  //     commit('setCurrentOrgInfo', currentOrgInfo && currentOrgInfo[0])
  //     if (context && context.req.headers.host.includes('localhost')) {
  //       const postLogoutUrl = `http://${context.req.headers.host}/`
  //       context.app.$cookies.set('auth.domain_url', postLogoutUrl)
  //     } else {
  //       const postLogoutUrl = `https://${context.req.headers.host}${this.$router.options.base}`
  //       context.app.$cookies.set('auth.domain_url', postLogoutUrl)
  //     }
  //   } catch (err) {
  //     commit('setCurrentOrg', err)
  //   }
  // },
  async nuxtServerInit({ commit, dispatch }, context) {
    console.log('dispatching from the serverInit')
    await dispatch('storeOrganizationInfo')
    console.log('dispatched from the storeOrganizationInfo')
    console.log('dispatching for the storeCurrentOrg')
    await dispatch('storeCurrentOrg')
    console.log('dispatched from the storeCurrentOrg')
  },

  async storeOrganizationInfo({ commit }, context) {
    const origin = 'http://bitpod-event.test.bitpod.io/svc/api/'
    const res = await this.$axios.get(`${origin}OrganizationInfos`)
    console.log('response from Orginfo', res.data[0])
    commit('setCurrentOrgInfo', res.data[0])
  },
  async storeCurrentOrg({ commit }, context) {
    const origin = 'http://bitpod-event.test.bitpod.io/svc/api/'
    const res = await this.$axios.get(`${origin}Organizations/this`)
    console.log('response from currentOrg', res.data)
    commit('setCurrentOrg', res.data)
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
    console.log('payload in setCurrentOrg', payload)
    state.currentOrg = payload
    console.log('success payload in setCurrentOrg')
  },
  setCurrentOrgInfo(state, payload) {
    console.log('payload in setCurrentOrgInfo', payload)
    state.currentOrgInfo = payload
    console.log('success payload in setCurrentOrg')
  },
  setExportInProgress(state, status) {
    state.exportInProgress = status
  },
  setScrollPosition(state, value) {
    state.scrollPosition = value
  },
}

// function getApiUrl(host, req, config) {
//   if (host && host.includes('localhost')) {
//     return `https://${config.axios.backendBaseUrl}`
//   }
//   // const protocol = req.protocol
//   return `https://${host}`
// }
