<template>
  <v-checkbox
    v-model="checkbox"
    color="green"
    dense
    @change="updateRegForm"
  ></v-checkbox>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
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
      checkbox: this.item.isAttendeeField,
    }
  },
  methods: {
    async updateRegForm() {
      try {
        const res = await this.$axios.$put(
          `${this.$bitpod.getApiUrl()}RegistrationForms/${this.item.id}`,
          {
            isAttendeeField: this.checkbox,
          }
        )
        if (res) {
          return res
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/registrationform-grid/column-isattendeefield.vue while making a PUT call to RegistrationForm model from method updateRegForm context:-URL:-https://${this.bitpod.getApiUrl()}RegistrationForms/${
            this.item.id
          }\n `,
          e
        )
      }
    },
  },
}
</script>
