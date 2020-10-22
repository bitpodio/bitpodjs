<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true"
      ><div class="text-center">
        <i18n path="Common.ConfirmationEmailSent" /></div
    ></v-snackbar>
    <v-btn text small v-bind="attrs" v-on="on" @click="resendRegistrationEmail">
      <v-icon left>mdi-email-outline</v-icon>
      <i18n path="Common.ResendRegistrationEmail" />
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
      const URL = `https://${nuxtconfig.axios.eventUrl}/svc/api/CRMACTIVITIES/cloneActivityForResendEmail`
      alert('are you sure, you want to resend confirmation emails ?')
      try {
        const res = await this.$axios.$post(URL, {
          regIds,
        })
        if (res === '') {
          this.snackbar = true
          this.$parent.$parent.refresh()
        }
      } catch (e) {
        console.error(
          `Errors in config/templates/grids/eventegistations-grid/actions/row-select/resendRegistrationEmail.vue on resendRegistrationEmail method context: API: ${URL} \n regIds ${regIds}`,
          e
        )
      }
    },
  },
}
</script>
