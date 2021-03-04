<template>
  <div class="positionRelative ps-top6">
    <div v-if="item.isShowField === true">
      <v-checkbox
        v-model="checkbox"
        success
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateRegForm"
      ></v-checkbox>
    </div>
    <div v-else>
      <v-checkbox
        v-model="checkbox"
        error
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
  data() {
    return {
      checkbox: this.item.isShowField,
    }
  },
  methods: {
    async updateRegForm() {
      event.stopPropagation()
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$put(
          `${url}Events/${this.$route.params.id}/RegistrationForm/${this.item.id}`,
          {
            isShowField: this.checkbox,
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
