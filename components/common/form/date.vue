<template>
  <v-menu
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="field.caption"
        readonly
        v-bind="attrs"
        outlined
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      show-current="true"
      @change="onCalendarChange"
      @input="menu2 = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: ['value', 'field'],
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
    }
  },
  methods: {
    onCalendarChange() {
      this.$emit('input', this.date)
    },
  },
}
</script>
