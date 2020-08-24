<template>
  <div class="app">
    <v-col class="px-0">
      <v-dialog
        v-model="dialog"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small v-bind="attrs" v-on="on">
            <v-icon left>mdi-pencil</v-icon>Edit Item
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dense flat dark fixed color="accent">
            <v-toolbar-title class="body-1">Edit Item</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  v-for="field in fields"
                  :key="`${field.fieldName}${updateCount}`"
                  cols="12"
                  sm="12"
                >
                  <component
                    :is="formControl(field) || null"
                    v-model="formData[field.fieldName]"
                    :field="field"
                    :field-name="field.fieldName"
                    :content="content"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pl-4">
            <v-btn color="primary" depressed @click="onSave">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import FullCalendar from '@fullcalendar/vue'
import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import TextField from '../form/text-field.vue'
import Lookup from '../form/lookup.vue'
import Checkbox from '../form/checkbox.vue'
import { getContentByName } from '~/utility'
function getGridFields(content, viewName) {
  const view = content.views[viewName]
  const fields = view.fields
  const editableFields = []
  for (const fieldName in fields) {
    const field = fields[fieldName]
    const newFormField = field.newForm === undefined ? true : field.newForm
    if (newFormField) {
      editableFields.push({
        ...field,
        fieldName,
      })
    }
  }
  editableFields.sort(
    (field1, field2) => field1.displayOrder - field2.displayOrder
  )
  return editableFields
}
function buildMutationUpsertQuery(modelName) {
  return `mutation($Inputs : ${modelName}UpsertWithWhereInput!){ ${modelName}{ ${modelName}UpsertWithWhere(input:$Inputs){ clientMutationId obj{ id } } } }`
}
function getModelName(content, viewName) {
  const view = content.views[viewName]
  const dataSource = view.dataSource
  return dataSource.model
}
export default {
  components: {
    FullCalendar,
    TextField,
    Lookup,
    Checkbox,
    // editItem,
  },
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
    const fields = getGridFields(
      getContentByName(this, this.contentName),
      this.viewName
    )
    return {
      content,
      fields,
      showDialog: false,
      dialog: false,
      //   selectedEvent: [],
      updateCount: 0,
      formData: {},
      colors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1',
      ],
      calendarOptions: {
        plugins: [
          rrulePlugin,
          interactionPlugin,
          timeGridPlugin,
          dayGridPlugin,
        ],
        timeZone: 'UTC',
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: true,
        headerToolbar: this.buildToolbar(),
        events: [],
        eventClick: (propsdata) => {
          this.formData = propsdata.event.extendedProps.editFormData
        },
      },
    }
  },
  watch: {
    formData(newValue, oldValue) {
      this.updateCount = this.updateCount + 1
      this.formData = newValue
    },
  },
  methods: {
    async onSave() {
      await this.updateItem(this.formData)
      this.dialog = false
    },
    async updateItem(data) {
      const modelName = getModelName(this.content, this.viewName)
      const where = {
        id: data.id,
      }
      const editItemMutation = buildMutationUpsertQuery(modelName)
      const itemUpdated = await this.$apollo.mutate({
        mutation: gql(editItemMutation),
        variables: {
          Inputs: {
            where,
            data,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
      this.$apollo.queries.tableData.refresh()
      return itemUpdated
    },
    formControl(field) {
      switch (field.type) {
        case 'string':
        case 'number':
          return 'TextField'
        case 'lookup':
          return 'Lookup'
        case 'checkbox':
          return 'Checkbox'
        case 'richtext':
          return 'RichText'
      }
    },
    getEvents() {
      this.calendarOptions.events = this.formattedEvents(this.calendarData)
    },
    buildToolbar() {
      return {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }
    },
    // function(event, $element, view) {
    //   let result = !_.includes(
    //     event.exceptionDates,
    //     event.start.format('YYYY-MM-DD')
    //   )
    //   $element.removeClass('fc-draggable')
    //   if (event.ranges && result)
    //     result =
    //       event.ranges.filter(function (range) {
    //         return (
    //           event.start.isBefore(moment.tz(range.end, 'UTC')) &&
    //           event.end.isAfter(moment.tz(range.start, 'UTC'))
    //         )
    //       }).length > 0
    //   if (_.includes(event.exceptionDates, event.start.format('YYYY-MM-DD'))) {
    //     const dateobj = _.filter(calenderData.EventDetailsCalender, function (
    //       item
    //     ) {
    //       return (
    //         moment(item.start).format('YYYY-MM-DD') ===
    //         moment(event.start).format('YYYY-MM-DD')
    //       )
    //     })
    //     if (!dateobj.length) {
    //       $element.addClass('ffc-unavailable')
    //       event.title = 'Unavailable'
    //       result = true
    //     }
    //   }
    //   return result ? $element.html(`${event.title}`) : false
    // },
    formattedEvents(calendarData) {
      return calendarData
        ? calendarData.map((event) => {
            const allDay = this.rnd(0, 3) === 0
            debugger
            return event.exceptionDates && event.exceptionDates.length
              ? {
                  title: event.title,
                  rrule: `DTSTART:${event.ranges[0].start
                    .split('-')
                    .join('')}T120000Z\nRRULE:BYDAY=${this.getDayName(
                    event.dow[0]
                  )};UNTIL=${event.ranges[0].end
                    .split('-')
                    .join('')}\nEXDATE:${this.getExceptionDate(
                    event.exceptionDates
                  )}`,
                  duration: '01:00',
                  // daysOfWeek: event.dow,
                }
              : {
                  title: event.title,
                  start: event.start,
                  end: event.end,
                  color: this.colors[this.rnd(0, this.colors.length - 1)],
                  timed: !allDay,
                  // editFormData: event,
                  // startTime: event.ranges ? event.start : '',
                  // endTime: event.ranges ? event.end : '',
                  // daysOfWeek: event.dow,
                  // startRecur: event.ranges ? event.ranges[0].start : '',
                  // endRecur: event.ranges ? event.ranges[0].end : '',
                }
          })
        : []
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    getExceptionDate(dates) {
      return dates
        .map((item) => {
          return item.split('-').join('') + 'T120000'
        })
        .join(',')
    },
    getDayName(dayIndex) {
      switch (dayIndex) {
        case 0:
          return 'SU'
        case 1:
          return 'MO'
        case 2:
          return 'TU'
        case 3:
          return 'WE'
        case 4:
          return 'TH'
        case 5:
          return 'FR'
        case 6:
          return 'SA'
      }
    },
  },
  apollo: {
    calendarData: {
      query() {
        return gql`
          query {
            Session {
              SessionFullcalendarEvents(
                where: { id: "5f3e458b712699000af798cf" }
              )
            }
          }
        `
      },
      variables() {
        return {
          filters: {},
          where: {},
        }
      },
      update(data) {
        this.calendarOptions.events = this.formattedEvents(
          data.Session.SessionFullcalendarEvents
        )
      },
      // result({ data, loading, networkStatus }) {
      //   debugger
      // },
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

<style scoped>
.app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
</style>
