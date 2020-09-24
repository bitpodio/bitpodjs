<template>
  <div class="d-flex">
    <newItem />
    <newAction />
  </div>
</template>
<script>
import newAction from './new-action.vue'
import newItem from './sendEventInvite.vue'
export default {
  components: {
    newAction,
    newItem,
  },
}
</script>
