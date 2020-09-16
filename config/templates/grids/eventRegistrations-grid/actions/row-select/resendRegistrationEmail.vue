<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar">Confirmation Email Sent</v-snackbar>
    <v-btn text small v-bind="attrs" v-on="on" @click="resendRegistrationEmail">
      <v-icon left>mdi-email-outline</v-icon> Resend Registration Email
    </v-btn>
  </v-col>
</template>
<script>
import nuxtconfig from '../../../../../../nuxt.config'
export default {
  props: ['items', 'value', 'context', 'refresh'],
  data() {
    return {
      snackbar: false,
    }
  },
  methods: {
    resendRegistrationEmail() {
      const regIds = this.items.map((e) => e.id)
      alert('are you sure, you want to resend confirmation emails ?')
      this.$axios
        .$post(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/CRMACTIVITIES/cloneActivityForResendEmail`,
          {
            regIds,
          }
        )
        .then((res) => {
          this.snackbar = true
          this.refresh()
          return res
        })
        .catch((e) => {
          console.log('error', e)
        })
    },
  },
}
</script>
