<template>
  <v-checkbox
    v-model="checkbox"
    color="green"
    dense
    @change="updateRegForm"
  ></v-checkbox>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
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
      try {
        const res = await this.$axios.$put(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/RegistrationForms/${this.item.id}`,
          {
            isRequired: this.checkbox,
          }
        )
        if (res) {
          return res
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
  },
}
</script>
