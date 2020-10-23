<template>
  <div>{{ `${item.Duration} min` }}</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
}
</script>
