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
    <confirm ref="confirm"></confirm>
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
    async onDeleteItem() {
      const res = await this.$refs.confirm.open(
        this.$t('Messages.Warn.DeleteSponsor'),
        this.$t('Messages.Warn.DeleteSponsorMessage'),
        { color: 'error lighten-1' }
      )
      if (res) {
        this.items.forEach((ele) => {
          this.deleteItems(ele.id)
        })
      }
    },
    async deleteItems(id) {
      const url = this.$bitpod.getApiUrl()
      try {
        await this.$axios.$delete(
          `${url}Events/${this.$route.params.id}/contacts/rel/${id}`
        )
        this.snackbarText = this.$t('Messages.Success.DeletedSuccessfully', {
          modelName: 'Contact',
        })
        this.snackbar = true
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
