export default async (
  { graphQLErrors, networkError, operation, forward },
  nuxtContext
) => {
  if (networkError && JSON.stringify(networkError).includes('401')) {
    let token = ''
    if (nuxtContext.$auth.$storage.getCookies()['auth._token.bitpod']) {
      token = nuxtContext.$auth.$storage.getCookies()['auth._token.bitpod']
    } else {
      token = nuxtContext.$auth.$storage.getCookies()['auth._token.google']
    }
    const strategy = nuxtContext.$auth.$storage.getCookies()['auth.strategy']
    if (strategy === 'bitpod' || strategy === 'google') {
      if (
        token.split(' ')[1] !==
        nuxtContext.$auth.$storage.getCookies()['apollo-token']
      ) {
        let newToken = nuxtContext.$auth.strategy.token.get()
        if (newToken) {
          newToken = newToken.split(' ')[1]
          await nuxtContext.$apolloHelpers.onLogin(
            newToken,
            undefined,
            {
              expires: 7,
            },
            true
          )
        }
      }
      nuxtContext.redirect(301, `/apps/event/eventboard`)
    }
  }
}
