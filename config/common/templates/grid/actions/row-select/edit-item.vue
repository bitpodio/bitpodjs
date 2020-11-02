<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left class="fs-16">fa-pencil</v-icon
          >{{ actionCaption('edit') }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">
            {{ $t('Common.EditDefaultForm', { subTitle: subTitle }) }}
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <div v-if="errorMessage !== ''" class="red--text ml-10">
          {{ errorMessage }}
        </div>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-container>
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
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn color="primary" :disabled="!valid" depressed @click="onSave"
            ><i18n path="Drawer.Save"
          /></v-btn>
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
  generateFormData,
  buildEmbededFieldData,
  formTitleMixin,
  gridActionMixin,
} from '~/utility/form'

export default {
  mixins: [
    formControlsMixin,
    formValidationMixin,
    formTitleMixin,
    gridActionMixin,
  ],
  props: {
    content: {
      type: null,
      default: null,
    },
    viewName: {
      type: String,
      required: true,
    },
    items: { type: Array, default: () => [] },
    onUpdateItem: { type: Function, default: () => {} },
    context: {
      type: null,
      default: null,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    const fields = getGridFields(this.content, this.viewName, true)
    return {
      fields,
      formData: generateFormData(this.items[0]),
      dialog: false,
      updateCount: 0,
      valid: true,
      lazy: false,
    }
  },
  watch: {
    items(newValue, oldValue) {
      this.updateCount = this.updateCount + 1
      this.formData = generateFormData(newValue[0])
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
        const newFormData = buildEmbededFieldData(formData)
        const newEditFormData = { ...mutationObject.edit, ...newFormData }

        try {
          await this.onUpdateItem(newEditFormData)
          this.dialog = false
        } catch (error) {
          console.error(
            `Errors in config/common/templates/grid/actions/grid/edit-item.vue on onSave method context:-${newEditFormData} `,
            error
          )
          this.errorMessage = error.message.split(':')[1]
        }
      }
    },
  },
}
</script>
