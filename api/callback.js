import qs from 'querystring'
export default function (req, res, next) {
  const query = qs.parse(req.url.substring(2))
  if (!query.cbVerified) {
    const { state } = query
    let stateObject
    if (state) {
      const decodedState = Buffer.from(state, 'base64').toString('ascii')
      try {
        stateObject = JSON.parse(decodedState)
      } catch (err) {
        console.error('state is not a valid json')
        console.error('State : ', decodedState)
        return next()
      }
      const { host, oldState } = stateObject
      query.cbVerified = true
      query.state = oldState
      console.log(`################### 
      ########################################
      https://${host}${process.env.PUBLIC_PATH}/callback?${qs.encode(query)}`);
      res.writeHead(301, {
        Location: `https://${host}${process.env.PUBLIC_PATH}/callback?${qs.encode(query)}`,
      })
      return res.end()
    }
  }
  return next()
}
