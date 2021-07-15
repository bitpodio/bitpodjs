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
      timeout: 3000,
      modelName: 'Contact',
      snackbarText: '',
    }
  },
  watch: {
    snackbar(newVal) {
      if (!newVal) {
        this.refresh()
      }
    },
  },
  mounted() {
    this.$eventBus.$on('delete-sponsor', this.onDeleteItem)
  },
  beforeDestroy() {
    this.$eventBus.$off('delete-sponsor')
  },
  methods: {
    confirmDelete() {
      this.$eventBus.$emit('toggle-confirm', this.viewName, 'delete-sponsor', {
        title: this.$tc('Messages.Warn.DeleteSponsor'),
        message: this.$tc('Messages.Warn.DeleteWarning', this.items.length, {
          subTitle: 'sponsor',
        }),
        options: { color: 'error lighten-1' },
      })
    },
    onDeleteItem() {
      this.getEvents()
    },
    async getEvents() {
      const url = this.$bitpod.getApiUrl()
      try {
        const getEvent = await this.$axios.$get(
          `${url}Events/${this.$route.params.id}`
        )
        if (getEvent) {
          const contacts = getEvent.contactlist
          const selectedList = this.items.map((e) => {
            return e.id
          })
          const finalContacts = contacts.filter((e) => {
            if (!selectedList.includes(e)) {
              return e
            }
          })
          this.deleteItems(finalContacts)
        }
      } catch (e) {
        console.error(
          `Error in templates/grids/eventSponsor-grid/actions/grid/row-select/delete-item.vue while making a DELETE call to Tickets model from method onDeleteItem \ncontext:-URL:-${url}\n DeletedItemId:-${this.items[0].id} `,
          e
        )
      }
    },
    async deleteItems(contactsArray) {
      const url = this.$bitpod.getApiUrl()
      const obj = { contactlist: contactsArray }
      try {
        const res = await this.$axios.$patch(
          `${url}Events/${this.$route.params.id}`,
          obj
        )
        if (res) {
          this.$eventBus.$emit(
            'toggle-snackbar',
            this.viewName,
            this.$t('Messages.Success.DeletedSuccessfully', {
              modelName: 'Contact',
            }),
            3000
          )
        }
      } catch (e) {
        console.error(
          `Error in templates/grids/eventSponsor-grid/actions/grid/row-select/delete-item.vue while making a DELETE call to Tickets model from method onDeleteItem \ncontext:-URL:-${url}\n DeletedItemId:-${this.items[0].id} `,
          e
        )
      }
    },
  },
}
</script>
