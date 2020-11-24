<template>
  <div>
    <v-list-item>
      <newItem />
    </v-list-item>
    <v-list-item>
      <newAction />
    </v-list-item>
    <v-list-item>
      <refresh />
    </v-list-item>
  </div>
</template>
<script>
import newAction from './new-action.vue'
import newItem from './sendEventInvite.vue'
import refresh from './refresh.vue'
export default {
  components: {
    newAction,
    newItem,
    refresh,
  },
  mounted() {
    this.$emit('hasGridOption', true)
  },
}
</script>
