<template>
  <div>
    <div v-if="item.isPercent === true">{{ value }}%</div>
    <div v-else>
      {{ value }}
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
    value: {
      type: String,
      default: '',
      required: false,
    },
  },
}
</script>
