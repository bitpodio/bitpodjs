<template>
  <newDiscountForm :refresh="refresh" />
</template>

<script>
import newDiscountForm from '../form.vue'
export default {
  components: {
    newDiscountForm,
  },
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
}
</script>
