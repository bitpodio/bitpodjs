<template>
  <div>
    {{ errorMessage }}
  </div>
</template>

<script>
function has(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property)
}

const get = (o, p) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o)

function APIErrorMsg(err) {
  console.error(err)
  const isGraphqlRequest = has(err, 'graphQLErrors')
  if (!navigator.onLine) {
    return 'There is no Internet connection'
  }
  if (isGraphqlRequest) {
    return getGQLAPIErrorMsg(err)
  }
  const statusCode = get(err, ['status']) || get(err, ['response', 'status'])
  const msg =
    get(err, ['response', 'body', 'error', 'message']) ||
    get(err, ['response', 'data', 'error', 'message'])
  return getAPIErrorMessage(statusCode, msg)
}
function getGQLAPIErrorMsg(err) {
  const networkError = get(err, ['networkError'])
  let statusCode =
    get(networkError, ['result', 'error', 'statusCode']) ||
    get(networkError, ['statusCode'])
  let msg =
    get(networkError, ['result', 'error', 'message']) ||
    get(networkError, ['message'])
  const graphQLErrors = get(err, ['graphQLErrors'])
  if (graphQLErrors && graphQLErrors.length > 0) {
    msg = get(graphQLErrors, ['0', 'message'])
    switch (msg) {
      case 'Access denied':
        statusCode = 401
        break
    }
  }
  return getAPIErrorMessage(statusCode, msg)
}

const getAPIErrorMessage = (statusCode, msg) => {
  let userErrorMsg = 'Something went wrong'
  switch (statusCode) {
    case 401:
      if (msg === 'jwt expired')
        userErrorMsg = 'Session Expired. please refresh page.'
      if (msg === 'Access denied' || msg === 'Authorization Required')
        userErrorMsg = 'Access not granted, contact support to request access.'
      break
    case 404:
      userErrorMsg = 'Resource not found'
      break
    case 502:
      userErrorMsg = 'Service unavailable'
      break
  }
  return userErrorMsg
}
export default {
  props: { error: { type: null, default: null } },
  data() {
    return {
      errorMessage: APIErrorMsg(this.error),
    }
  },
}
</script>
