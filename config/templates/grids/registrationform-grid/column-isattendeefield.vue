<template>
  <div class="positionRelative ps-top6">
    <div>
      <v-checkbox
        v-model="checkbox"
        color="green"
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateRegForm"
      ></v-checkbox>
    </div>
  </div>
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
