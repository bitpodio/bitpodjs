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
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> {{ buttonLabel }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4">Schedule a Task</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="task.Title"
                  label="Title*"
                  :rules="requiredRules"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <Lookup
                  v-model="task.Category"
                  :field="categoryLookupField"
                  :rules="requiredRules"
                  :on-change="changeCategory"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <Lookup
                  v-model="task.Status"
                  :field="statusLookupField"
                  :filter="filter"
                  :rules="requiredRules"
                  :on-change="changeStatus"
                />
              </v-col>
              <v-col v-if="isAction" cols="12" sm="6" md="4">
                <Lookup
                  v-model="task.Action"
                  :field="actionLookupField"
                  :rules="requiredRules"
                  :filter="actionFilter"
                />
              </v-col>
              <v-col v-if="isDueDate" cols="12" sm="6" md="4">
                <v-datetime-picker
                  v-model="task.DueDate"
                  :text-field-props="dueDateProps()"
                  :rules="requiredRules"
                  label="Due Date*"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="isDay" cols="12" sm="6" md="4">
                <Lookup
                  v-model="task.Day"
                  :field="dayLookupField"
                  :rules="requiredRules"
                  :disabled="true"
                />
              </v-col>
              <v-col v-if="isTime" cols="12" sm="6" md="4">
                <Lookup
                  v-model="task.Time"
                  :field="timeLookupField"
                  :rules="requiredRules"
                />
              </v-col>

              <v-col v-if="isTimezone" cols="12" sm="6" md="4">
                <Timezone
                  v-model="task.Timezone"
                  :rules="requiredRules"
                  :field="timezonefield"
                  dense
                  class="v-timezone"
                ></Timezone>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="isSurvey" cols="12" sm="6" md="6">
                <Lookup
                  v-model="task.SurveyId"
                  :field="surveyLookupField"
                  :rules="requiredRules"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn
            color="primary"
            :disabled="!valid"
            depressed
            @click.native="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { getLookupData } from '~/config/apps/event/rest'
import strings from '~/strings.js'
import { required } from '~/utility/rules.js'
import { getApiUrl } from '~/utility/index.js'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
export default {
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
    dialog: {
      default: false,
      allowSpaces: false,
      type: Boolean,
    },
    buttonLabel: {
      default: 'Schedule a Task',
      allowSpaces: false,
      type: String,
    },
    item: {
      default: () => {},
      allowSpaces: false,
      type: Object,
    },
  },
  data() {
    debugger
    const isAction = this.item && this.item.Status === 'Wait for an Action'
    return {
      isDay: false,
      isTime: false,
      isAction,
      isDueDate: false,
      isTimezone: false,
      isSurvey: false,
      isDayDisabled: true,
      task: { ...this.item } || {},
      customers: [],
      customerId: '',
      valid: false,
      required: [required],
      // dialog: false,
      duplicateMessage: '',
      isSaveButtonDisabled: false,
      requiredRules: [required],
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'task.Timezone',
      },
      // formdata: {
      //   Title: '',
      //   Category: '',
      //   Status: '',
      //   EventAction: '',
      //   Day: 0,
      //   Time: '',
      //   SurveyId: '',
      //   Type: '',
      // },
      surveyLookupField: {
        displayOrder: 9,
        caption: 'Time*',
        type: 'lookup',
        dataSource: {
          getData: (ctx) => {
            const regexStr = '.*'
            const path = `/OrganizationInfos/surveyList?filter={"where":{"or":[{"name":{"like":"${regexStr}","options":"i"}}]}}`
            return getLookupData(path)
          },
          type: 'rest',
          itemText: 'name',
          itemValue: 'id',
        },
      },
      statusLookupField: {
        displayOrder: 9,
        caption: 'Status*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'Event_TaskStatus',
            }
          },
        },
      },
      actionLookupField: {
        displayOrder: 9,
        caption: 'Action*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'Event_TaskAction',
            }
          },
        },
      },
      dayLookupField: {
        displayOrder: 9,
        caption: 'Day*',
        type: 'lookup',
        disabled: true,
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'Event_AvailableDay',
            }
          },
        },
      },
      timeLookupField: {
        displayOrder: 9,
        caption: 'Time*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'AvailableHour',
            }
          },
        },
      },
      categoryLookupField: {
        displayOrder: 9,
        caption: 'Category*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'Event_TaskCategory',
            }
          },
        },
      },
    }
  },
  computed: {
    filter() {
      if (
        this.task.Category === 'Registration Email' ||
        this.task.Category === 'Calendar Invite'
      ) {
        return {
          value: { inq: ['Wait for an Action', 'Inactive'] },
        }
      }
      return {
        type: 'Event_TaskStatus',
      }
      // const propFields = {}
      // for (const field of ['Category','Status']) {
      //   propFields[field.fieldName] = field.dataSource
      //     ? field.dataSource.filter.call(this, this.formdata)
      //     : {}
      // }
      // return propFields
    },
    actionFilter() {
      if (
        this.task.Category === 'Registration Email' ||
        this.task.Category === 'Calendar Invite'
      ) {
        return {
          value: { inq: ['New Registration'] },
        }
      }
      return {
        type: 'Event_TaskAction',
      }
    },
  },

  methods: {
    dueDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const DueDate = v && new Date(v)
            if (!DueDate && DueDate === null) {
              return strings.FIELD_REQUIRED
            } else {
              return true
            }
          },
        ],
      }
    },
    showDayTime() {
      this.isDay = true
      this.isTime = true
      this.isTimezone = true
    },
    hideDayTime() {
      this.isDay = false
      this.isTime = false
      this.isTimezone = false
    },
    showDuedateTimezone() {
      this.isTimezone = true
      this.isDueDate = true
    },
    hideDuedateTimezone() {
      this.isTimezone = false
      this.isDueDate = false
    },
    changeCategory(value) {
      // if (this.task.Status === 'Wait for an Action') {
      //   this.isAction = true
      // } else {
      //   this.isAction = false
      // }
      this.isAction = this.task.Status === 'Wait for an Action'
      // if (
      //   this.task.Status === 'Wait for an Action' &&
      //   (value === 'Survey Invite' || value === 'Email')
      // ) {
      //   this.showDayTime()
      // } else {
      //   this.hideDayTime()
      // }
      debugger
      if (
        this.task.Status === 'Wait for an Action' &&
        value === 'Survey Invite'
      ) {
        this.isSurvey = true
        this.hideDuedateTimezone()
        this.showDayTime()
      } else if (this.task.Status === 'Schedule' && value === 'Survey Invite') {
        this.isSurvey = true
        this.hideDayTime()
        this.showDuedateTimezone()
      } else {
        this.hideDuedateTimezone()
        this.hideDayTime()
      }
    },
    changeStatus(value) {
      if (value === 'Wait for an Action') {
        this.isAction = true
      } else {
        this.isAction = false
      }
      if (
        value === 'Wait for an Action' &&
        (this.task.Category === 'Survey Invite' ||
          this.task.Category === 'Email')
      ) {
        this.hideDuedateTimezone()
        this.showDayTime()
      } else if (
        value === 'Schedule' &&
        (this.task.Category === 'Survey Invite' ||
          this.task.Category === 'Email')
      ) {
        this.hideDayTime()
        this.showDuedateTimezone()
      } else {
        this.hideDuedateTimezone()
        this.hideDayTime()
      }
    },
    closeForm() {
      this.dialog = false
      // this.$refs.form.reset()
    },
    async onSave() {
      this.isSaveButtonDisabled = true
      const eventId = this.$route.params.id
      const baseUrl = getApiUrl()
      this.task.Day = parseInt(this.task.Day)
      let res = null
      try {
        if (this.item.id) {
          res = await this.$axios.$patch(
            `${baseUrl}CRMACTIVITIES/${this.item.id}`,
            {
              ...this.task,
            }
          )
        } else {
          res = await this.$axios.$post(
            `${baseUrl}Events/${eventId}/crmactivity`,
            {
              ...this.task,
            }
          )
        }
      } catch (error) {
        console.log(
          `Error in task grid schedule a task on Save function - context: eventId - ${eventId} `
        )
      }
      if (res) {
        this.dialog = false
        this.refresh()
        // this.$refs.form.reset()
        this.isSaveButtonDisabled = false
        return res
      }
    },
  },
}
</script>
