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
    this.$eventBus.$on('delete-ticket', this.onDeleteMultipleItems)
  },
  beforeDestroy() {
    this.$eventBus.$off('delete-ticket')
  },
  methods: {
    confirmDelete() {
      this.$eventBus.$emit('toggle-confirm', this.viewName, 'delete-ticket', {
        title: this.$tc('Common.DeleteTicket'),
        message: this.$tc('Messages.Warn.DeleteWarning', this.items.length, {
          subTitle: 'ticket',
        }),
        options: { color: 'error lighten-1' },
      })
    },
    toggleSnackbar() {
      this.$eventBus.$emit(
        'toggle-snackbar',
        this.viewName,
        this.$t('Common.TicketDeletedSuccessfully'),
        1000
      )
    },
    onDeleteMultipleItems() {
      this.items.forEach(async (ele) => {
        await this.onDeleteItem(ele.id)
      })
      setTimeout(() => {
        this.$eventBus.$emit('eventInvites-grid-refresh', this.viewName)
      }, 2000)
    },
    onDeleteItem(id) {
      const url = this.$bitpod.getApiUrl()
      try {
        return this.$axios.$delete(`${url}Tickets/${id}`)
      } catch (err) {
        console.log(
          `Error in templates/grids/eventTickets/actions/grid/row-select/delete-item.vue while making a DELETE call to Tickets model from method onDeleteItem \ncontext:-URL:-${url}\n error:${err}`
        )
      }
    },
  },
}
</script>
