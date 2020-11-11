import qs from 'querystring'
import nuxtconfig from '../nuxt.config'
export default function (req, res, next) {
  console.log('===>in callback.js  req==>', req)
  console.log('===>in callback.js  res==>', res)
  const query = qs.parse(req.url.substring(2))
  console.log('===>in callback.js  query==>', query)
  if (!query.cbVerified) {
    console.log(
      '===>in callback.js  inside query.cbVerified==>',
      query.cbVerified
    )
    const { state } = query
    console.log('===>in callback.js  inside query.cbVerified state==>', state)
    let stateObject
    if (state) {
      console.log(
        '===>in callback.js inside query.cbVerified  inside state==>',
        state
      )
      const decodedState = Buffer.from(state, 'base64').toString('ascii')
      console.log(
        '===>in callback.js inside query.cbVerified  inside decodedState==>',
        decodedState
      )
      try {
        stateObject = JSON.parse(decodedState)
        console.log(
          '===>in callback.js inside query.cbVerified  inside stateObject==>',
          stateObject
        )
      } catch (err) {
        console.error('state is not a valid json')
        console.error('State : ', decodedState)
        console.error('Url : ', req.url)
        return next()
      }
      const { host, oldState } = stateObject
      console.log(
        '===>in callback.js inside query.cbVerified  inside stateObject==>',
        stateObject
      )
      console.log(
        `location:http://${host}${nuxtconfig.router.base}callback?${qs.encode(
          query
        )}`
      )

      query.cbVerified = true
      query.state = oldState
      res.writeHead(301, {
        Location: `http://${host}${nuxtconfig.router.base}callback?${qs.encode(
          query
        )}`,
      })
      return res.end()
    }
  }
  return next()
}
