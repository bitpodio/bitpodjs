<template>
  <div class="positionRelative ps-top6">
    <div v-if="item.AllowMultiple === true">
      <v-checkbox
        v-model="checkbox"
        success
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateRegistrationType"
      ></v-checkbox>
    </div>
    <div v-else>
      <v-checkbox
        v-model="checkbox"
        error
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateRegistrationType"
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
      checkbox: this.item.AllowMultiple,
    }
  },
  watch: {
    'item.AllowMultiple': function (newVal) {
      this.checkbox = newVal
    },
  },
  methods: {
    async updateRegistrationType() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$put(
          `${url}RegistrationTypes/${this.item.id}`,
          {
            AllowMultiple: this.checkbox,
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
