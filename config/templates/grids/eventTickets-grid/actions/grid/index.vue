<template>
  <div class="d-flex">
    <newItem :refresh="refresh" />
    <registrationType />
  </div>
</template>

<script>
import registrationType from './registrationType'
import newItem from './new-item.vue'
export default {
  components: {
    registrationType,
    newItem,
  },
  props: {
    viewName: {
      type: String,
      required: false,
    },
    content: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
    onNewItemSave: {
      type: Function,
      default: () => false,
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
}
</script>
