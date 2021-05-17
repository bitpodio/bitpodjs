// const get = (o, p) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o)
export default async (
  { graphQLErrors, networkError, operation, forward },
  nuxtContext
) => {
  // const msg = getGQLAPIErrorMsg(graphQLErrors)
  // console.log('message', msg)
  if (networkError && networkError.length > 0 && networkError.includes('401')) {
    debugger
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

// function onError(error) {
//   debugger
//   console.log('err', error)
// }
// function getGQLAPIErrorMsg(err) {
//   debugger
//   const networkError = get(err, ['networkError'])
//   let statusCode =
//     get(networkError, ['result', 'error', 'statusCode']) ||
//     get(networkError, ['statusCode'])
//   let msg =
//     get(networkError, ['result', 'error', 'message']) ||
//     get(networkError, ['message'])
//   const graphQLErrors = get(err, ['graphQLErrors'])
//   if (graphQLErrors && graphQLErrors.length > 0) {
//     msg = get(graphQLErrors, ['0', 'message'])
//     switch (msg) {
//       case 'Access denied':
//         statusCode = 401
//         break
//     }
//   }
//   return getAPIErrorMessage(statusCode, msg)
// }

// function getAPIErrorMessage(statusCode, msg) {
//   debugger
//   let userErrorMsg = ' '
//   switch (statusCode) {
//     case 401:
//       if (msg === 'jwt expired')
//         userErrorMsg = 'Session Expired. please refresh page.'
//       break
//   }
//   return userErrorMsg
// }
