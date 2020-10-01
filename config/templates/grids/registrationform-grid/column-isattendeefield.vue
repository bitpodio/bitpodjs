<template>
  <div>
    <div v-if="item.isAttendeeField === true">
      <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
    </div>
    <div v-else>
      <v-icon color="error">mdi-checkbox-blank-outline</v-icon>
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
