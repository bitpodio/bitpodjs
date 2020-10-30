<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true"
      ><div class="text-center">Confirmation Email Sent</div></v-snackbar
    >
    <v-btn text small v-bind="attrs" v-on="on" @click="resendRegistrationEmail">
      <v-icon left>mdi-email-outline</v-icon> Resend Registration Email
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
      const url = this.$bitpod.getApiUrl()
      const URL = `${url}CRMACTIVITIES/cloneActivityForResendEmail`
      alert('are you sure, you want to resend confirmation emails ?')
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
    },
  },
}
</script>
