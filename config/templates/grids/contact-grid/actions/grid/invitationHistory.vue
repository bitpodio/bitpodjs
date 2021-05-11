<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="routeToHistory">
          <v-icon left>mdi-history</v-icon>
          <i18n path="Common.InvitationHistory" />
        </v-btn>
      </template>
    </v-dialog>
  </v-col>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    routeToHistory(ctx) {
      this.$router.push(
        this.localePath(
          `/apps/${this.$router.currentRoute.params.app}/list/Contacts/Invites`
        )
      )
    },
  },
}
</script>
