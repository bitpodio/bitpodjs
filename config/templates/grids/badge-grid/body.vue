<template>
  <v-flex class="d-flex flex-wrap greybg pa-0 justify-center justify-md-start">
    <v-card
      v-for="item in items"
      :key="item.id"
      class="ma-3 ml-0 mt-0 greybg elevation-0 badge-view positionRelative"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="item.Template" />
      <div class="d-flex positionAbsolute">
        <v-btn icon small v-bind="attrs" class="fs-16" v-on="on">
          <v-icon>fa-pencil</v-icon>
        </v-btn>
        <v-btn icon small v-bind="attrs" class="fs-16" v-on="on">
          <v-icon>fa-trash</v-icon>
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
  padding-top: 2px !important;
}
.box-actions {
  top: 5px;
  right: 5px;
  display: none;
}
.positionRelative:hover .box-actions {
  display: block;
}
</style>
