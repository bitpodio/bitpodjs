export default async (
  { graphQLErrors, networkError, operation, forward },
  nuxtContext
) => {
  if (networkError && JSON.stringify(networkError).includes('401')) {
    let token = ''
    if (nuxtContext.$auth.$storage.getCookies()['auth._token.bitpod']) {
      token = nuxtContext.$auth.$storage.getCookies()['auth._token.bitpod']
      console.debug('token1--->', token)
    } else {
      token = nuxtContext.$auth.$storage.getCookies()['auth._token.google']
      console.debug('token2--->', token)
    }
    const strategy = nuxtContext.$auth.$storage.getCookies()['auth.strategy']
    console.debug('strategy--->', strategy)
    if (strategy === 'bitpod' || strategy === 'google') {
      console.debug(
        'apollo---->',
        nuxtContext.$auth.$storage.getCookies()['apollo-token']
      )
      if (
        token.split(' ')[1] !==
        nuxtContext.$auth.$storage.getCookies()['apollo-token']
      ) {
        let newToken = nuxtContext.$auth.strategy.token.get()
        console.debug('newToken--->', newToken)
        if (newToken) {
          newToken = newToken.split(' ')[1]
          await nuxtContext.$apolloHelpers.onLogin(newToken, undefined, {
            expires: 7,
          })
          console.debug('redirecting --->', newToken)
        }
      }
      nuxtContext.redirect(301, `/apps/event/eventboard`)
    }
  }
}
