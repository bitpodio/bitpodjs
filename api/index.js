import axios from 'axios'
import nuxtconfig from '../nuxt.config'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

function getTokenUserInfoUrl(ob) {
  console.log('===>in api/index.js inside getTokenUserInfoUrl Ob:', ob)
  const provider = ob.provider
  console.log(
    '===>in api/index.js inside getTokenUserInfoUrl provider:',
    provider
  )
  let tokenUrl, userInfoUrl
  switch (provider) {
    case 'google':
      tokenUrl = nuxtconfig.auth.strategies.google.tokenEndPointUrl
      userInfoUrl = nuxtconfig.auth.strategies.google.userInfoEndPointUrl
      console.log(
        '===>in api/index.js inside getTokenUserInfoUrl tokenUrl:',
        tokenUrl
      )
      console.log(
        '===>in api/index.js inside getTokenUserInfoUrl userInfoUrl:',
        userInfoUrl
      )
      break
    case 'bitpod':
      tokenUrl = nuxtconfig.auth.strategies.bitpod.tokenEndPointUrl
      userInfoUrl = nuxtconfig.auth.strategies.bitpod.userInfoEndPointUrl
      console.log(
        '===>in api/index.js inside getTokenUserInfoUrl tokenUrl:',
        tokenUrl
      )
      console.log(
        '===>in api/index.js inside getTokenUserInfoUrl userInfoUrl:',
        userInfoUrl
      )
      break
    default:
      console.log(`No provider added in the key: ${provider}`)
  }
  const urls = {
    tokenEndPointUrl: tokenUrl,
    userInfoEndPointUrl: userInfoUrl,
  }
  console.log('===>in api/index.js inside getTokenUserInfoUrl urls:', urls)
  return urls
}

app.post('/connect/token', async (req, res) => {
  console.log('===>in api/index.js inside /connect/token req:', req)
  console.log('===>in api/index.js inside /connect/token res:', res)
  const params = new URLSearchParams()
  console.log('===>in api/index.js inside /connect/token params:', params)
  const urls = getTokenUserInfoUrl(req.query)
  console.log('===>in api/index.js inside /connect/token urls:', urls)
  params.append(
    'client_id',
    nuxtconfig.auth.strategies[req.query.provider].clientId
  )
  params.append(
    'client_secret',
    nuxtconfig.auth.strategies[req.query.provider].clientSecret
  )
  console.log('===>in api/index.js inside /connect/token params:', params)
  if (req.body.refresh_token) {
    const refreshToken = req.body.refresh_token
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refreshToken)
    console.log(
      '===>in api/index.js inside /connect/token If refresh_token:',
      params
    )
    try {
      const tokenResponse = await axios.post(urls.tokenEndPointUrl, params)
      console.log(
        '===>in api/index.js inside /connect/token tokenResponse:',
        tokenResponse
      )
      if (req.query.provider === 'google') {
        console.log(
          '===>in api/index.js inside /connect/token id_token:',
          tokenResponse.data.id_token
        )
        console.log(
          '===>in api/index.js inside /connect/token refresh_token:',
          tokenResponse.data.refresh_token
        )
        res.json({
          token_type: 'bearer',
          access_token: tokenResponse.data.id_token,
          refresh_token: tokenResponse.data.refresh_token,
        })
      } else {
        console.log(
          '===>in api/index.js inside /connect/token access_token:',
          tokenResponse.data.access_token
        )
        console.log(
          '===>in api/index.js inside /connect/token refresh_token:',
          tokenResponse.data.refresh_token
        )
        res.json({
          token_type: 'bearer',
          access_token: tokenResponse.data.access_token,
          refresh_token: tokenResponse.data.refresh_token,
        })
      }
    } catch (error) {
      console.log(
        '===>in api/index.js inside /connect/token in catch 1 refresh_token:',
        res
      )
      return res.status(400).send({ error: 'Bad Request' })
    }
  } else {
    const code = req.body.code
    console.log('===>in api/index.js inside /connect/token else code:', code)
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append(
      'redirect_uri',
      nuxtconfig.auth.strategies[req.query.provider].redirectUri
    )
    console.log(
      '===>in api/index.js inside /connect/token else params:',
      params
    )
    try {
      const tokenResponse = await axios.post(urls.tokenEndPointUrl, params)
      console.log(
        '===>in api/index.js inside /connect/token else tokenResponse:',
        tokenResponse
      )
      if (req.query.provider === 'google') {
        console.log(
          '===>in api/index.js inside /connect/token else id_token:',
          tokenResponse.data.id_token
        )
        console.log(
          '===>in api/index.js inside /connect/token else refresh_token:',
          tokenResponse.data.refresh_token
        )
        res.json({
          token_type: 'bearer',
          access_token: tokenResponse.data.id_token,
          refresh_token: tokenResponse.data.refresh_token,
        })
      } else {
        console.log(
          '===>in api/index.js inside /connect/token else access_token:',
          tokenResponse.data.access_token
        )
        console.log(
          '===>in api/index.js inside /connect/token else refresh_token:',
          tokenResponse.data.refresh_token
        )
        res.json({
          token_type: 'bearer',
          access_token: tokenResponse.data.access_token,
          refresh_token: tokenResponse.data.refresh_token,
        })
      }
    } catch (error) {
      console.log('===>in api/index.js inside /connect/token  in error')
      return res.status(400).send({ error: 'Bad Request' })
    }
  }
})

