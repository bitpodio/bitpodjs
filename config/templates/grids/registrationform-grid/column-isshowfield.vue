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
      checkbox: this.item.isShowField,
    }
  },
  methods: {
    async updateRegForm() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$put(
          `${url}RegistrationForms/${this.item.id}`,
          {
            isShowField: this.checkbox,
          }
        )
        if (res) {
          return res
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/registrationform-grid/column-isshowfield.vue while making a PUT call to RegistrationForm model from method updateRegForm context:-URL:-${url}RegistrationForms/${this.item.id}\n `,
          e
        )
      }
    },
  },
}
</script>
