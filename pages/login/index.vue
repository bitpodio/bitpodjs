<template>
  <div>
    <div>
      <v-btn class="login-button" @click="loginBitpod">
        Login with Bitpod
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  methods: {
    async loginBitpod() {
      return await this.$auth.loginWith('bitpod')
    },
  },
}
</script>
