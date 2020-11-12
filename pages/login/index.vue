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
  middleware: ['auth'],
  async beforeMount() {
    const provider = this.$route.query.p
    if (provider) {
      return await this.$auth.loginWith(provider)
    }
  },
  methods: {
    clearCookie() {
      console.log('inside clear cookie')
      document.cookie = 'auth.redirect=' + ' '
      console.log('inside clear cookie1', document.cookie)
    },
    async loginBitpod() {
      this.clearCookie()
      this.$auth.logout()
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
