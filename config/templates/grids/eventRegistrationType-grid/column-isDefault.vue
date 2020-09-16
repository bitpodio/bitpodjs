<template>
  <v-checkbox v-model="checkbox" @change="updateRegistrationType"></v-checkbox>
</template>

<script>
import nuxtconfig from '../../../../nuxt.config'
export default {
  props: ['item', 'value', 'context', 'refresh'],
  data() {
    return {
      checkbox: this.item.isDefault,
    }
  },
  methods: {
    updateRegistrationType() {
      this.$axios
        .$put(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/RegistrationTypes/${this.item.id}`,
          {
            isDefault: this.checkbox,
          }
        )
        .then((res) => {
          this.refresh()
          return res
        })
        .catch((e) => {
          console.log('error', e)
        })
    },
  },
}
</script>
