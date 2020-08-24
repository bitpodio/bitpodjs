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
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import TextField from '../form/text-field.vue'
import Lookup from '../form/lookup.vue'
import Checkbox from '../form/checkbox.vue'
import { formatResult, getContentByName, getViewQuery } from '~/utility'
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
        plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
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
    formattedEvents(calendarData) {
      return calendarData
        ? calendarData.map((event) => {
            const allDay = this.rnd(0, 3) === 0
            return {
              title: event.Title,
              start: new Date(event.StartDate),
              end: new Date(event.EndDate),
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              timed: !allDay,
              editFormData: event,
            }
          })
        : []
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
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
        this.formData = tableData ? tableData[1] : []
        this.calendarOptions.events = this.formattedEvents(tableData)
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

<style scoped>
.app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
</style>
