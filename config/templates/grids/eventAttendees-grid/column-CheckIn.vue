<template>
  <div>
    <div v-if="item.CheckIn === null">
      <v-chip
        class="ma-2"
        color="blue"
        text-color="white"
        label
        small
        @click="updateDate"
      >
        Check In
      </v-chip>
    </div>
    <div v-else style="display: flex;">
      <v-icon color="success">mdi-check</v-icon>
      <div>Checked in Just now</div>
    </div>
  </div>
</template>

<script>
import nuxtconfig from '../../../../nuxt.config'
export default {
  props: ['item', 'value', 'context', 'tableData', 'refresh'],
  methods: {
    updateDate() {
      this.$axios
        .$put(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Attes/${this.item.id}`,
          {
            CheckIn: new Date(),
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
