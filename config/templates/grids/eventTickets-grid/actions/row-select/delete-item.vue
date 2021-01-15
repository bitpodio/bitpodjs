<template>
  <div>
    <v-col class="px-0">
      <v-btn text small v-bind="attrs" v-on="on" @click.stop="confirmDelete">
        <v-icon left class="fs-16">fa-trash</v-icon
        ><i18n path="Drawer.Delete" />
      </v-btn>
    </v-col>
  </div>
</template>

<script>
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
      test: 'querty',
    }
  },
  mounted() {
    this.$eventBus.$on('delete-ticket', this.onDeleteItem)
  },
  beforeDestroy() {
    this.$eventBus.$off('delete-ticket')
  },
  methods: {
    confirmDelete() {
      this.$eventBus.$emit('toggle-confirm', this.viewName, 'delete-ticket', {
        title: this.$t('Common.DeleteTicket'),
        message: this.$t('Messages.Warn.DeleteTicket'),
        options: { color: 'error lighten-1' },
      })
    },
    async onDeleteItem() {
      const url = this.$bitpod.getApiUrl()
      try {
        await this.$axios.$delete(`${url}Tickets/${this.items[0].id}`)
        this.$eventBus.$emit(
          'toggle-snackbar',
          this.viewName,
          this.$t('Common.TicketDeletedSuccessfully'),
          1000
        )
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
