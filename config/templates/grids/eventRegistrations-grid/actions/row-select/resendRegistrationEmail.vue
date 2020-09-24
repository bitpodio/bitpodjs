<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" top="true"
      ><div class="text-center">Confirmation Email Sent</div></v-snackbar
    >
    <v-btn text small v-bind="attrs" v-on="on" @click="resendRegistrationEmail">
      <v-icon left>mdi-email-outline</v-icon> Resend Registration Email
    </v-btn>
  </v-col>
</template>
<script>
import nuxtconfig from '~/nuxt.config'
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      snackbar: false,
      timeout: 1000,
    }
  },
  methods: {
    async resendRegistrationEmail() {
      const regIds = this.items.map((e) => e.id)
      alert('are you sure, you want to resend confirmation emails ?')
      try {
        const res = await this.$axios.$post(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/CRMACTIVITIES/cloneActivityForResendEmail`,
          {
            regIds,
          }
        )
        if (res) {
          this.snackbar = true
          this.refresh()
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
  },
}
</script>
