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
                :class="field.cssClasses || 'col-12 col-md-6'"
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
</template>

<script>
import TextField from '~/components/common/form/text-field.vue'
import Lookup from '~/components/common/form/lookup.vue'
import Checkbox from '~/components/common/form/checkbox.vue'
import RichText from '~/components/common/form/richtext.vue'
import CustomDate from '~/components/common/form/date.vue'
import File from '~/components/common/form/file.vue'
import Timezone from '~/components/common/form/timezone'
import { formValidationMixin } from '~/utility'
import { formatTimezoneDateFieldsData } from '~/utility/form'

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

export default {
  components: {
    TextField,
    Lookup,
    Checkbox,
    RichText,
    Timezone,
    CustomDate,
    File,
  },
  mixins: [formValidationMixin],
  props: ['content', 'viewName', 'items', 'onUpdateItem'],
  data() {
    const fields = getGridFields(this.content, this.viewName)
    return {
      fields,
      formData: this.items[0],
      dialog: false,
      updateCount: 0,
    }
  },
  watch: {
    items(newValue, oldValue) {
      this.updateCount = this.updateCount + 1
      this.formData = newValue[0]
    },
  },
  methods: {
    async onSave() {
      this.$refs.form.validate()
      const formData = formatTimezoneDateFieldsData(this.formData, this.fields)
      await this.onUpdateItem(formData)
      this.dialog = false
    },
    formControl(field) {
      switch (field.type) {
        case 'lookup':
          return 'Lookup'
        case 'checkbox':
          return 'Checkbox'
        case 'date':
        case 'datetime':
          return 'CustomDate'
        case 'file':
          return 'File'
        case 'string':
        case 'number':
          return 'TextField'
        case 'richtext':
          return 'RichText'
        case 'timezone':
          return 'Timezone'
      }
    },
  },
}
</script>
