<template>
  <div>
    <v-col class="px-0">
      <v-btn text small v-bind="attrs" v-on="on" @click="onDeleteItem">
        <v-icon left>mdi-delete</v-icon>Delete
      </v-btn>
    </v-col>
    <v-snackbar v-model="snackbar" timeout="1000" top="true">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import { getApiUrl } from '~/utility'
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    viewName: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
      snackbarText: '',
    }
  },

  methods: {
    async onDeleteItem() {
      const url = getApiUrl()
      const check = confirm('Are you sure you want to delete this ticket?')
      try {
        if (check) {
          const res = await this.$axios.$delete(
            `${url}Tickets/${this.items[0].id}`
          )
          if (res) {
            this.snackbar = true
            this.snackbarText = 'Record deleted Successfully'

            this.refresh()
          }
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/eventTickets/actions/grid/row-select/delete-item.vue while making a DELETE call to Tickets model from method onDeleteItem \ncontext:-URL:-${url}\n DeletedItemId:-${this.items[0].id} `,
          e
        )
      }
    },
  },
}
</script>
