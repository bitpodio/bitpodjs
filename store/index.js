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
      'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTkyODM5MDk1MC1wbXU0bDczZnU2bXBjaW0yZ2RuZXJxZjYyazZvcHBxdC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ5OTI4MzkwOTUwLXBtdTRsNzNmdTZtcGNpbTJnZG5lcnFmNjJrNm9wcHF0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzNzUxMjU1NTM0NDczOTE0NTE4IiwiaGQiOiJiaXRwb2QuaW8iLCJlbWFpbCI6ImFtYXJ0eWFrdW1hckBiaXRwb2QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IldkWHFycmpDQVNpZWJVU2o0bXNVQ3ciLCJuYW1lIjoiQW1hcnR5YWt1bWFyIFJveSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLThhRUJZQkNZNXQwL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2w0cnF4eXNSYXpiTWZkT2t0cEhETHQxYV91NkEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFtYXJ0eWFrdW1hciIsImZhbWlseV9uYW1lIjoiUm95IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTE5MTExMTIsImV4cCI6MTYxMTkxNDcxMn0.gt1MlN_UEB7uJ8CYVzISTa2xdVZZ0yfXb5b4CMzYKns1PwDsqI4a9qiP9tqKIeJuB6Tj9F-4aAP8VaaYont6ZplrZ1fOqFmofz14cxydyZAhWDHqh_cJa1BTH_sw7Auf9SCwPYOA-Cw0Jg39xqh1du1wOZ1iKpx3U0GuiBOAJLoT1RTpM1neXi9yHQDwQ6Emj4kxPwPjIS2p1Yg3OnhAiD9ssLwr1kOxJBRXEGdpeXl0kXovYOCwNCeiKhUzs3H3hdIQC2zvfN5i1LeUh0F3lfbdB_0e-n3bsEnA3HWnIKiVk1kU8jUHxU-iK-GtUGcg2gM-okTIBdO2786RZ2NDUQ'
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
  console.log('request', req)
  console.log('host', host)
  console.log('protocol', req.protocol)
  return `http://${host}`
  // return 'https://event.test.bitpod.io'
}
