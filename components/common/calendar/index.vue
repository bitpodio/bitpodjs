<template>
  <div>
    <v-sheet tile height="54" color="grey lighten-3" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        dense
        outlined
        hide-details
        label="event-overlap-mode"
        class="ma-2"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
        @click:more="showMore"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { formatResult, getContentByName, getViewQuery } from '~/utility'

export default {
  props: {
    viewName: {
      type: String,
      required: true,
    },
    contentName: {
      type: String,
      required: true,
    },
  },
  data() {
    const content = getContentByName(this, this.contentName)
    return {
      content,
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1',
      ],
      loading: 0,
    }
  },
  methods: {
    getEvents({ start, end }) {
      this.events = this.formattedEvents(this.calendarData)
    },
    formattedEvents(calendarData) {
      return calendarData
        ? calendarData.map((event) => {
            const allDay = this.rnd(0, 3) === 0
            return {
              name: event.Title,
              start: new Date(event.StartDate),
              end: new Date(event.EndDate),
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              timed: !allDay,
            }
          })
        : []
    },
    getEventColor(event) {
      return event.color
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    showMore() {
      alert('more event')
    },
  },
  apollo: {
    calendarData: {
      query() {
        return gql`
          ${getViewQuery(this.content, this.viewName)}
        `
      },
      variables() {
        return {
          filters: {},
          where: {},
        }
      },
      update(data) {
        const { content } = this
        const modelName = content.general.name
        const tableData = formatResult(data, modelName)
        this.events = this.formattedEvents(tableData)
        return tableData
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>
