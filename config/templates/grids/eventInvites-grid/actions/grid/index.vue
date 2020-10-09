<template>
  <div class="d-flex">
    <newItem />
    <newAction />
    <refresh />
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
}
</script>
