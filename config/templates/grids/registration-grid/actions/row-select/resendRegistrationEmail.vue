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
      alert('are you sure, you want to resend confirmation emails ?')
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
    },
  },
}
</script>
