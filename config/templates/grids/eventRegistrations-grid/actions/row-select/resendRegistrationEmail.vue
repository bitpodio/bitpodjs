<template>
  <v-col class="px-0">
    <confirm ref="confirm"></confirm>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true" width="2px"
      ><div class="fs-16 text-center">
        <i18n path="Common.ConfirmationEmailSent" /></div
    ></v-snackbar>
    <v-btn text small v-bind="attrs" v-on="on" @click="resendRegistrationEmail">
      <v-icon left>mdi-email-outline</v-icon>
      <i18n path="Common.ResendRegistrationEmail" />
    </v-btn>
  </v-col>
</template>
<script>
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
      timeout: 3000,
    }
  },
  watch: {
    snackbar(newVal) {
      if (!newVal) {
        this.$parent.$parent.refresh()
      }
    },
  },
  methods: {
    async resendRegistrationEmail() {
      const regIds = this.items.map((e) => e.id)
      const url = this.$bitpod.getApiUrl()
      const URL = `${url}CRMACTIVITIES/cloneActivityForResendEmail`
      const confirmResend = await this.$refs.confirm.open(
        this.$t('Common.ResendRegistrationEmail'),
        this.$t('Messages.Warn.ConfirmResendRegistrationEmail'),
        { color: 'warning' }
      )
      if (confirmResend) {
        try {
          await this.$axios.$post(URL, {
            regIds,
          })
          this.snackbar = true
        } catch (e) {
          console.error(
            `Errors in config/templates/grids/eventegistations-grid/actions/row-select/resendRegistrationEmail.vue on resendRegistrationEmail method context: API: ${URL} \n regIds ${regIds}`,
            e
          )
        }
      }
    },
  },
}
</script>
