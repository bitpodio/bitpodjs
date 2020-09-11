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
                v-show="visible[field.fieldName]"
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
  buildEmbededFieldData,
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
        const newFormData = buildEmbededFieldData(formData)
        const newItemFormData = { ...mutationObject.new, ...newFormData }
        await this.onNewItemSave(newItemFormData)
        this.dialog = false
      }
    },
  },
}
</script>
