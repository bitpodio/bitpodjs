<template>
  <v-flex class="d-flex flex-wrap greybg pa-0 justify-center justify-md-start">
    <v-card
      v-for="item in items"
      :key="item.id"
      class="ma-3 ml-0 mt-0 greybg elevation-0 badge-view positionRelative"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="item.Template" />
      <div class="positionAbsolute box-actions">
        <v-btn icon small v-bind="attrs" v-on="on">
          <v-icon class="fs-16">fa-pencil</v-icon>
        </v-btn>
        <v-btn icon small v-bind="attrs" v-on="on">
          <v-icon class="fs-16">fa-trash</v-icon>
        </v-btn>
      </div>
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
  padding-top: 20px !important;
  overflow: hidden !important;
}
.badge-view img {
  max-width: 90px !important;
}
.box-actions {
  top: 2px;
  right: 2px;
  display: none !important;
}
.positionRelative:hover .box-actions {
  display: block !important;
}
</style>
