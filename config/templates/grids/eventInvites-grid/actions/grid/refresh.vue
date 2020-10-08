<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click="refreshInvites">
      <v-icon left>fa-refresh-ccw</v-icon> Refresh
    </v-btn>
  </v-col>
</template>
<script>
export default {
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
  methods: {
    refreshInvites() {
      this.$parent.$parent.refresh()
    },
  },
}
</script>
