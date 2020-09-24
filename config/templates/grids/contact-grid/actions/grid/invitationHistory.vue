<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="routeToHistory">
          <v-icon left>mdi-history</v-icon> Invitation History
        </v-btn>
      </template>
    </v-dialog>
  </v-col>
</template>
<script>
export default {
  methods: {
    routeToHistory(ctx) {
      this.$router.push(`/apps/event/list/Contacts/Invites`)
    },
  },
}
</script>
