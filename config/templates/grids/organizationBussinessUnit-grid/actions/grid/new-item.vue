<template>
  <newForm :refresh="refresh" />
</template>

<script>
import newForm from '../form.vue'
export default {
  components: {
    newForm,
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
