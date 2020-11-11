import qs from 'querystring'
import url from 'url'
import nuxtconfig from '../nuxt.config'
export default function (req, res, next) {
  let referer
  console.log('===>in authorize.js')
  console.log('===>in authorize.js req', req)
  if (req.headers.referer.includes('/login')) {
    referer = req.headers.referer.replace('/login', '')
    //  'https://' + req.headers.referer.split('-')[1].replace('/login', '')
    console.log('==>referer', referer)
  } else {
    referer = req.headers.referer
    console.log('==>referer', referer)
  }
  console.log('==>referer', referer)
  console.log('===>in authorize.js Referer', referer)
  if (!referer) {
    console.log('===>in authorize.js inside referer', referer)
    return next()
  }
  console.log('===>in authorize.js outside referer', referer)
  // eslint-disable-next-line node/no-deprecated-api
  const host = url.parse(referer).host
  console.log('===>in authorize.js host==>', host)
  // parsing the url to get the query parameters and get the info from which provider the request is being made
  const query = qs.parse(req.url.substring(2).replace('?', '&'))
  console.log('===>in authorize.js query==>', query)
  const oldState = query.state
  console.log('===>in authorize.js oldState==>', oldState)
  query.state = Buffer.from(JSON.stringify({ host, oldState })).toString(
    'base64'
  )
  console.log('===>in authorize.js  query.state==>', query.state)
  const authorizationUrl =
    nuxtconfig.auth.strategies[query.provider].authorization
  console.log('===>in authorize.js  authorizationUrl==>', authorizationUrl)
  delete query.provider
  console.log('===>in authorize.js  query1==>', query)
  console.log('===>in authorize.js res', res)
  res.writeHead(301, {
    Location: `${authorizationUrl}?${qs.encode(query)}`,
  })
  return res.end()
}
