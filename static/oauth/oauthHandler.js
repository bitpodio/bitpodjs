const bpmnServerURL = 'https://wfsdev.p10.io'
document.addEventListener(
  'DOMContentLoaded',
  () => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('connectionId')) {
      localStorage.connectionId = searchParams.get('connectionId')
      window.opener.authAgent.emit('suspend', event)
      window.close()
    } else {
      createUserConnection(
        searchParams.get('refreshConnectionId'),
        searchParams.get('bpmnServerURL'),
        searchParams
      )
    }
  },
  false
)

const createUserConnection = (connectionId, newBpmnServerURL, searchParams) => {
  newBpmnServerURL = newBpmnServerURL || bpmnServerURL
  const accessToken = searchParams.get('accessToken')
  const refreshConnection = connectionId
    ? `&refreshConnectionId=${connectionId}`
    : ''
  searchParams.delete('bpmnServerURL')
  searchParams.delete('refreshConnectionId')
  searchParams.delete('clientId')
  const redirectTo = `${newBpmnServerURL}auth/login?Bearer=${accessToken}&redirectURL=${
    location.origin
  }${location.pathname}${refreshConnection}&${searchParams.toString()}`
  location.replace(redirectTo)
}
