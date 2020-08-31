<template>
  <div class="custom-date-time-picker">
    <div v-if="isDateTime">
      <v-datetime-picker
        v-model="dateTime"
        :label="field.caption"
        :text-field-props="textFieldProps"
        @input="onCalendarChange"
      >
        <template slot="dateIcon">
          <v-icon>fas fa-calendar</v-icon>
        </template>
        <template slot="timeIcon">
          <v-icon>fas fa-clock</v-icon>
        </template>
      </v-datetime-picker>
    </div>
    <div v-else>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="field.caption"
            readonly
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable @change="onCalendarChange">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'field'],
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      textFieldProps: {
        appendIcon: 'fa-calendar',
        outlined: true,
      },
      dateTime: new Date(),
    }
  },
  computed: {
    isDateTime() {
      return this.field.type === 'datetime'
    },
  },
  methods: {
    onCalendarChange() {
      const date = this.isDateTime ? this.dateTime : this.date
      this.$emit('input', date)
    },
  },
}
</script>
<style>
.v-picker {
  border-radius: 0;
}
</style>
