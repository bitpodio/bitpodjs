<template>
  <v-col class="px-0">
    <v-btn text small @click.stop="onNewClick">
      <v-icon left>mdi-plus</v-icon>
      {{ $t(actionCaption('new')) }}
    </v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="text--primary pt-5 pb-3 text-h5">
            {{ $t('Common.NewDefaultForm', { subTitle: subTitle }) }}
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <div v-if="errorMessage !== ''" class="red--text mx-10">
          {{ errorMessage }}
        </div>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form
            :id="formName"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            @submit.prevent="submitForm"
          >
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
                  :field="translate(field)"
                  :rules="
                    visible[field.fieldName] === false ? [] : rulesArray(field)
                  "
                  :readonly="readonly[field.fieldName]"
                  :filter="filter[field.fieldName]"
                  :field-name="field.fieldName"
                  :content="content"
                  :dropdown-options="dropdownOptions"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveBtn
            v-if="dialog"
            color="primary"
            :disabled="!valid"
            :label="this.$t('Drawer.Save')"
            depressed
            :action="onSave"
            :reset="resetBtn"
            :has-submit-action="true"
            :has-external-submit="true"
            :form-name="formName"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import SaveBtn from '~/components/common/saveButton'
import { formValidationMixin } from '~/utility'
import { postGaData } from '~/utility/index.js'
import {
  formatTimezoneDateFieldsData,
  getGridFields,
  getMutationObject,
  formControlsMixin,
  buildEmbededFieldData,
  formTitleMixin,
  gridActionMixin,
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
  components: {
    SaveBtn,
  },
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
    onNewItemSave: {
      type: Function,
      default: () => {},
    },
    context: {
      type: null,
      default: null,
    },
    dropdownOptions: {
      type: Object,
      default: () => {},
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
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
      resetBtn: false,
      formName: `new-${this.viewName}-form`,
    }
  },
  watch: {
    dialog(newVal) {
      if (newVal) {
        const formLabel = this.$t('Common.NewDefaultForm', {
          subTitle: this.subTitle,
        })
        postGaData('New', formLabel)
      }
    },
  },
  methods: {
    onClose() {
      this.dialog = false
      const formLabel = this.$t('Common.NewDefaultForm', {
        subTitle: this.subTitle,
      })
      postGaData('Close', formLabel)
    },
    async onSave() {
      const formLabel = this.$t('Common.NewDefaultForm', {
        subTitle: this.subTitle,
      })
      postGaData(this.$t('Drawer.Save'), formLabel)
      this.$refs.form.validate()
      this.errorMessage = ''
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
        try {
          await this.onNewItemSave(newItemFormData)
          this.dialog = false
        } catch (error) {
          console.error(
            `Errors in config/common/templates/grid/actions/grid/new-item.vue on onSave method context:-${newItemFormData} `,
            error
          )
          this.errorMessage = error.message.split(':')[1]
          this.resetBtn = !this.resetBtn
        }
      }
    },
    onNewClick() {
      const intialFormData = getFormDefaultValues(this.content, this.viewName)
      this.formData = intialFormData
      this.updateCount = this.updateCount + 1
      this.dialog = true
      this.errorMessage = ''
    },
    translate(field) {
      if (!field.form) {
        return field
      }
      return Object.assign({}, field, {
        form: { caption: this.$t(field.form.caption) },
      })
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
  },
}
</script>
