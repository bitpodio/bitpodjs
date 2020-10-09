<template>
  <div class="positionRelative ps-top6">
    <div v-if="item.Default === true">
      <v-checkbox
        v-model="checkbox"
        success
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateBussinessUnit"
      ></v-checkbox>
    </div>
    <div v-else>
      <v-checkbox
        v-model="checkbox"
        error
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateBussinessUnit"
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
      checkbox: this.item.Default,
    }
  },
  methods: {
    async updateBussinessUnit() {
      try {
        const res = await this.$axios.$patch(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Locations/${this.item.id}`,
          {
            Default: this.checkbox,
          }
        )
        if (res) {
          return res
        }
      } catch (e) {
        console.log(
          'Error in organizationBussinessUnit-grid/column-default  Default ' +
            this.checkbox +
            'Error ' +
            e
        )
      }
    },
  },
}
</script>
