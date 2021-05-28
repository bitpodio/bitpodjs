<template>
  <div>
    <v-list-item>
      <newItem :refresh="refresh" />
    </v-list-item>
    <v-list-item>
      <registrationType />
    </v-list-item>
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
      default: '',
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
  mounted() {
    this.$emit('has-custom-grid-action', true)
  },
}
</script>
<style scoped>
@media (min-width: 600px) {
  .pad-right {
    margin-right: 150px;
  }
}
</style>
