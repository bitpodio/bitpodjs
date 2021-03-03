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
  methods: {
    async updateRegForm() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$put(`${url}OfferCodes/${this.item.id}`, {
          isActive: this.item.isActive,
        })
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
  },
}
</script>
