export const actions = {
  async nuxtServerInit({ commit }, context) {
    console.log('context in nuxtServerInit', context)
    console.log('headers of axios call', context.$axios.defaults.headers)
    console.log('baseURL: of axios call', context.$axios.defaults.baseURL)
    const origin = 'https://bitpod-event.test.bitpod.io/svc/api/'
    console.log('coookiesAll', context.app.$cookies.getAll())
    try {
      // const orgInfoPromise = await context.$axios.get(
      //   `${origin}OrganizationInfos`
      // )
      // console.log('received orgInfoPromise', orgInfoPromise)
      // // const [currentInfoRes] = await Promise.all([orgInfoPromise])
      // console.log('received currentOrgRes', orgInfoPromise.data[0])
      // commit('setCurrentOrgInfo', orgInfoPromise && orgInfoPromise.data[0])
      const token =
        'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzYjJkMjJjMmZlY2Y4NzNlZDE5ZTViOGNmNzA0YWZiN2UyZWQ0YmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTkyODM5MDk1MC1wbXU0bDczZnU2bXBjaW0yZ2RuZXJxZjYyazZvcHBxdC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ5OTI4MzkwOTUwLXBtdTRsNzNmdTZtcGNpbTJnZG5lcnFmNjJrNm9wcHF0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzNzUxMjU1NTM0NDczOTE0NTE4IiwiaGQiOiJiaXRwb2QuaW8iLCJlbWFpbCI6ImFtYXJ0eWFrdW1hckBiaXRwb2QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImxVMWR1RFNsaUg2aWFIV1JUMUVDV3ciLCJuYW1lIjoiQW1hcnR5YWt1bWFyIFJveSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLThhRUJZQkNZNXQwL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2w0cnF4eXNSYXpiTWZkT2t0cEhETHQxYV91NkEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFtYXJ0eWFrdW1hciIsImZhbWlseV9uYW1lIjoiUm95IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTIwMjA2NDYsImV4cCI6MTYxMjAyNDI0Nn0.m0FRxCU66hTdkGN999koJjN_sOvVCgiULURFx9J0k8yFg3PTmK7zWBV__sFWKblZ3sKXBZr4sFqgoszsZBYSoY2TEQE2FdTAHVKtQDg54mMFgNMFmqCSmjk8Sov_td3Bff1KRUS18-i5R48TWBYPNaSsBwbtkcKrQDdWTI-1g6_Vuhc7Hg5wtGfgtk1xavAAAf-hdEFBmnKolSHPFh46BcSVr-jrpkgxGO3qRpk4a9YvKpKFRmT6YzSaKpdeo0rOMttQP-LEqjmssOKOgHzL1SUsbzW7Vqa-nq6de7pP0yBNlGPv40X-cCx9txKB87AwGoLWnUsTt7Trc8Mc0x5TVA'
      const headers = {
        Authorization: token,
      }
      const orgPromise = await context.$axios.get(
        `${origin}Organizations/this`,
        {
          headers,
        }
      )
      console.log('received orgPromise', orgPromise)
      commit('setCurrentOrg', orgPromise.data)
    } catch (err) {
      console.log('error in catch', err)
    }
  },
}

export const state = () => ({
  currentOrgInfo: {},
  currentOrg: [],
})

export const mutations = {
  setCurrentOrgInfo(state, payload) {
    console.log('payload in numutation in setCurrentOrgInfo', payload)
    state.currentOrgInfo = payload
    console.log('sucess in setting in setCurrentOrgInfo')
  },
  setCurrentOrg(state, payload) {
    console.log('payload in numutation in setCurrentOrg', payload)
    state.currentOrg = payload
    console.log('sucess in setting in setCurrentOrg')
  },
}
