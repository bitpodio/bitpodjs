<template>
  <v-checkbox v-model="checkbox" @change="updateRegistrationType"></v-checkbox>
</template>

<script>
import nuxtconfig from '../../../../nuxt.config'
export default {
  props: ['item', 'value', 'context', 'refresh'],
  data() {
    return {
      checkbox: this.item.AllowMultiple,
    }
  },
  methods: {
    updateRegistrationType() {
      this.$axios
        .$put(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/RegistrationTypes/${this.item.id}`,
          {
            AllowMultiple: this.checkbox,
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
