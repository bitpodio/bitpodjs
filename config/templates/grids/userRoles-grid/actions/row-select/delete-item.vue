<template>
  <div>
    <confirm ref="confirm"></confirm>
    <v-col class="px-0">
      <v-btn text small v-bind="attrs" v-on="on" @click="onDelete">
        <v-icon left class="fs-16">fa-trash</v-icon
        ><i18n path="Drawer.Delete" />
      </v-btn>
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="3000" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
    refresh: {
      type: Function,
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
      updateCount: 0,
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
    async onDelete() {
      const url = this.$bitpod.getApiUrl()
      try {
        const check = await this.$refs.confirm.open(
          this.$t('Drawer.DeleteUser'),
          this.$t('Messages.Warn.DeleteUser'),
          { color: 'error lighten-1' }
        )
        if (check === true) {
          const res = await this.$axios.$delete(
            `${url}Organizations/${this.items[0].orgId}/Users/${this.items[0].email}
        `
          )
          this.snackbarText = this.$t('Messages.Success.DeletedSuccessfully')
          this.snackbar = true
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/userRoles-grid/actions/row-select/delete-item.vue while making a DELETE call to Users model from method onDelete context:-URL:-${url}\n OrgId:-${this.items[0].orgId}\n OrganizationId:-${this.$attrs.items[0].orgId}\n UserName:-${this.items[0].email} `,
          e
        )
      }
    },
  },
}
</script>
