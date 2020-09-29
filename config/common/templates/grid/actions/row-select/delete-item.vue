<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click="onDelete">
      <v-icon left class="fs-16">fa-trash</v-icon>{{ actionCaption('delete') }}
    </v-btn>
  </v-col>
</template>

<script>
import { gridActionMixin } from '~/utility/form'

export default {
  mixins: [gridActionMixin],
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
