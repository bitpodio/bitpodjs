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
          <v-icon left>mdi-plus</v-icon> New Item
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-10 pb-9">New Item</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col
                v-for="field in fields"
                :key="field.fieldName"
                :class="field.cssClasses || 'col-12 col-md-6'"
              >
                <component
                  :is="formControl(field) || null"
                  v-model="formData[field.fieldName]"
                  :field="field"
                  :rules="rulesArray(field)"
                  :readonly="readonly[field.fieldName]"
                  :filter="filter[field.fieldName]"
                  :field-name="field.fieldName"
                  :content="content"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
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
import CustomDate from '~/components/common/form/date.vue'
import File from '~/components/common/form/file.vue'
import RichText from '~/components/common/form/richtext.vue'
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
    CustomDate,
    File,
    RichText,
    Timezone,
  },
  mixins: [formValidationMixin],
  props: ['content', 'viewName', 'onNewItemSave'],
  data() {
    const fields = getGridFields(this.content, this.viewName)
    return {
      fields,
      formData: {},
      dialog: false,
      valid: true,
      lazy: false,
    }
  },
  methods: {
    async onSave() {
      this.$refs.form.validate()
      const formData = formatTimezoneDateFieldsData(this.formData, this.fields)
      await this.onNewItemSave(formData)
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
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
