<template>
  <v-dialog v-model="display" :width="dialogWidth">
    <template v-slot:activator="{ on }">
      <v-text-field
        v-bind="textFieldProps"
        :disabled="disabled"
        :loading="loading"
        :label="label"
        :value="formattedDatetime"
        readonly
        v-on="on"
      >
        <template v-slot:progress>
          <slot name="progress">
            <v-progress-linear
              color="primary"
              indeterminate
              absolute
              height="2"
            ></v-progress-linear>
          </slot>
        </template>
        <template v-if="hasErrorTooltip" v-slot:message="{ message, key }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" :key="key">{{ message }}</span>
            </template>
            <span :key="key">{{ message }}</span>
          </v-tooltip>
        </template>
        <i
          slot="append"
          class="fa-calendar fs-22 grey--text"
          aria-hidden="true"
          @click="dateTimeIconClick"
        ></i>
      </v-text-field>
    </template>

    <v-card>
      <v-card-text class="px-0 py-0">
        <v-tabs v-model="activeTab" fixed-tabs>
          <v-tab key="calendar">
            <slot name="dateIcon">
              <v-icon>event</v-icon>
            </slot>
          </v-tab>
          <v-tab key="timer" :disabled="dateSelected">
            <slot name="timeIcon">
              <v-icon>access_time</v-icon>
            </slot>
          </v-tab>
          <v-tab-item key="calendar">
            <v-date-picker
              v-model="date"
              v-bind="datePickerProps"
              full-width
              @input="showTimePicker"
            ></v-date-picker>
          </v-tab-item>
          <v-tab-item key="timer">
            <v-time-picker
              ref="timer"
              v-model="time"
              class="v-time-picker-custom"
              v-bind="timePickerProps"
              full-width
            ></v-time-picker>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions" :parent="this">
          <v-btn color="grey lighten-1" text @click.native="clearHandler">
            <i18n path="Common.Clear" />
          </v-btn>
          <v-btn color="green darken-1" text @click="okHandler">
            <i18n path="Drawer.OK" />
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { format, parse } from 'date-fns'

const DEFAULT_DATE = ''
const DEFAULT_TIME = '00:00:00'
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
const DEFAULT_DIALOG_WIDTH = 340

export default {
  model: {
    prop: 'datetime',
    event: 'input',
  },
  props: {
    datetime: {
      type: [Date, String],
      default: null,
    },
    disabled: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    label: {
      type: String,
      default: '',
    },
    dialogWidth: {
      type: Number,
      default: DEFAULT_DIALOG_WIDTH,
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT,
    },
    timeFormat: {
      type: String,
      default: 'HH:mm',
    },
    textFieldProps: {
      type: Object,
      default: () => {},
    },
    datePickerProps: {
      type: Object,
      default: () => {},
    },
    timePickerProps: {
      type: Object,
      default: () => {},
    },
    hasErrorTooltip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      display: false,
      activeTab: 0,
      date: DEFAULT_DATE,
      time: DEFAULT_TIME,
    }
  },
  computed: {
    dateTimeFormat() {
      return this.dateFormat + ' ' + this.timeFormat
    },
    defaultDateTimeFormat() {
      return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
    },
    formattedDatetime() {
      return this.selectedDatetime
        ? format(this.selectedDatetime, this.dateTimeFormat)
        : ''
    },
    selectedDatetime() {
      if (this.date && this.time) {
        let datetimeString = this.date + ' ' + this.time
        if (this.time.length === 5) {
          datetimeString += ':00'
        }
        return parse(datetimeString, this.defaultDateTimeFormat, new Date())
      } else {
        return null
      }
    },
    dateSelected() {
      return !this.date
    },
  },
  watch: {
    datetime() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    dateTimeIconClick() {
      this.display = true
    },
    init() {
      if (!this.datetime) {
        return
      }

      let initDateTime
      if (this.datetime instanceof Date) {
        initDateTime = this.datetime
      } else if (
        typeof this.datetime === 'string' ||
        this.datetime instanceof String
      ) {
        initDateTime = parse(this.datetime, this.dateTimeFormat, new Date())
      }

      this.date = format(initDateTime, DEFAULT_DATE_FORMAT)
      this.time = format(initDateTime, DEFAULT_TIME_FORMAT)
    },
    okHandler() {
      this.resetPicker()
      this.$emit('input', this.selectedDatetime)
    },
    clearHandler() {
      this.resetPicker()
      this.date = DEFAULT_DATE
      this.time = DEFAULT_TIME
      this.$emit('input', null)
    },
    resetPicker() {
      this.display = false
      this.activeTab = 0
      if (this.$refs.timer) {
        this.$refs.timer.selectingHour = true
      }
    },
    showTimePicker() {
      this.activeTab = 1
    },
  },
}
</script>
