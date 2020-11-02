<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>{{ buttonIcon }}</v-icon> {{ buttonLabel }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 text-h5">
            <i18n path="Common.ScheduleATask" />
          </h2>
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
                  :label="$t('Common.Title')"
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
                  :label="$t('Common.DueDateRequired')"
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
                  v-model="Day"
                  :field="dayLookupField"
                  :disabled="true"
                />
              </v-col>
              <v-col v-if="isTime" cols="12" sm="6" md="4">
                <Lookup v-model="task.Time" :field="timeLookupField" />
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
              <v-col v-if="isSurvey" cols="12">
                <Lookup
                  v-model="task.SurveyId"
                  :field="surveyLookupField"
                  :rules="requiredRules"
                  :on-change="changeSurvey"
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
            :disabled="!valid || isSaveButtonDisabled"
            depressed
            @click.native="onSave"
            ><i18n path="Drawer.Save" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { getLookupData } from '~/config/apps/event/rest'
import strings from '~/strings.js'
import { required } from '~/utility/rules.js'
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
    items: {
      default: () => {},
      allowSpaces: false,
      type: Object,
    },
    buttonIcon: {
      default: 'mdi-plus',
      allowSpaces: false,
      type: String,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const isAction = this.items && this.items[0].Status === 'Wait for an Action'
    let isSurvey = false
    let isDay = false
    let isTime = false
    if (this.items && this.items[0].Category === 'Survey Invite') {
      isSurvey = true
      if (this.items[0].Status === 'Wait for an Action') {
        isDay = true
        isTime = true
      }
    }
    let task = {}
    task = this.items ? { ...this.items[0] } : {}
    const intDay = task.Day || 1
    task.Day =
      Number(intDay).toString().length === 1 ? `0${intDay}` : `${intDay}`
    return {
      isDay,
      isTime,
      isAction,
      isDueDate: false,
      isTimezone: false,
      isSurvey,
      isDayDisabled: true,
      task,
      Day: task.Day,
      customers: [],
      customerId: '',
      valid: false,
      required: [required],
      duplicateMessage: '',
      isSaveButtonDisabled: false,
      requiredRules: [required],
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'task.Timezone',
      },
      isCreate: false,
      surveyLookupField: {
        displayOrder: 9,
        caption: 'Search Survey*',
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
        caption: 'Day',
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
        caption: 'Time',
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
      this.isAction = this.task.Status === 'Wait for an Action'
      this.isSurvey = value === 'Survey Invite'
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
        this.task.Category === 'Survey Invite'
      ) {
        this.isSurvey = true
        this.hideDuedateTimezone()
        this.showDayTime()
      } else if (
        value === 'Schedule' &&
        this.task.Category === 'Survey Invite'
      ) {
        this.isSurvey = true
        this.hideDayTime()
        this.showDuedateTimezone()
      } else {
        this.hideDuedateTimezone()
        this.hideDayTime()
      }
    },
    changeSurvey(value) {
      this.task.SurveyName = value
    },
    resetForm() {
      this.$refs.form.reset()
      this.task.Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      this.isAction = false
      this.isDay = false
      this.isTime = false
      this.isAction = false
      this.isDueDate = false
      this.isSurvey = false
      this.isTimezone = false
      this.task = {}
      this.Day = ''
    },
    closeForm() {
      this.dialog = false
      this.resetForm()
    },
    async onSave() {
      this.isSaveButtonDisabled = true
      const baseUrl = this.$bitpod.getApiUrl()
      this.task.Day = parseInt(this.Day)
      this.task.Type = 'Template'
      let res = null
      try {
        if (this.items && this.items[0].id) {
          this.isCreate = false
          res = await this.$axios.$patch(
            `${baseUrl}CRMACTIVITIES/${this.items[0].id}`,
            {
              ...this.task,
            }
          )
        } else {
          this.isCreate = true
          res = await this.$axios.$post(`${baseUrl}CRMACTIVITIES`, {
            ...this.task,
          })
        }
      } catch (error) {
        console.log(`Error in task grid schedule a task on Save function`)
      }
      if (res) {
        this.dialog = false
        this.resetForm()
        this.refresh()
        this.isSaveButtonDisabled = false
        return res
      }
    },
  },
}
</script>
