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
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
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

export default {
  mixins: [formControlsMixin, formValidationMixin],
  props: ['content', 'viewName', 'items', 'onUpdateItem'],
  data() {
    const fields = getGridFields(this.content, this.viewName, true)
    return {
      fields,
      formData: this.items[0],
      dialog: false,
      updateCount: 0,
      valid: true,
      lazy: false,
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
        const newEditFormData = { ...mutationObject.edit, ...formData }
        await this.onUpdateItem(newEditFormData)
        this.dialog = false
      }
    },
  },
}
</script>
