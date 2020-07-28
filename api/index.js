const express = require('express')
const params = new URLSearchParams()
import axios from 'axios'
import nuxtconfig from '../nuxt.config'
const urlParser = require('url')

const app = express()

app.post('/connect/token', async (req, res) => {
  const tokenEndpointUrl =
    process.env.BITPOD_TOKEN_ENDPOINT_URL ||
    'https://id.bitpod.io/auth/connect/token'
  const urlQuery = req.headers.referer
  const parsedQuery = urlParser.parse(urlQuery, true, true)
  const code = parsedQuery.query.code

  params.append('client_id', nuxtconfig.auth.strategies.bitpod.clientId)
  params.append('client_secret', nuxtconfig.auth.strategies.bitpod.clientSecret)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', nuxtconfig.auth.strategies.bitpod.redirectUri)

  const tokenResponse = await axios.post(tokenEndpointUrl, params)
  params.delete('client_id', nuxtconfig.auth.strategies.bitpod.clientId)
  params.delete('client_secret', nuxtconfig.auth.strategies.bitpod.clientSecret)
  params.delete('grant_type', 'authorization_code')
  params.delete('code', code)
  params.delete('redirect_uri', nuxtconfig.auth.strategies.bitpod.redirectUri)

  res.json({
    token_type: 'bearer',
    access_token: tokenResponse.data.access_token,
    refresh_token: tokenResponse.data.refresh_token,
  })
})

app.get('/connect/userinfo', async (req, res) => {
  const UserinfoEndpointUrl =
    process.env.BITPOD__USERINFO_ENDPOINT_URL ||
    'https://id.bitpod.io/auth/connect/userinfo'
  var config = {
    headers: {
      Authorization: req.headers.authorization,
    },
  }
  const userResponse = await axios.get(UserinfoEndpointUrl, config)
  res.json({
    Status: 200,
    data: userResponse.data,
  })
})

module.exports = {
  path: '/api',
  handler: app,
}
