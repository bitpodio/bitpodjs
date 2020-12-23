<template>
  <div>
    <deleteItem :items="items" :context="context" :refresh="refresh" />
    <assignRole :items="items" :context="context" :refresh="refresh" />
  </div>
</template>

<script>
import assignRole from './assignRole.vue'
import deleteItem from './delete-item.vue'
export default {
  components: {
    deleteItem,
    assignRole,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  mounted() {
    this.$emit('has-custom-row-action', true)
  },
}
</script>
