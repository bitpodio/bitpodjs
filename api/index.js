const express = require('express')
const params = new URLSearchParams()
import axios from 'axios'
import nuxtconfig from '../nuxt.config'
const urlParser = require('url')

const app = express()

console.log('Middleware Server connected.....')

app.post('/connect/token', async (req, res) => {
  const tokenEndpointUrl =
    process.env.BITPOD_TOKEN_ENDPOINT_URL ||
    'https://id.bitpod.io/auth/connect/token'
  console.log('Got POST request in contex /connect/token')
  const urlQuery = req.headers.referer
  const parsedQuery = urlParser.parse(urlQuery, true, true)
  const code = parsedQuery.query.code
  console.log('Succesffully retrieved the code value from url', code)

  params.append('client_id', nuxtconfig.auth.strategies.bitpod.clientId)
  params.append('client_secret', nuxtconfig.auth.strategies.bitpod.clientSecret)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', nuxtconfig.auth.strategies.bitpod.redirectUri)
  console.log('Added the parameters for token endpoint')

  const res1 = await axios.post(tokenEndpointUrl, params)
  params.delete('client_id', nuxtconfig.auth.strategies.bitpod.clientId)
  params.delete('client_secret', nuxtconfig.auth.strategies.bitpod.clientSecret)
  params.delete('grant_type', 'authorization_code')
  params.delete('code', code)
  params.delete('redirect_uri', nuxtconfig.auth.strategies.bitpod.redirectUri)
  console.log('Cleared the params', params)
  console.log('Server got the token from the ID4 ')
  console.log('Sending the response back to userinfo endpoint')

  res.json({
    token_type: 'bearer',
    access_token: res1.data.access_token,
    refresh_token: res1.data.refresh_token,
  })
})

app.get('/connect/userinfo', async (req, res) => {
  const UserinfoEndpointUrl =
    process.env.BITPOD__USERINFO_ENDPOINT_URL ||
    'https://id.bitpod.io/auth/connect/userinfo'
  console.log('Received GET request in UserinfoEndpoint')
  var config = {
    headers: {
      Authorization: req.headers.authorization,
    },
  }
  console.log(
    'Sending the response back back to client from  userinfo endpoint'
  )
  const res1 = await axios.get(UserinfoEndpointUrl, config)
  res.json({
    Status: 200,
    data: res1.data,
  })
})

module.exports = {
  path: '/api',
  handler: app,
}
