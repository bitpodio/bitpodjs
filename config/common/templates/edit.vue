<template>
  <v-edit-dialog
    :return-value.sync="value"
    @save="save"
    @cancel="cancel"
    @open="open"
    @close="close"
  >
    <v-chip class="ma-2">
      {{ value }}
    </v-chip>
    <template v-slot:input>
      <v-text-field v-model="value" label="Edit" single-line></v-text-field>
    </template>
  </v-edit-dialog>
</template>

<script>
export default {
  props: { value: { type: null, default: null } },
}
</script>
