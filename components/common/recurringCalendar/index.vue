<template>
  <div class="app">
    <v-snackbar v-model="snackbar" :top="true" :timeout="1000">
      <div class="toast py-2 pr-1 pl-3">
        You can not edit past days session
      </div>
    </v-snackbar>
    <v-col class="px-0">
      <v-dialog
        v-model="dialog"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dense flat dark fixed color="accent">
            <v-toolbar-title class="body-1">{{
              isParticipant ? 'Attendees' : 'Manage Schedule'
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              dark
              @click="
                dialog = false
                isParticipant = false
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text v-if="!isParticipant">
            <v-container>
              <v-row>
                <v-col cols="4" sm="4">
                  <v-icon dark color="black"
                    >mdi-checkbox-marked-outline</v-icon
                  >
                  <h3 class="d-inline">
                    Availability
                  </h3>
                </v-col>
                <v-col cols="4" sm="4">
                  <v-btn text small @click="addAvailablity">
                    <v-icon dark left>mdi-plus</v-icon>
                    Add Availability
                  </v-btn>
                </v-col>
                <v-col cols="4" sm="4">
                  <v-btn text small @click="slots = []">
                    <v-icon dark left>mdi-cancel</v-icon>
                    Not Available
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <template v-if="!slots.length">
                <div class="unavilable mt-3 mb-0 text-lg-h6 py-3 px-0">
                  <p class="mx-auto mb-1 unavilableText">
                    Unavailable
                  </p>
                </div>
              </template>
              <template v-else>
                <v-row>
                  <v-col cols="4" sm="4">
                    <h3>Start Time*</h3>
                  </v-col>
                  <v-col cols="4" sm="4">
                    <h3>End Time*</h3>
                  </v-col>
                </v-row>
                <div style="max-height: 200px; overflow: hidden auto;">
                  <v-form ref="formData">
                    <div v-for="(slot, key) in slots" :key="key">
                      <v-row>
                        <v-col cols="4" sm="4" class="pt-1 px-3 pb-2">
                          <v-autocomplete
                            v-model="slot.startTime"
                            class="ma-0"
                            :items="dropdown"
                            editable
                            outlined
                            :rules="[
                              () => {
                                if (
                                  !slots.reduce((acc, i, k) => {
                                    let validity
                                    validity =
                                      k === key
                                        ? true
                                        : i.startTime != slots[key].startTime &&
                                          i.endTime != slots[key].endTime &&
                                          ((i.startTime <
                                            slots[key].startTime &&
                                            i.endTime <=
                                              slots[key].startTime) ||
                                            (i.startTime >=
                                              slots[key].endTime &&
                                              i.endTime > slots[key].endTime))
                                    return acc && validity
                                  }, true)
                                ) {
                                  slots[key].valid1 = false
                                  return `Time-slot overlapping with other slots`
                                } else {
                                  slots[key].valid1 = true
                                  return true
                                }
                              },
                            ]"
                            @change="updateValidation"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="4" sm="4" class="pt-1 px-3 pb-2">
                          <v-autocomplete
                            v-model="slot.endTime"
                            class="ma-0"
                            :items="dropdown"
                            editable
                            outlined
                            :rules="[
                              () => {
                                if (
                                  slots[key].startTime >= slots[key].endTime
                                ) {
                                  slots[key].valid = false
                                  return `End time must be greater then start time`
                                } else {
                                  slots[key].valid = true
                                  return true
                                }
                              },
                            ]"
                            @change="updateValidation"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="4" sm="4" class="pt-2 px-3 pb-0">
                          <v-btn icon @click="deleteAvailablity(key)">
                            <v-icon dark>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-form>
                </div>
              </template>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-icon dark color="black">mdi-repeat</v-icon>
                  <h3 class="d-inline">
                    Repeating days of the week
                  </h3>
                </v-col>
              </v-row>
              <v-divider class="mb-3"></v-divider>
              <v-row>
                <v-col
                  v-for="(day, key) in selectedDays"
                  :key="key"
                  cols="3"
                  sm="3"
                  class="pt-1 px-3 pb-2"
                >
                  <v-checkbox
                    v-model="day.selected"
                    class="ma-0"
                    :label="day.dayName"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text v-else>
            <v-container v-if="content()">
              <Grid
                view-name="eventAttendees"
                :content="content()"
                :filter="filterData()"
              />
            </v-container>
          </v-card-text>
          <v-card-actions v-if="!isParticipant" class="pl-4">
            <v-btn
              outlined
              color="primary"
              depressed
              :disabled="validSlots()"
              @click="applyToOnly"
              >Apply to Only {{ selectedDate }}
            </v-btn>
            <v-btn
              color="primary"
              depressed
              :disabled="validSlots()"
              @click="applyToRepeating"
              >Apply To Repeating Week Days</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <FullCalendar ref="calendar" :options="calendarOptions" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import FullCalendar from '@fullcalendar/vue'
