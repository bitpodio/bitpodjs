import axios from 'axios'
import nuxtconfig from '../nuxt.config'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const tokenEndPointUrl =
  nuxtconfig.auth.strategies.bitpod.bitpodTokenEndPointUrl
const userInfoEndPointUrl =
  nuxtconfig.auth.strategies.bitpod.bitpodUserInfoEndPointUrl

app.post('/connect/token', async (req, res) => {
  const params = new URLSearchParams()

  if (req.body.refresh_token) {
    const refreshToken = req.body.refresh_token
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refreshToken)
    params.append('client_id', nuxtconfig.auth.strategies.bitpod.clientId)
    params.append(
      'client_secret',
      nuxtconfig.auth.strategies.bitpod.clientSecret
    )
    try {
      const tokenResponse = await axios.post(tokenEndPointUrl, params)
      res.json({
        token_type: 'bearer',
        access_token: tokenResponse.data.access_token,
        refresh_token: tokenResponse.data.refresh_token,
      })
    } catch (error) {
      return res.status(403).send({ error: 'Bad Request' })
    }
  } else {
    const code = req.body.code

    params.append('client_id', nuxtconfig.auth.strategies.bitpod.clientId)
    params.append(
      'client_secret',
      nuxtconfig.auth.strategies.bitpod.clientSecret
    )
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', nuxtconfig.auth.strategies.bitpod.redirectUri)
    try {
      const tokenResponse = await axios.post(tokenEndPointUrl, params)
      res.json({
        token_type: 'bearer',
        access_token: tokenResponse.data.access_token,
        refresh_token: tokenResponse.data.refresh_token,
      })
    } catch (error) {
      return res.status(403).send({ error: 'Bad Request' })
    }
  }
})

app.get('/connect/userinfo', async (req, res) => {
  const config = {
    headers: {
      Authorization: req.headers.authorization,
    },
  }
  try {
    const userResponse = await axios.get(userInfoEndPointUrl, config)
    res.json({
      status: 200,
      data: userResponse.data,
    })
  } catch (error) {
    return res.status(400).send({ error: 'Not Found' })
  }
})

module.exports = {
  path: '/api',
  handler: app,
}
