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
      console.log('received currentOrgRes', orgInfoPromise.data[0])
      commit('setCurrentOrgInfo', orgInfoPromise && orgInfoPromise.data[0])
    } catch (err) {
      console.log('error in catch', err)
    }
  },
}

export const state = () => ({
  currentOrgInfo: {},
})

export const mutations = {
  setCurrentOrgInfo(state, payload) {
    console.log('payload in numutation in setCurrentOrgInfo', payload)
    state.currentOrgInfo = payload
    console.log('sucess in setting in setCurrentOrgInfo')
  },
}
