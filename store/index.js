import nuxtconfig from '../nuxt.config'
export const actions = {
  async nuxtServerInit({ commit }, context) {
    const origin = getApiUrl(
      context.req.headers.host,
      context.req,
      context.$config
    )
    const apiEndpoint = nuxtconfig.axios.apiEndpoint

    console.log('token', context.app.$cookies.get('auth._token.google'))
    const token = context.app.$cookies.get('auth._token.google')
    const headers = {
      authorization: token,
    }
    try {
      const orgPromise = context.$axios.get(
        `${origin}${apiEndpoint}Organizations/this`,
        headers
      )
      const orgInfoPromise = context.$axios.get(
        `${origin}${apiEndpoint}OrganizationInfos`
      )
      console.log('orgPromise', orgPromise)
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
    console.log(
      ' Json state.config in numutation in setCurrentOrg',
      JSON.stringify(state)
    )
    console.log(
      ' Json payload.config in numutation in setCurrentOrg',
      JSON.stringify(payload)
    )
    console.log(' state in numutation in setCurrentOrg', state)
    // console.log(
    //   ' state.currentOrg.config.headers in numutation in setCurrentOrg',
    //   state.currentOrg.config.headers
    // )
    // console.log(
    //   ' state.config.headers in numutation in setCurrentOrg',
    //   state.config.headers
    // )
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
  console.log('host', host)
  console.log('protocol', req.protocol)
  return 'https://event.test.bitpod.io'
}
