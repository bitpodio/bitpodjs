<template>
  <newItem :items="items" :refresh="refresh" type="Edit" />
</template>

<script>
import newItem from '../grid/new-item.vue'
export default {
  components: {
    newItem,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
    viewName: {
      type: String,
      required: true,
    },
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
  data() {
    return {
      valid: false,
      editDialog: false,
    }
  },
}
</script>
