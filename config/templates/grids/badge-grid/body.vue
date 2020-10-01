<template>
  <v-flex class="d-flex flex-wrap greybg pa-0 justify-center justify-md-start">
    <v-card
      v-for="item in items"
      :key="item.id"
      class="ma-3 ml-0 mt-0 greybg elevation-0 badge-view"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="item.Template" />
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: { items: { type: Array, default: () => [] } },
}
</script>

<style>
.badge-view > div > div {
  background: #fff;
  margin: 0 !important;
  padding: 0 !important;
  padding-top: 2px !important;
}
</style>
