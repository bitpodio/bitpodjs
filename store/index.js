import nuxtconfig from '../nuxt.config'
export const actions = {
  async nuxtServerInit({ commit }, context) {
    const origin = getApiUrl(context.req.headers.host, context.req)
    const apiEndpoint = nuxtconfig.axios.apiEndpoint
    try {
      const orgPromise = context.$axios.get(
        `${origin}${apiEndpoint}Organizations/this`
      )
      const orgInfoPromise = context.$axios.get(
        `${origin}${apiEndpoint}OrganizationInfos`
      )
      const [currentOrgRes, currentOrgInfoRes] = await Promise.all([
        orgPromise,
        orgInfoPromise,
      ])
      console.log(`origin - ${origin}`)
      console.log(`origin - ${JSON.stringify(currentOrgInfoRes.data)}`)
      const currentOrgInfo = currentOrgInfoRes.data
      commit('setCurrentOrg', currentOrgRes.data)
      commit('setCurrentOrgInfo', currentOrgInfo && currentOrgInfo[0])
    } catch (err) {
      commit('setCurrentOrg', err)
    }
  },
}

export const state = () => ({
  currentOrg: [],
  currentOrgInfo: {},
})

export const mutations = {
  setCurrentOrg(state, payload) {
    state.currentOrg = payload
  },
  setCurrentOrgInfo(state, payload) {
    state.currentOrgInfo = payload
  },
}

function getApiUrl(host, req) {
  if (host && host.includes('localhost')) {
    return `https://${nuxtconfig.axios.backendBaseUrl}`
  }
  const protocol = req.protocol
  return `${protocol}://${host}`
}
