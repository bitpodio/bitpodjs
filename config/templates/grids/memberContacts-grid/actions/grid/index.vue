<template>
  <div>
    <v-list-item>
      <newItem :refresh="refresh" />
    </v-list-item>
  </div>
</template>
<script>
import newItem from './new-item.vue'
export default {
  components: {
    newItem,
  },
  props: {
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
}
</script>
