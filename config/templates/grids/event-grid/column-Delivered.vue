<template>
  <div>
    <div v-if="item.Delivered === true">
      <v-icon>mdi-send</v-icon>
    </div>
    <div v-else>
      <v-icon></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  computed: {},
}
</script>
