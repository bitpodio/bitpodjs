<template>
  <div class="positionRelative ps-top6">
    <div v-if="item.isActive === true">
      <v-checkbox
        v-model="checkbox"
        success
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateOfferCode"
      ></v-checkbox>
    </div>
    <div v-else>
      <v-checkbox
        v-model="checkbox"
        error
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateOfferCode"
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
  data() {
    return {
      checkbox: this.item.isActive,
    }
  },
  methods: {
    async updateOfferCode() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$put(`${url}OfferCodes/${this.item.id}`, {
          isActive: this.checkbox,
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
