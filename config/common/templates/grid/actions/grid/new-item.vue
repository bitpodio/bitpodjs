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
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">New Item</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
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
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" :disabled="!valid" depressed @click="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { formValidationMixin } from '~/utility'
import {
  formatTimezoneDateFieldsData,
  getGridFields,
  getMutationObject,
  formControlsMixin,
} from '~/utility/form'

function getFormDefaultValues(content, viewName) {
  const view = content.views[viewName]
  const fields = view.fields
  const intialFormData = {}
  for (const fieldName in fields) {
    const field = fields[fieldName]
    const defaultVal =
      typeof field.default === 'undefined' ? null : field.default
    intialFormData[fieldName] = defaultVal
  }
  return intialFormData
}

export default {
  mixins: [formControlsMixin, formValidationMixin],
  props: ['content', 'viewName', 'onNewItemSave'],
  data() {
    const fields = getGridFields(this.content, this.viewName)
    const intialFormData = getFormDefaultValues(this.content, this.viewName)
    return {
      fields,
      formData: intialFormData,
      dialog: false,
      valid: true,
      lazy: false,
    }
  },
  methods: {
    async onSave() {
      this.$refs.form.validate()
      if (this.valid) {
        const formData = formatTimezoneDateFieldsData(
          this.formData,
          this.fields
        )
        const mutationObject = getMutationObject(
          this.content,
          this.viewName,
          this
        )
        const newItemFormData = { ...mutationObject.new, ...formData }
        await this.onNewItemSave(newItemFormData)
        this.dialog = false
      }
    },
  },
}
</script>
