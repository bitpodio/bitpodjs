<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click="onDelete">
      <v-icon left>mdi-delete</v-icon>Delete
    </v-btn>
  </v-col>
</template>

<script>
export default {
  props: ['content', 'viewName', 'items', 'onDeleteItem', 'context'],
  data() {
    return {
      dialog: false,
      updateCount: 0,
    }
  },
  methods: {
    async onDelete() {
      const res = confirm('Are you sure, You want to delete?')
      if (res) {
        const ids = this.items.map(({ id }) => id)
        await this.onDeleteItem(ids)
      }
    },
  },
}
</script>
