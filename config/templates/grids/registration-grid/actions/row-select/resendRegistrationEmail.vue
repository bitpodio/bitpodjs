<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click="confirmResendMail">
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
    viewName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      snackbar: false,
      timeout: 3000,
    }
  },
  mounted() {
    this.$eventBus.$on('resend-reg-email', this.resendRegistrationEmail)
  },
  beforeDestroy() {
    this.$eventBus.$off('resend-reg-email')
  },
  methods: {
    confirmResendMail() {
      debugger
      this.$eventBus.$emit(
        'toggle-confirm',
        this.viewName,
        'resend-reg-email',
        {
          title: this.$t('Common.ResendRegistrationEmail'),
          message: this.$t('Messages.Warn.ConfirmResendRegistrationEmail'),
          options: { color: 'warning' },
        }
      )
    },
    async resendRegistrationEmail() {
      const regIds = this.items.map((e) => e.id)
      const url = this.$bitpod.getApiUrl()
      const URL = `${url}CRMACTIVITIES/cloneActivityForResendEmail`
      try {
        await this.$axios.$post(URL, {
          regIds,
        })
        this.$eventBus.$emit(
          'toggle-snackbar',
          this.viewName,
          this.$t('Common.ConfirmationEmailSent'),
          3000
        )
      } catch (e) {
        console.error(
          `Errors in config/templates/grids/eventegistations-grid/actions/row-select/resendRegistrationEmail.vue on resendRegistrationEmail method context: API: ${URL} \n regIds ${regIds}`,
          e
        )
      }
    },
  }
}
</script>
