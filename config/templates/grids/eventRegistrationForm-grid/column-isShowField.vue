<template>
  <div>
    <div class="checkbox">
      <v-checkbox v-model="checkbox" @change="updateRegForm"></v-checkbox>
    </div>
  </div>
</template>

<script>
import nuxtconfig from '../../../../nuxt.config'
export default {
  props: ['item', 'value', 'context', 'refresh'],
  data() {
    return {
      checkbox: this.item.isShowField,
    }
  },
  methods: {
    updateRegForm() {
      this.$axios
        .$put(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Events/${this.$route.params.id}/RegistrationForm/${this.item.id}`,
          {
            isShowField: this.checkbox,
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
