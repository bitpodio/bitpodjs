<template>
  <div class="positionRelative ps-top6">
    <div>
      <v-checkbox
        v-model="item.AutoRenew"
        :success="item.AutoRenew"
        :error="!item.AutoRenew"
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateAutoRenewForm"
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
  methods: {
    async updateAutoRenewForm() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$patch(
          `${url}ProductSubscriptions/${this.item.id}`,
          {
            AutoRenew: this.item.AutoRenew,
          }
        )
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.error(
          `Error in templates/grids/memberSubscription-grid/column-autorenew.vue while making a PATCH call to ProductSubscriptions model from method updateAutoRenewForm context:-URL:${url}`,
          e
        )
      }
    },
  },
}
</script>
