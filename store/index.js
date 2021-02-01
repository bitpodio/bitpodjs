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
    try {
      const res = await this.$axios.get(`${origin}OrganizationInfos`)
      console.log('response from Orginfo', res.data[0])
      commit('setCurrentOrgInfo', res.data[0])
    } catch (e) {
      console.log('error in storeOrganizationInfo', e)
    }
  },
  async storeCurrentOrg({ commit, req }, context) {
    // console.log('request in storeCurrentOrg', req)
    // console.log(
    //   'reques.header.cookie t in storeCurrentOrg',
    //   context.headers.cookie
    // )
    // const parsedCookie = cookieparser.parse(req.headers.cookie)
    // console.log('ParsedCookie', parsedCookie)
    // if (context && context.req.headers.host.includes('localhost')) {
    //   const apiUrl = `http://${context.req.headers.host}/`
    //   console.log('apiUrl', apiUrl)
    // } else {
    //   const apiUrl = `https://${context.req.headers.host}${this.$router.options.base}`
    //   console.log('apiUrl', apiUrl)
    // }
    const token =
      'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzYjJkMjJjMmZlY2Y4NzNlZDE5ZTViOGNmNzA0YWZiN2UyZWQ0YmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTkyODM5MDk1MC1wbXU0bDczZnU2bXBjaW0yZ2RuZXJxZjYyazZvcHBxdC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ5OTI4MzkwOTUwLXBtdTRsNzNmdTZtcGNpbTJnZG5lcnFmNjJrNm9wcHF0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzNzUxMjU1NTM0NDczOTE0NTE4IiwiaGQiOiJiaXRwb2QuaW8iLCJlbWFpbCI6ImFtYXJ0eWFrdW1hckBiaXRwb2QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkFPaGdjRnZSNHQwMWtQVTBFUDRPMWciLCJuYW1lIjoiQW1hcnR5YWt1bWFyIFJveSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLThhRUJZQkNZNXQwL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2w0cnF4eXNSYXpiTWZkT2t0cEhETHQxYV91NkEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFtYXJ0eWFrdW1hciIsImZhbWlseV9uYW1lIjoiUm95IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTIxNTY4NDcsImV4cCI6MTYxMjE2MDQ0N30.FoP7pblUWus3tgMvrZA3osFZsFvwCFiv0B1IED2iTToAJ0vISzkwBshgXeY4O9AVvYeCR1SlseRTyKhWHB2vvrBzl5te9RuyJ4d79MJI6QICX64CB-hsiriCifiJKEtneH6sfyzcs60hdSI07Dc_5uq1h5JF4lk4YENbs8e4kdRntXiSf0WfRNiuVuOwAWAHjhM79MnUVguEBxeX0gWcQ0s8_EnMkCkg4ckGoRp9rkmiGrIHmYjFSu6e4EDinvhOCilEUtj3TEaT1iDIlNevKu8nDUVezophuiSNB1P2_AvNNghXL1jVmoyICbZYKx28rjh5ZGgTv9D7U4R-C1WWGA'
    const headers = {
      Authorization: token,
    }
    const origin = 'https://bitpod-event.test.bitpod.io/svc/api/'
    try {
      const res = await this.$axios.get(`${origin}Organizations/this`, {
        headers,
      })
      console.log('response from currentOrg', res.data)
      commit('setCurrentOrg', res.data)
    } catch (e) {
      console.log('error in storeCurrentOrg', e)
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
