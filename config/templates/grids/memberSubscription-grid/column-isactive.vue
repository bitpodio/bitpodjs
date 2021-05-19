<template>
  <div class="positionRelative ps-top6">
    <div>
      <v-checkbox
        v-model="item.isActive"
        :success="item.isActive"
        :error="!item.isActive"
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateActiveForm"
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
    async updateActiveForm() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$patch(
          `${url}ProductSubscriptions/${this.item.id}`,
          {
            isActive: this.item.isActive,
          }
        )
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.error(
          `Error in templates/grids/memberSubscription-grid/column-isactive.vue while making a PATCH call to ProductSubscriptions model from method updateActiveForm context:-URL:${url}`,
          e
        )
      }
    },
  },
}
</script>
