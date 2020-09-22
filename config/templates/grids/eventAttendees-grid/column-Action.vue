<template>
  <div>
    <div v-if="item.CheckIn">
      <v-chip
        class="ma-2"
        color="orange"
        text-color="white"
        label
        small
        @click="updateDate"
      >
        Cancel Checkin
      </v-chip>
    </div>
    <div v-else>
      <v-icon></v-icon>
    </div>
  </div>
</template>

<script>
import nuxtconfig from '../../../../nuxt.config'
export default {
  props: ['item', 'value', 'context', 'refresh'],
  methods: {
    updateDate() {
      confirm('are you sure, you want to cancel check in?')
      this.$axios
        .$put(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Attes/${this.item.id}`,
          {
            CheckIn: null,
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
