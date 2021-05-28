<template>
  <div>
    <v-list-item>
      <newItem :refresh="refresh" />
    </v-list-item>
    <v-list-item>
      <AddExistingContact :refresh="refresh" />
    </v-list-item>
  </div>
</template>
<script>
import newItem from './new-item.vue'
import AddExistingContact from './add-existing-contacts.vue'
export default {
  components: {
    newItem,
    AddExistingContact,
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
