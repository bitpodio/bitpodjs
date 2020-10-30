<template>
  <div class="custom-date-time-picker">
    <div v-if="isDateTime">
      <v-datetime-picker
        ref="dateTimeComponent"
        v-model="date"
        :label="fieldCaption"
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
            :label="fieldCaption"
            :rules="rules"
            readonly
            outlined
            dense
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
import { formFieldMixin } from '~/utility/form-control'
export default {
  mixins: [formFieldMixin],
  props: {
    value: { type: null, default: null },
    field: { type: String, default: '' },
    rules: { type: Array, default: () => [] },
    onChange: { type: Function, default: () => {} },
  },
  data() {
    const dateTime = this.value || new Date()
    const date =
      this.field.type === 'datetime'
        ? new Date(dateTime)
        : new Date(dateTime).toISOString().substr(0, 10)
    return {
      date,
      modal: false,
      textFieldProps: {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: this.rules,
      },
    }
  },
  computed: {
    isDateTime() {
      return this.field.type === 'datetime'
    },
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.date = newVal
      }
    },
  },
  mounted() {
    if (this.field.type === 'datetime') {
      this.$refs.dateTimeComponent.$children[0].$children[0].$children[0].$el.onclick = () => {
        this.$refs.dateTimeComponent.display = true
      }
    }
    this.onCalendarChange()
    if (this.field.type === 'datetime') {
      this.$refs.dateTimeComponent.$children[0].onClickOutside = this.outsideClicked
    }
  },
  methods: {
    outsideClicked() {
      this.$refs.dateTimeComponent.okHandler()
    },
    onCalendarChange() {
      this.$emit('input', this.date)
      this.onChange && this.onChange(this.date)
    },
  },
}
</script>
<style>
.v-picker {
  border-radius: 0;
}
</style>
