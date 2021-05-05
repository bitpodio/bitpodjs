<template>
  <div class="greybg">
    <v-row class="ma-0">
      <v-col
        v-for="item in items"
        :key="item.id"
        class="pa-4 pl-0 pt-0 eventtiles ma-sm-4 ml-sm-0 mt-sm-0 mx-auto my-2"
      >
        {{ item.createdBy }}
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
    offset: { type: Boolean, default: false },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
}
</script>
