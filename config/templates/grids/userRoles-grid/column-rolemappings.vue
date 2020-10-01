<template>
  <div>
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
import nuxtconfig from '~/nuxt.config'
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
      roles: [],
      chip: false,
    }
  },
  mounted() {
    const r = this.item.rolemappings
    this.roles = r.map((e) => e.roleId)
  },

  methods: {
    async removeRole(role) {
      try {
        const res = await this.$axios.$delete(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Organizations/${this.$store.state.currentOrg.id}/Users/${this.item.email}/Roles/${role}`
        )
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/userRoles-grid/column-rolemappings.vue while making a delete call to organization model from method removeRole context:-URL:-https://${nuxtconfig.axios.eventUrl}/svc/api/Organizations/${this.$store.state.currentOrg.id}/Users/${this.item.email}/Roles/${role}\n `,
          e
        )
      }
    },
  },
}
</script>
