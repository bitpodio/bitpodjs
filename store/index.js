import nuxtconfig from '../nuxt.config'
export const actions = {
  async nuxtServerInit({ commit }, context) {
    const origin = getApiUrl(context.req.headers.host, context.req)
    const apiEndpoint = nuxtconfig.axios.apiEndpoint
    try {
      const currentOrgRes = await context.$axios.get(
        `${origin}${apiEndpoint}Organizations/this`
      )
      commit('setCurrentOrg', currentOrgRes.data)
    } catch (err) {
      commit('setCurrentOrg', err)
    }
  },
}

export const state = () => ({
  currentOrg: [],
})

export const mutations = {
  setCurrentOrg(state, payload) {
    state.currentOrg = payload
  },
}

function getApiUrl(host, req) {
  if (host && host.includes('localhost')) {
    return `https://${nuxtconfig.axios.backendBaseUrl}`
  }
  const protocol = req.protocol
  return `${protocol}://${host}`
}
