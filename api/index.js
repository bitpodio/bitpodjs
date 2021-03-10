import axios from 'axios'
import nuxtconfig from '../nuxt.config'
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

function getTokenUserInfoUrl(ob) {
  const provider = ob.provider
  let tokenUrl, userInfoUrl
  switch (provider) {
    case 'google':
      tokenUrl = nuxtconfig.auth.strategies.google.tokenEndPointUrl
      userInfoUrl = nuxtconfig.auth.strategies.google.userInfoEndPointUrl
      break
    case 'bitpod':
      tokenUrl = nuxtconfig.auth.strategies.bitpod.tokenEndPointUrl
      userInfoUrl = nuxtconfig.auth.strategies.bitpod.userInfoEndPointUrl
      break
    default:
      console.log(`No provider added in the key: ${provider}`)
  }
  const urls = {
    tokenEndPointUrl: tokenUrl,
    userInfoEndPointUrl: userInfoUrl,
  }
  return urls
}

app.post('/connect/token', async (req, res) => {
  const params = new URLSearchParams()
  const urls = getTokenUserInfoUrl(req.query)
  params.append(
    'client_id',
    nuxtconfig.auth.strategies[req.query.provider].clientId
  )
  params.append(
    'client_secret',
    nuxtconfig.auth.strategies[req.query.provider].clientSecret
  )
  if (req.body.refresh_token) {
    const refreshToken = req.body.refresh_token
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refreshToken)
    try {
      const tokenResponse = await axios.post(urls.tokenEndPointUrl, params)
      if (req.query.provider === 'google') {
        res.json({
          token_type: 'bearer',
          access_token: tokenResponse.data.id_token,
          refresh_token: tokenResponse.data.refresh_token,
        })
      } else {
        res.json({
          token_type: 'bearer',
          access_token: tokenResponse.data.access_token,
          refresh_token: tokenResponse.data.refresh_token,
        })
      }
    } catch (error) {
      return res.status(400).send({ error: 'Bad Request' })
    }
  } else {
    const code = req.body.code
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append(
      'redirect_uri',
      nuxtconfig.auth.strategies[req.query.provider].redirectUri
    )
    try {
      const tokenResponse = await axios.post(urls.tokenEndPointUrl, params)
      if (req.query.provider === 'google') {
        res.json({
          token_type: 'bearer',
          access_token: tokenResponse.data.id_token,
          refresh_token: tokenResponse.data.refresh_token,
        })
      } else {
        res.cookie('id_token', tokenResponse.data.id_token)
        res.json({
          token_type: 'bearer',
          access_token: tokenResponse.data.access_token,
          refresh_token: tokenResponse.data.refresh_token,
        })
      }
    } catch (error) {
      return res.status(400).send({ error: 'Bad Request' })
    }
  }
})

app.get('/connect/userinfo', async (req, res) => {
  console.log('this is in the /connect/userInfo', req)
  let userData
  const urls = getTokenUserInfoUrl(req.query)
  console.log('urls in the function is ', urls)
  const config = {
    headers: {
      Authorization: req.headers.authorization,
    },
  }
  console.log('header is being set in config', config)
  try {
    if (req.query.provider === 'google') {
      const userResponse = await axios.get(
        `${
          urls.userInfoEndPointUrl
        }?id_token=${req.headers.authorization.replace('Bearer ', '')}`
      )
      userData = userResponse.data
    } else {
      console.log(
        'in the else block calling the userInfo api urls.userInfoEndPointUrl ==>',
        urls.userInfoEndPointUrl
      )
      const userResponse = await axios.get(urls.userInfoEndPointUrl, config)
      userData = userResponse.data
      console.log('got the userdata', userData)
    }
    console.log('calling the fetchUserOrgsDetails')
    const userOrgsDetails = await fetchUserOrgsDetails(req)
    console.log('userorDetails', userOrgsDetails)
    const userDetails = {
      ...userOrgsDetails,
      ...userData,
    }
    console.log('all details userDetails', userDetails)
    res.json({
      status: 200,
      data: userDetails,
    })
  } catch (error) {
    console.log('in the error', error)
    return res.status(404).send({ error })
  }
})

function getAxiosConfig(req) {
  return {
    headers: {
      Authorization: req.headers.authorization,
    },
  }
}

function getApiUrl(req) {
  const host = req.get('host')
  const protocol = req.protocol
  if (host && host.includes('localhost')) {
    //* $config is not available in middleware, refer: https://github.com/nuxt/nuxt.js/issues/2800
    const backendBaseUrl = process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io'
    return `${protocol}://${backendBaseUrl}`
  }
  return `${protocol}://${host}`
}

async function fetchUserOrgs(req) {
  console.log('called the fetchUserOrgs', req)
  const origin = getApiUrl(req)
  console.log('called the origin', origin)
  const config = getAxiosConfig(req)
  console.log('called the config', config)
  const apiEndpoint = nuxtconfig.axios.apiEndpoint
  console.log('called the apiEndpoint', apiEndpoint)
  let userOrgList = {}
  try {
    const orgResponse = await axios.get(
      `${origin}${apiEndpoint}Organizations/list`,
      config
    )
    userOrgList = orgResponse.data
    console.log('called the userOrgList', userOrgList)
  } catch (error) {
    userOrgList = {
      error,
    }
  }
  return userOrgList
}

async function fetchUserOrgsDetails(req) {
  let userDetails = {}
  const orgList = await fetchUserOrgs(req)
  userDetails = {
    orgList,
  }
  return userDetails
}

module.exports = {
  path: '/api',
  handler: app,
}
