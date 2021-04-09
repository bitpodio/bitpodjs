<template>
  <div>
    <div v-if="item.isRegistered === true">
      <v-icon class="success--text fs-18">mdi-thumb-up-outline</v-icon>
    </div>
    <div v-else>
      <v-icon color="error"></v-icon>
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
