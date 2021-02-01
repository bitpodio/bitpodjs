<template>
  <v-layout column justify-center align-center class="login-view">
    <v-flex xs12 sm8 md6 class="login-box">
      <v-card class="elevation-0 login-type">
        <v-card-title class="headline justify-center">
          <i18n path="Common.Login" />
        </v-card-title>
        <v-card-text class="justify-center text-center pa-6 pt-0">
          <v-btn
            class="mb-3 grey--text text-darken-3"
            tile
            outlined
            large
            block
            @click="loginBitpod"
          >
            <v-avatar>
              <img :src="$config.cdnUri + 'logo-favicon.png'" />
            </v-avatar>
            <i18n path="Common.SignInWithBitpod" />
          </v-btn>
          <v-flex justify-center align-center d-flex class="ma-2"
            ><i18n path="Common.Or"
          /></v-flex>
          <v-btn
            block
            class="mt-3 grey--text text-darken-3"
            tile
            outlined
            large
            color="grey"
            @click="loginGoogle"
          >
            <v-avatar>
              <img :src="$config.cdnUri + 'google.png'" class="login-google" />
            </v-avatar>
            <i18n path="Common.SignInWithGoogle" />
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'logoutlayout',
  components: {},
  async beforeMount(context) {
    debugger
    console.log('context===>', context)
    console.log('router', this.$route)
    // const { redirect } = context
    const publicDomain = this.$config.axios.eventUrl
    const basePath = this.$config.basePublicPath || ''
    const currentOrg = this.$store.state.currentOrg.name || ''
    console.log('publicDomain in login page ===>', publicDomain)
    console.log('basePath in login page ===>', basePath)
    console.log('currentOrg in login page ===>', currentOrg)
    if (this.$store.state.auth.loggedIn) {
      const provider = this.$store.state.auth.strategy
      if (provider === 'bitpod') {
        console.log('inside if provider is google')
        return await this.$auth.loginWith(provider)
      } else {
        console.log('inside else provider is google')
        window.location.replace(
          `https://${publicDomain}${basePath}/forwardLogin?targetDomain=${currentOrg}`
        )

        // return redirect(
        //   `https://${publicDomain}${basePath}/forwardLogin?targetDomain=${currentOrg}`
        // )
      }
    }
  },
  methods: {
    async loginBitpod() {
      if (window.localStorage['auth.redirect']) {
        window.localStorage['auth.redirect'] = ''
      }
      document.cookie = 'auth.redirect=' + ''
      return await this.$auth.loginWith('bitpod')
    },
    async loginGoogle() {
      return await this.$auth.loginWith('google')
    },
  },
}
</script>

<style scoped>
.login-box {
  min-width: 450px;
}
.login-google {
  width: 30px;
  height: auto;
}
.login-view {
  height: calc(100vh - 120px);
}
.login-type {
  border: 1px solid #ddd;
}
@media screen and (max-width: 600px) {
  .login-box {
    min-width: fit-content !important;
  }
}
</style>
