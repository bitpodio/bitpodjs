export const actions = {
  async nuxtServerInit({ commit }, context) {
    console.log('context in nuxtServerInit', JSON.stringify(context))
    const origin = 'https://bitpod-event.test.bitpod.io/svc/api/'
    console.log('coookiesAll', context.app.$cookies.getAll())
    try {
      const orgInfoPromise = context.$axios.get(`${origin}OrganizationInfos`)
      const [currentInfoRes] = await Promise.all(orgInfoPromise)
      console.log('received currentOrgRes', currentInfoRes.data)
    } catch (err) {
      console.log('error in catch', err)
    }
  },
}
