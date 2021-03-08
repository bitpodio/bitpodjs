<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true" width="2px"
      ><div class="fs-16 text-center">
        <i18n path="Common.ConfirmationEmailSent" /></div
    ></v-snackbar>
    <v-btn text small v-bind="attrs" v-on="on" @click="resendRegistrationEmail">
      <v-icon left>mdi-email-outline</v-icon>
      <i18n path="Common.ResendRegistrationEmail" />
    </v-btn>
    <confirm ref="resendEmailConfirm"></confirm>
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
      debugger
      const regIds = this.items.map((e) => e.id)
      const res = await this.$refs.resendEmailConfirm.open(
        this.$t('Common.NewBadge'),
        this.$t('Messages.Warn.ReplaceBadge'),
        { color: 'warning' }
      )
      // console.log('===>112',res)
      // const confirmResend = await this.$refs.confirm.open(
      //   this.$t('Common.ResendRegistrationEmail'),
      //   this.$t('Messages.Warn.ConfirmResendRegistrationEmail'),
      //   { color: 'warning' }
      // )
      // console.log('asd==>', confirmResend)
      // if (res) {
        try {
          await this.$axios.$post(
            `${this.$bitpod.getApiUrl()}CRMACTIVITIES/cloneActivityForResendEmail`,
            {
              regIds,
            }
          )
          this.snackbar = true
        } catch (e) {
          console.error(
            `Errors in config/templates/grids/registations-grid/actions/row-select/resendRegistrationEmail.vue on resendRegistrationEmail method context: regIds ${regIds}`,
            e
          )
        }
      }
    },
  // },
}
</script>
