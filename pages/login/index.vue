<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="login-box">
      <v-card class="elevation-0">
        <v-card-title class="headline justify-center">
          <i18n path="Common.Login" />
        </v-card-title>
        <v-card-text class="justify-center text-center">
          <v-btn class="ma-2" tile outlined x-large @click="loginBitpod">
            <v-avatar>
              <img :src="$config.cdnUri + 'logo-favicon.png'" />
            </v-avatar>
            <i18n path="Common.SigninwithBitpod" />
          </v-btn>
          <v-flex justify-center align-center d-flex class="ma-2"
            ><i18n path="Common.or"
          /></v-flex>
          <v-btn class="ma-2" tile outlined x-large @click="loginGoogle">
            <v-avatar>
              <img :src="$config.cdnUri + 'google.png'" class="login-google" />
            </v-avatar>
            <i18n path="Common.SigninwithGoogle" />
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
  methods: {
    async loginGoogle() {
      return await this.$auth.loginWith('google')
    },
    async loginBitpod() {
      await this.$auth.loginWith('bitpod')
      let token = this.$auth.strategy.token.get()
      token = token.split(' ')[1]
      await this.$apolloHelpers.onLogin(token)
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
</style>
