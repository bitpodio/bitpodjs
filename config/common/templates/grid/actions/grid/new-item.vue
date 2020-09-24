<template>
  <v-col class="px-0">
    <v-btn text small @click.stop="onNewClick">
      <v-icon left>mdi-plus</v-icon> New
    </v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">New {{ subTitle }}</h2>
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
                :key="`${field.fieldName}${updateCount}`"
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
  formTitleMixin,
} from '~/utility/form'

function getFormDefaultValues(content, viewName) {
  const view = content.views[viewName]
  const fields = view.fields
  const intialFormData = {}
  for (const fieldName in fields) {
    const field = fields[fieldName]
    const defaultVal =
      typeof field.default === 'undefined' ? null : field.default
    const isNewFormField =
      typeof field.newForm === 'undefined' ? true : field.newForm
    if (isNewFormField) {
      intialFormData[fieldName] = defaultVal
    }
  }
  return intialFormData
}

export default {
  mixins: [formControlsMixin, formValidationMixin, formTitleMixin],
  props: ['content', 'viewName', 'onNewItemSave', 'context'],
  data() {
    const fields = getGridFields(this.content, this.viewName)
    const intialFormData = getFormDefaultValues(this.content, this.viewName)
    return {
      fields,
      formData: intialFormData,
      dialog: false,
      valid: true,
      lazy: false,
      updateCount: 0,
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
    onNewClick() {
      const intialFormData = getFormDefaultValues(this.content, this.viewName)
      this.formData = intialFormData
      this.updateCount = this.updateCount + 1
      this.dialog = true
    },
  },
}
</script>
