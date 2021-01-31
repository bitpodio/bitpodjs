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
  async storeCurrentOrg({ commit, req }, context) {
    // console.log('request in storeCurrentOrg', req)
    // console.log(
    //   'reques.header.cookie t in storeCurrentOrg',
    //   context.headers.cookie
    // )
    // const parsedCookie = cookieparser.parse(req.headers.cookie)
    // console.log('ParsedCookie', parsedCookie)
    const token =
      'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzYjJkMjJjMmZlY2Y4NzNlZDE5ZTViOGNmNzA0YWZiN2UyZWQ0YmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTkyODM5MDk1MC1wbXU0bDczZnU2bXBjaW0yZ2RuZXJxZjYyazZvcHBxdC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ5OTI4MzkwOTUwLXBtdTRsNzNmdTZtcGNpbTJnZG5lcnFmNjJrNm9wcHF0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzNzUxMjU1NTM0NDczOTE0NTE4IiwiaGQiOiJiaXRwb2QuaW8iLCJlbWFpbCI6ImFtYXJ0eWFrdW1hckBiaXRwb2QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlUyUGY0WWNBSDlQNTc4VE9FMmZ2SWciLCJuYW1lIjoiQW1hcnR5YWt1bWFyIFJveSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLThhRUJZQkNZNXQwL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2w0cnF4eXNSYXpiTWZkT2t0cEhETHQxYV91NkEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFtYXJ0eWFrdW1hciIsImZhbWlseV9uYW1lIjoiUm95IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTIxMDYwMTMsImV4cCI6MTYxMjEwOTYxM30.ml2TObOl3ihKfczRqHY6lcKHhWhyUXqRxLi5r6IGY3qjoNzcxd5myVh905Wz56f4as58PN2amlvuUacCQrN2ZOSdZ_q_r3IkmPZQqCHHoF4TpLA0mi9k9_b4q8d1p62DVFDl6LETEzXkecRHCyAcjyXsfDcTH5SVWXkKFEDFc0fJ2uzfJGkTpUhWtBXGC_zA2mOTY0GspbOGuvoRk2C-AGXhRQO1TUd0zi833SfgLrnpGlChU9mdCw2ny4IHJdPEotUSW8Hf2fUD1q3z2zx2G942FAYM8JoaS_oGhzyMHxxy2TN3rXXLci8emtYuTwEnkGk27UYRmNCFYHAfX7Nc0A'
    const headers = {
      Authorization: token,
    }
    const origin = 'http://bitpod-event.test.bitpod.io/svc/api/'
    const res = await this.$axios.get(`${origin}Organizations/this`, {
      headers,
    })
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
