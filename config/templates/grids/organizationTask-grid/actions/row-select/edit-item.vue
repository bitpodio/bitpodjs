<template>
  <div>
    <newItem
      :dialog.sync="dialog"
      button-icon="mdi-calendar-edit"
      :items="items"
      :refresh="refresh"
      type="Edit"
    />
  </div>
</template>
<script>
import newItem from '../grid/new-item.vue'
export default {
  components: {
    newItem,
  },
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
    items: {
      type: Object,
      default: () => {},
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
