<template>
  <div class="container">
    <h1 class="text-h3">Access not granted</h1>
    <p class="mt-2">
      <span v-if="$auth.$state.loggedIn">
        You are logged in as
        <span class="primary--text">{{ $nuxt.$auth.user.data.email }}</span
        >.
      </span>
      Please contact support to request access<span
        v-if="$auth.$state.loggedIn"
      >
        or click the logout button below to log into a different account</span
      >.
    </p>
    <v-btn
      v-if="$auth.$state.loggedIn"
      :loading="loggingOut"
      :disabled="loggingOut"
      color="primary"
      class="mt-2"
      @click="onLogout"
    >
      <i18n path="Common.Logout" />
    </v-btn>
  </div>
</template>

<script>
export default {
  layout: 'only-page',
  data() {
    return {
      loggingOut: false,
    }
  },
  methods: {
    async onLogout() {
      this.loggingOut = true
      this.$auth.logout()
      await this.$apolloHelpers.onLogout()
    },
  },
}
</script>

<style scoped>
.container {
  min-height: 70vh;
}
</style>
