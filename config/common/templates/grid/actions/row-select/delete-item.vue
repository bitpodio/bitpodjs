<template>
  <div>
    <v-btn color="primary" dark @click="onDelete">
      Delete
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ['content', 'viewName', 'items', 'onDeleteItem'],
  data() {
    return {
      dialog: false,
      updateCount: 0,
    }
  },
  methods: {
    async onDelete() {
      const ids = this.items.map(({ id }) => id)
      const userDeleted = await this.onDeleteItem(ids)
      console.log(userDeleted)
    },
  },
}
</script>
