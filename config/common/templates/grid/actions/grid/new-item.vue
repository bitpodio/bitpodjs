<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
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
                  sm="6"
                >
                  <component
                    :is="formControl(field) || null"
                    v-model="formData[field.fieldName]"
                    :field="field"
                    :rules="rulesArray(field)"
                    :readonly="readonly[field.fieldName]"
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
  </v-col>
</template>

<script>
import TextField from '~/components/common/form/text-field.vue'
import Lookup from '~/components/common/form/lookup.vue'
import Checkbox from '~/components/common/form/checkbox.vue'
import CustomDate from '~/components/common/form/date.vue'
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
        case 'string':
        case 'number':
          return 'TextField'
      }
    },
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
