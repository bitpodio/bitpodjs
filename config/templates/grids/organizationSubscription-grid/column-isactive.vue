<template>
  <div>
    <div v-if="item.isActive === true">
      <v-icon color="green">fa-check</v-icon>
    </div>
    <div v-else>
      <v-icon color="red">fa-close</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: null,
      default: null,
    },
    value: {
      type: null,
      default: null,
    },
    context: {
      type: null,
      default: null,
    },
  },
}
</script>
