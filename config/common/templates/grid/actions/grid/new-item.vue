<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          New Item
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-row>
                <v-col
                  v-for="field in fields"
                  :key="field.fieldName"
                  cols="12"
                  md="12"
                >
                  <!-- :class="field.cssClasses || 'xs12 sm6 md6 lg8'" -->
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
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn :disabled="!valid" color="blue darken-1" text @click="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import TextField from '~/components/common/form/text-field.vue'
import Lookup from '~/components/common/form/lookup.vue'
import Checkbox from '~/components/common/form/checkbox.vue'
import CustomDate from '~/components/common/form/date.vue'
import File from '~/components/common/form/file.vue'
import RichText from '~/components/common/form/richtext.vue'
import { formValidationMixin } from '~/utility'

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
      await this.onNewItemSave(this.formData)
      this.dialog = false
    },
    formControl(field) {
      switch (field.type) {
        case 'lookup':
          return 'Lookup'
        case 'checkbox':
          return 'Checkbox'
        case 'date':
          return 'CustomDate'
        case 'file':
          return 'File'
        case 'string':
        case 'number':
          return 'TextField'
        case 'richtext':
          return 'RichText'
      }
    },
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