app.get('/connect/userinfo', async (req, res) => {
  let userData
  console.log('===>in api/index.js inside /connect/userinfo  in req:', req)
  console.log('===>in api/index.js inside /connect/userinfo  in res:', res)
  const urls = getTokenUserInfoUrl(req.query)
  console.log('===>in api/index.js inside /connect/userinfo  in urls:', urls)
  const config = {
    headers: {
      Authorization: req.headers.authorization,
    },
  }
  console.log(
    '===>in api/index.js inside /connect/userinfo  in config:',
    config
  )
  try {
    if (req.query.provider === 'google') {
      const userResponse = await axios.get(
        `${
          urls.userInfoEndPointUrl
        }?id_token=${req.headers.authorization.replace('Bearer ', '')}`
      )
      userData = userResponse.data
      console.log(
        '===>in api/index.js inside /connect/userinfo  in userResponse:',
        userData
      )
    } else {
      const userResponse = await axios.get(urls.userInfoEndPointUrl, config)
      userData = userResponse.data
      console.log(
        '===>in api/index.js inside /connect/userinfo else in userResponse:',
        userData
      )
    }
    const userOrgsDetails = await fetchUserOrgsDetails(req)
    console.log(
      '===>in api/index.js inside /connect/userinfo else in userOrgsDetails:',
      userOrgsDetails
    )
    const userDetails = {
      ...userOrgsDetails,
      ...userData,
    }
    res.json({
      status: 200,
      data: userDetails,
    })
  } catch (error) {
    return res.status(404).send({ error })
  }
})

function getAxiosConfig(req) {
  console.log(
    '===>in api/index.js inside /connect/userinfo else in getAxiosConfig req.headers.authorization:',
    req.headers.authorization
  )
  return {
    headers: {
      Authorization: req.headers.authorization,
    },
  }
}

function getApiUrl(req) {
  const host = req.get('host')
  const protocol = req.protocol
  console.log('===>in api/index.js inside  getApiUrl host:', host)
  console.log('===>in api/index.js inside getApiUrl protocol:', protocol)
  if (host && host.includes('localhost')) {
    return `${protocol}://${nuxtconfig.axios.backendBaseUrl}`
  }
  return `${protocol}://${host}`
}

async function fetchUserOrgs(req) {
  console.log('===>in api/index.js inside fetchUserOrgs req:', req)
  const origin = getApiUrl(req)
  const config = getAxiosConfig(req)
  const apiEndpoint = nuxtconfig.axios.apiEndpoint
  console.log('===>in api/index.js inside fetchUserOrgs origin:', origin)
  console.log('===>in api/index.js inside fetchUserOrgs config:', config)
  console.log(
    '===>in api/index.js inside fetchUserOrgs apiEndpoint:',
    apiEndpoint
  )
  let userOrgList = {}
  try {
    const orgResponse = await axios.get(
      `${origin}${apiEndpoint}Organizations/list`,
      config
    )
    userOrgList = orgResponse.data
    console.log(
      '===>in api/index.js inside fetchUserOrgs userOrgList:',
      userOrgList
    )
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
