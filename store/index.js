import nuxtconfig from '../nuxt.config'
export const actions = {
  async nuxtServerInit({ commit }, context) {
    const origin = getApiUrl(
      context.req.headers.host,
      context.req,
      context.$config
    )
    console.log('printing the context.req.header.host', context.req.header.host)
    console.log('printing the context.req.', context.req)
    const apiEndpoint = nuxtconfig.axios.apiEndpoint
    console.log('coookiesAll', context.app.$cookies.getAll())
    console.log('coookies', context.app.$cookies)
    console.log('token', context.app.$cookies.get('auth.id_token'))
    console.log('origin---', origin)
    const token =
      context.app.$cookies.get('auth.id_token') ||
      'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTkyODM5MDk1MC1wbXU0bDczZnU2bXBjaW0yZ2RuZXJxZjYyazZvcHBxdC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ5OTI4MzkwOTUwLXBtdTRsNzNmdTZtcGNpbTJnZG5lcnFmNjJrNm9wcHF0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzNzUxMjU1NTM0NDczOTE0NTE4IiwiaGQiOiJiaXRwb2QuaW8iLCJlbWFpbCI6ImFtYXJ0eWFrdW1hckBiaXRwb2QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImIwelFMX0VIUmhVYkF3YzBfRHlDTXciLCJuYW1lIjoiQW1hcnR5YWt1bWFyIFJveSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLThhRUJZQkNZNXQwL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2w0cnF4eXNSYXpiTWZkT2t0cEhETHQxYV91NkEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFtYXJ0eWFrdW1hciIsImZhbWlseV9uYW1lIjoiUm95IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTE5MjIwOTgsImV4cCI6MTYxMTkyNTY5OH0.p9uvFv4ZZShQhCdyTybQENUBjDl41Bc8yuZF-z6pc_Rf0Ax1PVi3WxV4a6giI4Id9Hi2wOIpZuZeMvBUFfDxfUksi7u5RkdhrKLaAxhOv-efE9IsKa-s91JWhIobCNQyLUer86uo1se5wESP2Q0SLli1l2TjUiNpP9XkjR8LLP3xk1tDLJxIfVyPxRRiD7OL4DR-M_a5YHqHh6uUazWim5dI_C_3TfZjvmSjofRb1jmd28jQw1ZTIMFGJvYpzmEWh-3rDBOqrK_jcf8zJqhcx40rcMhL4e16xvEx3Iowxj9QKkQUzm72EI0W_w8F9nRBcWzs4P6WKNxdT_TusyCWpg'
    const headers = {
      authorization: token,
    }
    try {
      const orgPromise = context.$axios.get(
        `${origin}${apiEndpoint}Organizations/this`,
        {
          headers,
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
  return `https://bitpod-event.test.bitpod.io`
  // return 'https://event.test.bitpod.io'
}
