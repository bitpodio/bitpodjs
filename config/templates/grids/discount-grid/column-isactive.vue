<template>
  <div class="positionRelative ps-top6">
    <div>
      <v-checkbox
        v-model="checkbox"
        :success="item.isActive ? true : false"
        :error="item.isActive ? false : true"
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateRegForm"
      ></v-checkbox>
    </div>
  </div>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
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
    async updateRegForm() {
      try {
        const res = await this.$axios.$put(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/OfferCodes/${this.item.id}`,
          {
            isActive: this.checkbox,
          }
        )
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
