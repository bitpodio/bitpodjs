<template>
  <editForm :is-edit="true" :item="items" :refresh="refresh" />
</template>

<script>
import editForm from '../form.vue'
export default {
  components: {
    editForm,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
}
</script>
