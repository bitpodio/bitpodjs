<template>
  <div class="roles-view">
    <v-chip
      v-for="role in roles"
      :key="role"
      close
      class="ma-2"
      @click:close="removeRole(role)"
    >
      {{ role }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      chip: false,
    }
  },
  computed: {
    roles() {
      const r = this.item.rolemappings
      return r.map((e) => e.roleId)
    },
  },

  methods: {
    async removeRole(role) {
      try {
        const res = await this.$axios.$delete(
          `${this.$bitpod.getApiUrl()}Organizations/${
            this.$store.state.currentOrg.id
          }/Users/${this.item.email}/Roles/${role}`
        )
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/userRoles-grid/column-rolemappings.vue while making a delete call to organization model from method removeRole context:-URL:-${this.$bitpod.getApiUrl()}Organizations/${
            this.$store.state.currentOrg.id
          }/Users/${this.item.email}/Roles/${role}\n `,
          e
        )
      }
    },
  },
}
</script>
