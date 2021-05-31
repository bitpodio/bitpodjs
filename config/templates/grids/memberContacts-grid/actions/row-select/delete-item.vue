<template>
  <div>
    <v-col class="px-0">
      <v-btn text small v-bind="attrs" v-on="on" @click="onDeleteItem">
        <v-icon left class="fs-16">fa-trash</v-icon
        ><i18n path="Drawer.Delete" />
      </v-btn>
    </v-col>
    <v-snackbar v-model="snackbar" timeout="3000" top="true">
      <div class="text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
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
      snackbar: false,
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
  methods: {
    onDeleteItem() {
      this.items.forEach((ele) => {
        this.deleteItems(ele.id)
      })
    },
    async deleteItems(id) {
      const url = this.$bitpod.getApiUrl()
      try {
        await this.$axios.$delete(
          `${url}Customers/${this.$route.params.id}/CutomerContact/${id}`
        )
        this.snackbarText = this.$t('Messages.Success.DeleteSuccess', {
          modelName: 'Contact',
        })
        this.snackbar = true
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
