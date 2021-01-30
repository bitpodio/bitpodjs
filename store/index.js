import nuxtconfig from '../nuxt.config'
export const actions = {
  async nuxtServerInit({ commit }, context) {
    const origin = getApiUrl(
      context.req.headers.host,
      context.req,
      context.$config
    )
    console.log(
      'printing the context.req.header.host',
      context.req.headers.host
    )
    // console.log('printing the context.req.', context.req)
    const apiEndpoint = nuxtconfig.axios.apiEndpoint
    // console.log('coookiesAll', context.app.$cookies.getAll())
    // console.log('coookies', context.app.$cookies)
    // console.log('token', context.app.$cookies.get('auth.id_token'))
    // console.log('origin---', origin)
    // const token =
    //   context.app.$cookies.get('auth.id_token') ||
    //   'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTkyODM5MDk1MC1wbXU0bDczZnU2bXBjaW0yZ2RuZXJxZjYyazZvcHBxdC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ5OTI4MzkwOTUwLXBtdTRsNzNmdTZtcGNpbTJnZG5lcnFmNjJrNm9wcHF0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzNzUxMjU1NTM0NDczOTE0NTE4IiwiaGQiOiJiaXRwb2QuaW8iLCJlbWFpbCI6ImFtYXJ0eWFrdW1hckBiaXRwb2QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InpVRF9xRmFVWEU5djBYRTh5bWNfWmciLCJuYW1lIjoiQW1hcnR5YWt1bWFyIFJveSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLThhRUJZQkNZNXQwL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2w0cnF4eXNSYXpiTWZkT2t0cEhETHQxYV91NkEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFtYXJ0eWFrdW1hciIsImZhbWlseV9uYW1lIjoiUm95IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTE5MzA3MTcsImV4cCI6MTYxMTkzNDMxN30.LCnTWQrjyyomRp_Ei0g1Y3LZOhpTNikxK83GvhjemnIwYkANWjIYGxbZgpCahTIqvQm9knovoxcOHlJYCN1cflIPyp11SiqfvMqIfIN2aBboaupUw5GDwL4foEz_Z8LLRn6olKfpuTviWysyoKVCCRhQAQhKgyDDp-BIFNmfxiR_bBXrmPFa3eWeXDDIw2Vdau2H-mpBchd18FJYTt5SbIcpObhr_NURBqFxm0kGcHQaEM0sXOUaNvq6z3UsFViFZWqZF1RQvJoWJstWaEgHx8yMUuBV638jSlYsVJf_UOXn-RnOvbjNau6_mf76JfzLGam6MDglp3BoyUNZ1Ui_0A'
    // const headers = {
    //   authorization: token,
    // }
    try {
      const orgPromise = context.$axios.get(
        `${origin}${apiEndpoint}Organizations/this`
      )
      const orgInfoPromise = context.$axios.get(
        `${origin}${apiEndpoint}OrganizationInfos`
      )
      console.log('orgPromise', orgPromise)
      const [currentOrgRes, currentOrgInfoRes] = await Promise.all([
        orgPromise,
        orgInfoPromise,
      ])
      console.log('currentOrgInfoRes.data', currentOrgInfoRes.data)
      console.log(' currentOrgRes.data', currentOrgRes.data)
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
      console.log('in catch origin', origin)
      console.log('in catch apiEndpoint', apiEndpoint)
      console.log('in catch currentOrgInfoRes.data', currentOrgInfoRes.data)
      console.log('in catch currentOrgRes.data', currentOrgRes.data)
      console.log('in catch error',JSON.stringify(err))
      commit('setCommitError', err)
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
    // console.log(
    //   ' Json state.config in numutation in setCurrentOrg',
    //   JSON.stringify(state)
    // )
    console.log(
      ' Json payload.config in numutation in setCurrentOrg',
      JSON.stringify(payload)
    )
    // console.log(' state in numutation in setCurrentOrg', state)
    // console.log('payload in numutation in setCurrentOrg', payload)
    state.currentOrg = payload
  },
  setCurrentOrgInfo(state, payload) {
    // console.log('state in numutation in setCurrentOrgInfo', state)
    console.log('payload in numutation in setCurrentOrgInfo', payload)
    state.currentOrgInfo = payload
  },
  setCommitError(state, payload) {
    state.commitError = payload
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
  return `https://bitpod-event.test.bitpod.io`
  // return 'https://event.test.bitpod.io'
}
