// import nuxtconfig from '~/nuxt.config'
export default async (
  { graphQLErrors, networkError, operation, forward },
  nuxtContext
) => {
  debugger
  let token = ''
  if (nuxtContext.$auth.$storage.getCookies()['auth._token.bitpod']) {
    token = nuxtContext.$auth.$storage.getCookies()['auth._token.bitpod']
  } else {
    token = nuxtContext.$auth.$storage.getCookies()['auth._token.google']
  }
  console.log('tokenr', token)
  const strategy = nuxtContext.$auth.$storage.getCookies()['auth.strategy']
  if (strategy === 'bitpod' || strategy === 'google') {
    console.log('strategy matched===>')
    console.log(
      'apollow-tojken',
      nuxtContext.$auth.$storage.getCookies()['apollo-token']
    )
    if (
      token.split(' ')[1] !==
      nuxtContext.$auth.$storage.getCookies()['apollo-token']
    ) {
      console.log('not similar setting new token ====>')
      let newToken = this.$auth.strategy.token.get()
      console.log('not similar setting new token ====>', newToken)
      if (newToken) {
        newToken = newToken.split(' ')[1]

        await nuxtContext.$apolloHelpers.onLogin(newToken, undefined, {
          expires: 7,
        })
        // nuxtContext.redirect(302, `${nuxtconfig.auth.redirect.home}`)
        console.log(
          'after setting apollow-tojken',
          nuxtContext.$auth.$storage.getCookies()['apollo-token']
        )
      }
    }
  }
  debugger
  console.log('Global error handler')
  console.log(graphQLErrors, networkError, operation, forward)
}