import listPlugin from '@fullcalendar/list'
import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Grid from '~/components/common/grid'
import { formatGQLResult } from '~/utility/gql.js'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { configLoaderMixin } from '~/utility'
export default {
  components: {
    Grid,
    FullCalendar,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      isParticipant: false,
      snackbar: false,
      exisistingEventId: '',
      exceptionDates: [],
      dropdown: [],
      clickedDate: '',
      selectedDate: '',
      slots: [],
      selectedDays: [
        { dayName: 'Sundays', selected: false },
        { dayName: 'Mondays', selected: false },
        { dayName: 'Tuesdays', selected: false },
        { dayName: 'Wednesdays', selected: false },
        { dayName: 'Thursdays', selected: false },
        { dayName: 'Fridays', selected: false },
        { dayName: 'Saturdays', selected: false },
      ],
      dialog: false,
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
          listPlugin,
        ],
        dayMaxEvents: 3,
        timeZone: 'UTC',
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: false,
        headerToolbar: this.buildToolbar(),
        buttonIcons: {
          prev: 'chevron-left',
          next: 'chevron-right',
        },
        events: [],
        eventDidMount: (propsdata) => {
          if (propsdata.view.type === 'dayGridMonth') {
            propsdata.el.childNodes[1].className = 'd-none'
            propsdata.el.childNodes[0].className = 'd-none'
            Object.assign(propsdata.el.style, {
              border: propsdata.el.textContent.includes('unavailable')
                ? '1px dashed'
                : '1px solid',
              color: propsdata.el.textContent.includes('unavailable')
                ? 'grey'
                : '',
              margin: '0 5px 5px',
              fontSize: '12px',
              textAlign: 'center',
            })
            const dateBox =
              propsdata.el.parentNode.parentNode.parentNode.firstElementChild
            if (dateBox.childElementCount === 1) {
              const participantIcon = document.createElement('i')
              participantIcon.className =
                'v-icon notranslate v-icon--left mdi mdi-account-multiple-outline participantButton cursorPointer'
              participantIcon.onclick = () => {
                this.isParticipant = true
              }
              dateBox.appendChild(participantIcon)
            }
          }
        },
        dateClick: (propsdata) => {
          this.clickedDate = propsdata.date
          if (
            new Date(new Date().toDateString()) > new Date(propsdata.dateStr)
          ) {
            this.snackbar = true
            return
          }
          this.selectedDays = this.selectedDays.map((day, key) => {
            return {
              dayName: day.dayName,
              selected: key === propsdata.date.getDay(),
            }
          })
          this.slots = this.IsDateHasEvent(propsdata.date)
            .filter((i) => i.title !== 'unavailable')
            .map((i) => {
              const pair = i.title.split('-')
              return {
                startTime: pair[0].trim(),
                endTime: pair[1].trim(),
                valid: true,
                valid1: true,
              }
            })
          this.selectedDate = propsdata.date.toDateString()
          this.dialog = TextTrackCueList
          this.updateValidation()
        },
      },
    }
  },
  mounted() {
    this.getTimeSlots()
  },
  methods: {
    content() {
      if (this.contents) {
        const startDate =
          this.clickedDate === '' ? new Date() : new Date(this.clickedDate)
        const endDate =
          this.clickedDate === '' ? new Date() : new Date(this.clickedDate)
        endDate.setDate(endDate.getDate() + 1)
        this.contents.Event.startDate = startDate.toISOString()
        this.contents.Event.endDate = endDate.toISOString()
      }
      return this.contents ? this.contents.Event : null
    },
    filterData() {
      const startDate =
        this.clickedDate === '' ? new Date() : new Date(this.clickedDate)
      const endDate =
        this.clickedDate === '' ? new Date() : new Date(this.clickedDate)
      endDate.setDate(endDate.getDate() + 1)
      return {
        where: {
          and: [
            { SessionId: this.$route.params.id },
            { BookingDate: { gte: startDate.toISOString() } },
            { BookingDate: { lte: endDate.toISOString() } },
          ],
        },
      }
    },
    validSlots() {
      return !this.slots.reduce((acc, i) => {
        return acc && i.valid && i.valid1
      }, true)
    },
    updateValidation() {
      setTimeout(() => {
        if (this.slots && this.slots.length && !this.isParticipant) {
          this.$refs.formData.validate()
        }
      }, 1000)
    },
    refresh() {
      this.dialog = false
      this.$apollo.queries.dropdownData.refresh()
      this.$apollo.queries.eventData.refresh()
    },
    ObjectID5(m = Math, d = Date, h = 16, s = (s) => m.floor(s).toString(h)) {
      return (
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
      )
    },
    getSelectedIntervals() {
      return this.slots.map((i) => {
        return {
          to: i.endTime,
          from: i.startTime,
          id: this.ObjectID5(),
        }
      })
    },
    applyToRepeating() {
      return Promise.all(
        this.selectedDays.map((i) => {
          const day = i.dayName.slice(0, -1).toLocaleLowerCase()
          const existingEvent = this.exceptionDates.find(
            (i) => i.type === 'wday' && i.wday === day
          )
          const exceptionURL = `https://bitpod-event.test.bitpod.io/svc/api/Sessions/${
            this.$route.params.id
          }/Exceptions/${
            existingEvent ? atob(existingEvent.id).split(':')[1] : ''
          }`
          if (i.selected) {
            return this.$axios({
              method: existingEvent ? 'PUT' : 'POST',
              url: exceptionURL,
              data: {
                type: 'wday',
                wday: day,
                _intervals: this.getSelectedIntervals(),
              },
            })
          } else {
            return Promise.resolve
          }
        })
      ).then(() => {
        return this.refresh()
      })
    },
    applyToOnly() {
      const existingEvent = this.exceptionDates.find(
        (i) => i.type === 'date' && i.date === this.clickedDate.toISOString()
      )
      const exceptionURL = `https://bitpod-event.test.bitpod.io/svc/api/Sessions/${
        this.$route.params.id
      }/Exceptions/${existingEvent ? atob(existingEvent.id).split(':')[1] : ''}`
      return this.$axios({
        method: existingEvent ? 'PUT' : 'POST',
        url: exceptionURL,
        data: {
          type: 'date',
          date: this.clickedDate,
          _intervals: this.getSelectedIntervals(),
        },
      }).then(() => {
        return this.refresh()
      })
    },
    addAvailablity() {
      this.slots.push({
        startTime: '10:00',
        endTime: '19:00',
        valid: true,
        valid1: true,
      })
      this.updateValidation()
    },
    deleteAvailablity(index) {
      this.slots = this.slots.filter((i, key) => key !== index)
      this.updateValidation()
    },
    getTimeSlots() {
      return this.$apollo
        .query({
          query: gql`
            ${generalconfiguration}
          `,
          variables: {
            filters: {
              where: {
                type: 'AvailableHour',
              },
            },
          },
        })
        .then((result) => {
          const generalConfig = formatGQLResult(
            result.data,
            'GeneralConfiguration'
          )
          this.dropdown = generalConfig.map((i) => {
            return {
              text: i.value,
            }
          })
          return generalConfig
        })
    },
    buildToolbar() {
      return {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }
    },
    formattedEvents(calendarData) {
      let unavailable = []
      if (calendarData) {
        const eventsData = calendarData.map((event) => {
          if (event.exceptionDates) {
            const dt = event.exceptionDates.filter(
              (edate) => !unavailable.includes(edate)
            )
            unavailable.push(...dt)
          }
          const allDay = this.rnd(0, 3) === 0
          const difference = event.end.split(':')[0] - event.start.split(':')[0]
          const duration = (difference < 10 ? '0' : '') + difference + ':00'
          return event.ranges && event.ranges.length
            ? {
                title: event.title,
                rrule: `DTSTART:${event.ranges[0].start
                  .split('-')
                  .join('')}T${event.start
                  .split(':')
                  .join('')}00Z\nRRULE:BYDAY=${this.getDayName(
                  event.dow[0]
                )};UNTIL=${event.ranges[0].end
                  .split('-')
                  .join('')}\n${this.getExceptionDate(
                  event.exceptionDates,
                  event.start
                )}`,
                duration,
              }
            : event.dow && event.dow.length
            ? {
                title: event.title,
                rrule: `DTSTART:${new Date(0)
                  .toISOString()
                  .split('T')[0]
                  .split('-')
                  .join('')}T${event.start.split(':').join('')}00Z
                  \nRRULE:BYDAY=${this.getDayName(
                    event.dow[0]
                  )}\n${this.getExceptionDate(
                  event.exceptionDates,
                  event.start
                )}`,
                duration,
              }
            : {
                title: event.title,
                start: event.start,
                end: event.end,
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: !allDay,
              }
        })
        unavailable = unavailable.filter((i) =>
          calendarData.reduce((acc, j) => {
            return acc && (j.dow || (!j.dow && j.start.split('T')[0] !== i))
          }, true)
        )
        eventsData.push(
          ...unavailable.map((e) => {
            return {
              title: 'unavailable',
              start: new Date(e),
              end: new Date(e),
            }
          })
        )
        return eventsData
      } else {
        return []
      }
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    getExceptionDate(dates, start) {
      return !dates || !dates.length
        ? ''
        : 'EXDATE:' +
            dates
              .map((item) => {
                return (
                  item.split('-').join('') +
                  'T' +
                  start.split(':').join('') +
                  '00Z'
                )
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
    IsDateHasEvent(date) {
      const calendarApi = this.$refs.calendar.getApi()
      const allEvents = calendarApi.getEvents()
      return allEvents.filter(
        (item) =>
          new Date(
            new Date(item.start.toUTCString().substr(0, 25)).toDateString()
          ).getTime() === new Date(date.toDateString()).getTime()
      )
    },
  },
  apollo: {
    eventData: {
      query() {
        return gql`
          query {
            Session {
              SessionFind(
                filter: { 
                  where: {
                    id: "${this.$route.params.id}" 
                  }
                }
              ){ edges { node { _Exceptions { type date wday id } } } }
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
        this.exceptionDates = data.Session.SessionFind.edges[0].node._Exceptions
      },
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
    dropdownData: {
      query() {
        return gql`
          query {
            Session {
              SessionFullcalendarEvents(
                where: { id: "${this.$route.params.id}" }
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
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
    calendarData: {
      query() {
        return gql`
          query {
            Session {
              SessionFullcalendarEvents(
                where: { id: "${this.$route.params.id}" }
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
.toast {
  font-size: 18px;
}
</style>
