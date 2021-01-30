export const actions = {
  async nuxtServerInit({ commit }, context) {
    console.log('context in nuxtServerInit', context)
    console.log('headers of axios call', context.$axios.defaults.headers)
    console.log('baseURL: of axios call', context.$axios.defaults.baseURL)
    const origin = 'https://bitpod-event.test.bitpod.io/svc/api/'
    console.log('coookiesAll', context.app.$cookies.getAll())
    try {
      const orgInfoPromise = await context.$axios.get(
        `${origin}OrganizationInfos`
      )
      console.log('received orgInfoPromise', orgInfoPromise)
      // const [currentInfoRes] = await Promise.all([orgInfoPromise])
      console.log('received currentOrgInfoRes.data', orgInfoPromise.data[0])
      const token =
        'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzYjJkMjJjMmZlY2Y4NzNlZDE5ZTViOGNmNzA0YWZiN2UyZWQ0YmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTkyODM5MDk1MC1wbXU0bDczZnU2bXBjaW0yZ2RuZXJxZjYyazZvcHBxdC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ5OTI4MzkwOTUwLXBtdTRsNzNmdTZtcGNpbTJnZG5lcnFmNjJrNm9wcHF0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzNzUxMjU1NTM0NDczOTE0NTE4IiwiaGQiOiJiaXRwb2QuaW8iLCJlbWFpbCI6ImFtYXJ0eWFrdW1hckBiaXRwb2QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Im15aW9pcUFsV1dFT0t0X2F6blZISnciLCJuYW1lIjoiQW1hcnR5YWt1bWFyIFJveSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLThhRUJZQkNZNXQwL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2w0cnF4eXNSYXpiTWZkT2t0cEhETHQxYV91NkEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFtYXJ0eWFrdW1hciIsImZhbWlseV9uYW1lIjoiUm95IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTIwMjQ1MzMsImV4cCI6MTYxMjAyODEzM30.qT8JVrMiSW071wWYzB6hdgYhp4puhZ21fCz8TCL622UTxBBqJcrowDpTcJlCsKv2eQdL0AgwvxODGYsF4LFJ2YpYAa2FbsG3HxlYRzaxkzH6iRudNo4bhIXRsvxScdcwkrhoGidHwvs6M5AQWneKNyeFRKo90FngWYL7EuiGPhHJF2mksZxeX8LQxfGkxh8u7x9vHYhTDG7d0ZgYpK9Px31B7h0eLtdYgklOMMDSTtBIVKi0iHtqBMPS5t2e1IH4-s0GDiKMwVk_uVxjLq9u5b-9j6TOiWcjOJGOZlVHiFfqASSIHPd3yUMWhogUP8UpyODh1gDKLYALTO7vwhJFLw'
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
      console.log('received orgPromise.data', orgPromise.data)
      commit('setCurrentOrgInfo', orgInfoPromise && orgInfoPromise.data[0])
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
