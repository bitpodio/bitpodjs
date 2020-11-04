<template>
  <div class="positionRelative position">
    <confirm ref="confirm"></confirm>
    <div v-if="item.CheckIn">
      <v-chip
        class="ma-2"
        color="orange"
        text-color="white"
        label
        small
        @click="updateDate"
      >
        <i18n path="Common.CancelCheckin" />
      </v-chip>
    </div>
    <div v-else>
      <v-icon></v-icon>
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
  methods: {
    async updateDate() {
      const res = await this.$refs.confirm.open(
        'Cancel Checkin',
        'are you sure, you want to cancel check in?',
        { color: 'warning' }
      )
      const url = this.$bitpod.getApiUrl()
      if (res) {
        try {
          const res = await this.$axios.$put(`${url}Attes/${this.item.id}`, {
            CheckIn: null,
          })
          if (res) {
            this.refresh()
          }
        } catch (e) {
          console.log('Error', e)
        }
      }
    },
  },
}
</script>
<style scoped>
.position {
  right: 10px;
}
</style>
