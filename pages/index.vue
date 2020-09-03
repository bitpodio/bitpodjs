<template>
  <v-layout column justify-center align-center class="login-view">
    <v-flex xs12 sm8 md6 class="login-box">
      <v-card class="elevation-0 login-type">
        <v-card-title class="headline justify-center">
          Login
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
              <img
                src="https://res.cloudinary.com/mytestlogo/image/upload/v1578310772/logo/logo-favicon.png"
              />
            </v-avatar>
            Sign in with Bitpod
          </v-btn>
          <v-flex justify-center align-center d-flex class="ma-2">or</v-flex>
          <v-btn
            block
            class="mt-3 grey--text text-darken-3"
            tile
            outlined
            large
            color="grey"
          >
            <v-avatar>
              <img
                src="https://res.cloudinary.com/mytestlogo/platformbar/google.png"
                class="login-google"
              />
            </v-avatar>
            Sign in with Google
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
  methods: {
    async loginBitpod() {
      return await this.$auth.loginWith('bitpod')
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
</style>
