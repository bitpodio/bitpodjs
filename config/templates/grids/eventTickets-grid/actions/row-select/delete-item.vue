<template>
  <div>
    <v-col class="px-0">
      <v-btn text small v-bind="attrs" v-on="on" @click="onDeleteItem">
        <v-icon left class="fs-16">fa-trash</v-icon>Delete
      </v-btn>
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="timeout" top="true"
      ><div class="text-center">Record Deleted Successfully</div></v-snackbar
    >
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
  watch: {
    snackbar(newVal) {
      if (!newVal) {
        this.refresh()
      }
    },
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
      snackbarText: '',
      timeout: 1000,
      test: 'querty',
    }
  },

  methods: {
    async onDeleteItem() {
      const url = getApiUrl()
      const check = confirm('Are you sure you want to delete this ticket?')
      try {
        if (check) {
          await this.$axios.$delete(`${url}Tickets/${this.items[0].id}`)
          this.snackbar = true
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
