import nuxtconfig from '../nuxt.config'
export const actions = {
  async nuxtServerInit({ commit }, context) {
    const origin = getApiUrl(
      context.req.headers.host,
      context.req,
      context.$config
    )
    const apiEndpoint = nuxtconfig.axios.apiEndpoint
    console.log('coookiesAll', context.app.$cookies.getAll())
    console.log('coookies', context.app.$cookies)
    console.log('token', context.app.$cookies.get('auth.id_token'))
    const token =
      context.app.$cookies.get('auth.id_token') ||
      'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTkyODM5MDk1MC1wbXU0bDczZnU2bXBjaW0yZ2RuZXJxZjYyazZvcHBxdC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ5OTI4MzkwOTUwLXBtdTRsNzNmdTZtcGNpbTJnZG5lcnFmNjJrNm9wcHF0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzNzUxMjU1NTM0NDczOTE0NTE4IiwiaGQiOiJiaXRwb2QuaW8iLCJlbWFpbCI6ImFtYXJ0eWFrdW1hckBiaXRwb2QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlV0bzBsR0tRWk0wOUNLb3dzRE5HZWciLCJuYW1lIjoiQW1hcnR5YWt1bWFyIFJveSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLThhRUJZQkNZNXQwL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2w0cnF4eXNSYXpiTWZkT2t0cEhETHQxYV91NkEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFtYXJ0eWFrdW1hciIsImZhbWlseV9uYW1lIjoiUm95IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTE5MjAxOTEsImV4cCI6MTYxMTkyMzc5MX0.WYe9DhJCs6-n4bVIQaNB0ZHKH04nlrfsCBDtLu3dGKGWQ0vpVRrmKZLyvwarJpOMeOt3_Xe6uDTopPGZSjh6c_8xWP4T0-4WP9eb_EJGEO6cfZg2s0bXV-R0e1Ek9hyhjpoYd3pXAgcE3vZt8Sp5n2cfjTIrskKFsVOEVpAt5MPrbotbBxpd9f4np_7LABCqFJAuCLI6PDwAA71XTZUjH-HZJUyqvElcWwOoT50u-lomeY67Zib-Ko9qkMozcY3lxWjlHiVaVCrcPIOJlad2R9mPVxrZhEWUMGvQJ7WP27uqOyHTYFR8YeENPEASuypnSRwo_X9n_VUR36yAilvHEg'
    const headers = {
      authorization: token,
    }
    try {
      const orgPromise = context.$axios.get(
        `${origin}${apiEndpoint}Organizations/this`,
        {
          headers
        }
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
  console.log('request', req)
  console.log('host', host)
  console.log('protocol', req.protocol)
  return `https://event.test.bitpod.io`
  // return 'https://event.test.bitpod.io'
}
