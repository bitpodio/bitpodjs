<template>
  <div>
    <v-snackbar
      v-if="!hideToast"
      v-model="snackbar"
      :timeout="timeout"
      :top="true"
      width="2px"
    >
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-col class="px-0">
      <v-dialog
        v-model="dialog"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small v-bind="attrs" v-on="on">
            <v-icon left>{{ buttonIcon }}</v-icon>
            {{ buttonLabel }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-4 text-h5">
              <i18n
                v-if="buttonLabel === 'Edit Activity'"
                path="Common.EditScheduleATask"
              />
              <i18n
                v-if="buttonLabel !== 'Edit Activity'"
                path="Common.NewScheduleATask"
              />
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
                    :rules="[rules.required]"
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
                    :rules="[rules.required]"
                    :on-change="changeCategory"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <Lookup
                    v-model="task.Status"
                    :field="statusLookupField"
                    :filter="filter"
                    :rules="[rules.required]"
                    :on-change="changeStatus"
                  />
                </v-col>
                <v-col v-if="isAction" cols="12" sm="6" md="4">
                  <Lookup
                    v-model="task.Action"
                    :field="actionLookupField"
                    :rules="[rules.required]"
                    :filter="actionFilter"
                  />
                </v-col>
                <v-col v-if="isDueDate" cols="12" sm="6" md="4">
                  <v-datetime-picker
                    v-model="dueDate"
                    :text-field-props="dueDateProps()"
                    :rules="[rules.required]"
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
                    :rules="[rules.required]"
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
                    :rules="[rules.required]"
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
            <SaveBtn
              v-if="dialog"
              color="primary"
              :disabled="!valid || isSaveButtonDisabled || task.Status === ''"
              depressed
              :action="onSave"
              class="ml-2"
              ><i18n path="Drawer.Save"
            /></SaveBtn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
<script>
import { getLookupData } from '~/config/apps/event/rest'
import { rules } from '~/utility/rules.js'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
import SaveBtn from '~/components/common/saveButton'
export default {
  components: {
    SaveBtn,
  },
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
    buttonIcon: {
      default: 'mdi-plus',
      allowSpaces: false,
      type: String,
    },
  },
  data() {
    let task = { ...this.item } || {}
    task = task || {}
    const isAction = this.item && this.item.Status === 'Wait for an Action'
    let isSurvey = false
    let isDay = false
    let isTime = false
    if (this.item && this.item.Category === 'Survey Invite') {
      isSurvey = true
      if (this.item.Status === 'Wait for an Action') {
        isDay = true
        isTime = true
      }
    }
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
      snackbar: false,
      timeout: 2000,
      dueDate: null,
      rules: rules(this.$i18n),
      duplicateMessage: '',
      isSaveButtonDisabled: false,
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'task.Timezone',
      },
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
          itemValue: 'value',
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
    snackbarText() {
      return this.$t('Messages.Success.TaskCreatedSuccess')
    },
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
  watch: {
    dialog(newValue, oldValue) {
      if (newValue) {
        this.task = { ...this.item } || {}
      }
      this.isAction = this.item && this.item.Status === 'Wait for an Action'
      if (this.item && this.item.Category === 'Survey Invite') {
        this.isSurvey = true
        if (this.item.Status === 'Wait for an Action') {
          this.isDay = true
          this.isTime = true
        }
      }
      if (this.item && this.item.Category === 'Survey Invite') {
        this.isSurvey = true
        if (this.item.Status === 'Schedule') {
          this.isDueDate = true
          this.isTimezone = true
          this.dueDate = new Date(this.item.DueDate)
        }
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
            if (DueDate === '' || !DueDate || DueDate === null) {
              return this.$t('Messages.Error.ThisFieldRequired')
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
    removeDueDate() {
      this.dueDate = null
      delete this.task.DueDate
    },
    removeDayTime() {
      this.Day = ''
      delete this.task.Time
    },
    removeDueDateTimezone() {
      delete this.task.DueDate
      delete this.task.Timezone
    },
    removedAction() {
      delete this.task.Action
    },
    removeDayTimeTimezone() {
      this.Day = ''
      delete this.task.Time
      delete this.task.Timezone
    },
    removeSurvey() {
      delete this.task.SurveyId
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
        delete this.task.Status
        this.hideDuedateTimezone()
        this.hideDayTime()
        this.removeDueDate()
        this.removeDayTime()
        this.removeDueDateTimezone()
        this.removedAction()
        this.removeSurvey()
      }
    },
    changeStatus(value) {
      if (value === 'Wait for an Action') {
        this.isAction = true
        this.removeDueDate()
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
        this.removeDayTime()
        this.showDuedateTimezone()
      } else {
        this.hideDuedateTimezone()
        this.removeDueDateTimezone()
        this.removeDueDate()
        this.hideDayTime()
        this.removeDayTime()
        this.removedAction()
        this.removeSurvey()
      }
    },
    changeSurvey(value, context) {
      const items = context.items
      const filterObj = items.filter(({ id }) => id === value)
      this.task.SurveyName = filterObj[0].name
    },
    resetForm() {
      this.$refs.form.reset()
      this.task.Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      this.task.DueDate = ''
      this.isAction = false
      this.isDay = false
      this.isTime = false
      this.isAction = false
      this.isDueDate = false
      this.isSurvey = false
      this.isTimezone = false
      this.task = {}
      this.Day = ''
      this.dueDate = null
    },
    closeForm() {
      this.dialog = false
      this.resetForm()
    },
    async onSave() {
      this.isSaveButtonDisabled = true
      const eventId = this.$route.params.id
      const baseUrl = this.$bitpod.getApiUrl()
      this.task.Day = parseInt(this.Day)
      this.task.Type = 'Scheduled'
      this.task.DueDate = this.dueDate
      let res = null
      try {
        if (this.item && this.item.id) {
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
        this.$refs.form.reset()
        this.refresh()
        this.resetForm()
        if (this.item && this.item.id) {
          this.$emit(
            'update-snackbar',
            this.$t('Messages.Success.TaskUpdatedSuccess')
          )
        } else {
          this.snackbar = true
        }
        this.isSaveButtonDisabled = false
        return res
      }
    },
  },
}
</script>
