<template>
  <div>
    <v-list-item>
      <newItem :refresh="refresh" />
    </v-list-item>
    <v-list-item>
      <addExistingContact :refresh="refresh" />
    </v-list-item>
  </div>
</template>
<script>
import newItem from './new-item.vue'
import addExistingContact from './add-existing-contacts.vue'
export default {
  components: {
    newItem,
    addExistingContact,
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
