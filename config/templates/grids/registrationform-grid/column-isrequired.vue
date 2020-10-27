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
      checkbox: this.item.isRequired,
    }
  },
  methods: {
    async updateRegForm() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$put(
          `${url}RegistrationForms/${this.item.id}`,
          {
            isRequired: this.checkbox,
          }
        )
        if (res) {
          return res
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/registrationform-grid/column-isrequired.vue while making a PUT call to RegistrationForm model from method updateRegForm context:-URL:-${url}RegistrationForms/${this.item.id}\n `,
          e
        )
      }
    },
  },
}
</script>
