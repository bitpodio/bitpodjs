<template>
  <div>
    <v-list-item>
      <addAssociatedMember :refresh="refresh" />
    </v-list-item>
  </div>
</template>
<script>
import addAssociatedMember from './add-associated-member.vue'
export default {
  components: {
    addAssociatedMember,
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
