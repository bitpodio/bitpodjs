<template>
  <div class="app">
    <v-flex class="detailview-head mb-3"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36"><i18n path="Drawer.Schedule" /></v-text
    ></v-flex>
    <v-snackbar v-model="snackbar" :top="true" :timeout="3000">
      <i18n path="Common.YouCanNotEdit" class="toast py-2 pr-1 pl-3" />
    </v-snackbar>
    <v-col class="px-0">
      <v-dialog
        v-model="dialog"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start top"
          >
            <h2 class="black--text pt-5 pb-2 text-h5 heading">
              {{
                isParticipant
                  ? this.$t('Common.Attendees')
                  : this.$t('Common.ManageSchedule')
              }}
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn
                icon
                @click="
                  dialog = false
                  isParticipant = false
                "
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text v-if="!isParticipant" class="pa-0px">
            <v-container>
              <v-row class="px-3">
                <v-col cols="4" sm="4" class="pa-0px">
                  <v-icon class="fs-12px" dark color="black"
                    >mdi-checkbox-marked-outline</v-icon
                  >
                  <h3 class="d-inline fs-12px">
                    <i18n path="Common.Availability" />
                  </h3>
                </v-col>
                <v-col cols="8" sm="8" class="pa-0px d-block">
                  <v-btn
                    text
                    small
                    class="fs-8px pa-0px"
                    @click="addAvailablity"
                  >
                    <v-icon class="fs-12px mr-0px" dark left>mdi-plus</v-icon>
                    <i18n path="Common.AddAvailability" />
                  </v-btn>
                  <v-btn text small class="fs-8px pa-0px" @click="slots = []">
                    <v-icon class="fs-12px mr-0px" dark left>mdi-cancel</v-icon>
                    <i18n path="Common.NotAvailable" />
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <template v-if="!slots.length">
                <div
                  class="unavilable mt-3 mb-0 text-lg-h6 py-5 px-0 text-center"
                >
                  <i18n path="Common.Unavailable" />
                </div>
              </template>
              <template v-else>
                <v-row>
                  <v-col cols="5" md="4" class="fs-10px">
                    <h3><i18n path="Common.StartT" /></h3>
                  </v-col>
                  <v-col cols="5" sm="4" class="fs-10px">
                    <h3><i18n path="Common.EndT" /></h3>
                  </v-col>
                </v-row>
                <div class="slotContainer">
                  <v-form ref="formData">
                    <div v-for="(slot, key) in slots" :key="key">
                      <v-row>
                        <v-col cols="5" md="4" class="pt-1 px-3 pb-2">
                          <v-autocomplete
                            v-model="slot.startTime"
                            class="ma-0"
                            :items="dropdown"
                            editable
                            outlined
                            dense
                            :rules="[
                              function () {
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
                                  return $t(
                                    'Messages.Error.OverlappingTimeSlot'
                                  )
                                } else {
                                  slots[key].valid1 = true
                                  return true
                                }
                              },
                            ]"
                            @change="updateValidation"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="5" md="4" class="pt-1 px-3 pb-2">
                          <v-autocomplete
                            v-model="slot.endTime"
                            class="ma-0"
                            :items="dropdown"
                            editable
                            outlined
                            dense
                            :rules="[
                              function () {
                                if (
                                  slots[key].startTime >= slots[key].endTime
                                ) {
                                  slots[key].valid = false
                                  return $t(
                                    'Messages.Error.EndTimeMustBeGreater'
                                  )
                                } else {
                                  slots[key].valid = true
                                  return true
                                }
                              },
                            ]"
                            @change="updateValidation"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="2" md="4" class="pt-2 pb-0 px-1">
                          <v-btn icon @click="deleteAvailablity(key)">
                            <i
                              class="fa fa-trash mb-2 fs-20"
                              aria-hidden="true"
                            ></i>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-form>
                </div>
              </template>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-icon class="fs-12px" dark color="black">mdi-repeat</v-icon>
                  <h3 class="d-inline fs-12px">
                    <i18n path="Common.RepeatingDaysOfWeek" />
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
                  class="pt-1 px-3 pb-2 days"
                >
                  <v-checkbox
                    v-model="day.selected"
                    class="ma-0"
                    dense
                    :label="day.dayNameLang"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text v-else class="pa-0px mt-sm-n5 mt-n12">
            <v-container
              v-if="contents && contents.Event"
              class="pa-0px mt-n16 mt-md-n10 mb-sm-3 mb-md-0"
            >
              <Grid
                view-name="eventAttendeePerDay"
                :content="contents.Event"
                :filter="filterData()"
              />
            </v-container>
          </v-card-text>
          <v-card-actions
            v-if="!isParticipant"
            class="pl-8 pb-5 actions d-block"
          >
            <SaveBtn
              v-if="dialog"
              outlined
              small
              dense
              color="primary"
              class="fs-8px mt-2 mr-2 d-inline-block"
              :disabled="validSlots() || disabledButton"
              :label="
                this.$t('Common.ApplyToOnly') +
                $d(new Date(selectedDate || null), 'short', $i18n.locale)
              "
              :action="applyToOnly"
            ></SaveBtn>
            <SaveBtn
              v-if="dialog"
              small
              dense
              color="primary"
              class="fs-8px mt-2 ml-0 d-inline-block"
              :disabled="validSlots() || disabledButton"
              :label="this.$t('Common.ApplyToRepeatingWeekDays')"
              :action="applyToRepeating"
            ></SaveBtn>
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
import allLocales from '@fullcalendar/core/locales-all'
import Grid from '~/components/common/grid'
import { formatGQLResult } from '~/utility/gql.js'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { configLoaderMixin } from '~/utility'
import SaveBtn from '~/components/common/saveButton'
export default {
  components: {
    Grid,
    SaveBtn,
    FullCalendar,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      disabledButton: false,
      isParticipant: false,
      snackbar: false,
      exisistingEventId: '',
      exceptionDates: [],
      dropdown: [],
      clickedDate: '',
      selectedDate: '',
      slots: [],
      selectedDays: [
        {
          dayNameLang: this.$t('Common.Sundays'),
          dayName: 'Sundays',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Mondays'),
          dayName: 'Mondays',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Tuesdays'),
          dayName: 'Tuesdays',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Wednesdays'),
          dayName: 'Wednesdays',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Thursdays'),
          dayName: 'Thursdays',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Fridays'),
          dayName: 'Fridays',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Saturdays'),
          dayName: 'Saturdays',
          selected: false,
        },
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
        locales: allLocales,
        locale: this.$i18n.locale,
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
            propsdata.el.className += ' eventBox'
            propsdata.el.style.whiteSpace = 'normal'
            propsdata.el.style.display = 'block'
            propsdata.el.childNodes[1].className = 'd-none'
            propsdata.el.childNodes[0].className = 'd-none'
            propsdata.el.lastElementChild.innerHTML = propsdata.el.lastElementChild.innerHTML.trim()
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
          if (propsdata.view.type === 'listWeek') {
            propsdata.el.previousElementSibling.onclick = () => {
              const calendarApi = this.$refs.calendar.getApi()
              calendarApi.changeView('timeGridDay')
              calendarApi.gotoDate(propsdata.event.startStr)
            }
          }
          if (
            propsdata.view.type === 'timeGridDay' ||
            propsdata.view.type === 'timeGridWeek'
          ) {
            const participantIcon = document.createElement('i')
            participantIcon.className =
              'v-icon notranslate v-icon--left mdi mdi-account-multiple-outline participantButton cursorPointer'
            participantIcon.onclick = () => {
              this.isParticipant = true
            }
            propsdata.el.parentNode.parentNode.appendChild(participantIcon)
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
              dayNameLang: day.dayNameLang,
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
    goBack() {
      this.$router.back()
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
            {
              BookingDate: {
                gte: new Date(startDate.toLocaleDateString()).toISOString(),
              },
            },
            {
              BookingDate: {
                lte: new Date(endDate.toLocaleDateString()).toISOString(),
              },
            },
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
        if (
          this.slots &&
          this.slots.length &&
          !this.isParticipant &&
          this.$refs.formData
        ) {
          this.$refs.formData.validate()
        }
      }, 1000)
    },
    refresh() {
      this.dialog = false
      this.$apollo.queries.dropdownData.refresh()
      this.$apollo.queries.eventData.refresh()
      this.disabledButton = false
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
      this.disabledButton = true
      this.selectedDays
        .reduce((acc, i) => {
          return acc.then(() => {
            const day = i.dayName.slice(0, -1).toLocaleLowerCase()
            const existingEvent = this.exceptionDates.find(
              (i) => i.type === 'wday' && i.wday === day
            )
            const url = this.$bitpod.getApiUrl()
            const exceptionURL = `${url}Sessions/${
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
            }
            return acc
          })
        }, Promise.resolve())
        .then(() => {
          return this.refresh()
        })
        .catch((e) => {
          console.error(
            `Failed to update Exception slots in session ${
              this.$route.params.id
            }, context :\n ${this.$bitpod.getApiUrl()},\n${e} `
          )
        })
    },
    applyToOnly() {
      this.disabledButton = true
      const existingEvent = this.exceptionDates.find(
        (i) => i.type === 'date' && i.date === this.clickedDate.toISOString()
      )
      const url = this.$bitpod.getApiUrl()
      const exceptionURL = `${url}Sessions/${
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
          return event.ranges &&
            event.ranges.length &&
            event.dow &&
            event.dow.length &&
            event.dow[0] != null
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
            : event.dow && event.dow.length && event.dow[0] != null
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
.top {
  z-index: 100;
}
.app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.toast {
  font-size: 18px;
}
.days {
  min-width: 135px;
}
@media (min-width: 600px) {
  .slotContainer {
    max-height: 200px;
    overflow: hidden auto !important;
  }
}
@media (max-width: 950px) {
  .pa-0px {
    padding: 0 !important;
  }
  .fs-10px {
    font-size: 10px !important;
  }
  .fs-8px {
    font-size: 8px !important;
  }
  .fs-12px {
    font-size: 12px !important;
  }
  .mr-0px {
    margin: 0 !important;
  }
  .actions {
    padding: 0 0 12px 12px !important;
  }
  .heading {
    margin-left: -10px !important;
    font-size: 20px !important;
    padding-top: 10px !important;
  }
}
</style>
