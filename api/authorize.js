import qs from 'querystring'
import url from 'url'
import nuxtconfig from '../nuxt.config'
export default function (req, res, next) {
  const referer = req.headers.referer
  if (!referer) {
    return next()
  }
  // eslint-disable-next-line node/no-deprecated-api
  const host = url.parse(referer).host
  // parsing the url to get the query parameters and get the info from which provider the request is being made
  const query = qs.parse(req.url.substring(2).replace('?', '&'))
  const oldState = query.state
  query.state = Buffer.from(JSON.stringify({ host, oldState })).toString(
    'base64'
  )
  const authorizationUrl =
    nuxtconfig.auth.strategies[query.provider].authorization
  delete query.provider
  res.writeHead(301, {
    Location: `${authorizationUrl}?${qs.encode(query)}`,
  })
  return res.end()
}
