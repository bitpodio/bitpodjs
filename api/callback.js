import qs from 'querystring'
import nuxtconfig from '../nuxt.config'
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
        console.error('Url : ', req.url)
        return next()
      }
      const { host, oldState } = stateObject
      query.cbVerified = true
      query.state = oldState
      if(host && host.includes('localhost')){
        res.writeHead(301, {
          Location: `http://${host}${nuxtconfig.router.base}callback?${qs.encode(
            query
          )}`,
        })
        return res.end()
      }else{
        res.writeHead(301, {
          Location: `https://${host}${nuxtconfig.router.base}callback?${qs.encode(
            query
          )}`,
        })
        return res.end()
      }
      
    }
  }
  return next()
}
