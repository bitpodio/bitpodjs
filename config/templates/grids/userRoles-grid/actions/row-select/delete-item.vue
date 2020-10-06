<template>
  <div>
    <v-col class="px-0">
      <v-btn text small v-bind="attrs" v-on="on" @click="onDelete">
        <v-icon left>mdi-delete</v-icon>Delete
      </v-btn>
    </v-col>
    <v-snackbar v-model="snackbar" timeout="2000" top="true">
      Item deleted successfully.

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { getApiUrl } from '~/utility'
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
    }
  },
  methods: {
    async onDelete() {
      const url = getApiUrl()
      try {
        const res = await this.$axios.$delete(
          `${url}Organizations/${this.items[0].orgId}/Users/${this.items[0].email}
        `
        )

        this.snackbar = true
        this.refresh()
        return res
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
