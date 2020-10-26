<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="editMetadata"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              Edit Template
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="onClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="template.Name"
                    label="Template Name*"
                    :rules="requiredRules"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <Lookup
                    v-model="template.Type"
                    :field="typeLookupField"
                    :rules="requiredRules"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="template.Subject"
                    label="Subject*"
                    :rules="requiredRules"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <Lookup
                    v-model="template.Category"
                    :field="categoryLookupField"
                    :rules="requiredRules"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <File
                    :field="fileField"
                    :value="[...template.Documents].filter((i) => i)"
                    label="Upload"
                    @input="getAttachmentId"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    v-model="template.ImageURL"
                    label="Image URL"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn
              color="primary"
              :disabled="!valid || isSaveButtonDisabled"
              depressed
              @click.native="onSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import File from '~/components/common/form/file.vue'
import { required } from '~/utility/rules.js'
export default {
  components: {
    File,
  },
  props: {
    editMetadata: {
      type: Boolean,
      default: false,
    },
    selected: {
      default: () => {},
      allowSpaces: false,
      type: Object,
    },
    refresh: {
      type: Function,
      required: false,
      default: null,
    },
  },
  data() {
    let fileList = []
    fileList = this.selected.Documents ? this.selected.Documents : []
    const template = { ...this.selected }
    return {
      valid: false,
      template,
      fileField: {
        multiple: true,
        caption: 'Attachment',
      },
      isSaveButtonDisabled: false,
      fileList,
      orgLogo: false,
      allow: true,
      requiredRules: [required],
      typeLookupField: {
        displayOrder: 9,
        caption: 'Type*',
        type: 'lookup',
        dataSource: {
          query: generalconfiguration,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'TemplateType',
            }
          },
        },
      },
      categoryLookupField: {
        displayOrder: 9,
        caption: 'Category*',
        type: 'lookup',
        dataSource: {
          query: generalconfiguration,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'TemplateCategory',
            }
          },
        },
      },
    }
  },
  methods: {
    getAttachmentId(data) {
      this.fileList = data
    },
    onClose() {
      this.$emit('update:editMetadata', false)
    },
    async onSave() {
      this.isSaveButtonDisabled = true
      const url = this.$bitpod.getApiUrl()
      this.template.Documents = this.fileList
      let res = null
      try {
        res = await this.$axios.$patch(
          `${url}MarketingTemplates/${this.template.id}`,
          this.template
        )
      } catch (e) {
        this.isSaveButtonDisabled = false
        console.log(
          `Error in pages/apps/organization/_id/editMetadata while making a PATCH call to MarketingTemplates model from method onSave context:-${this.template}`,
          e
        )
      }
      if (res) {
        this.$parent.refresh()
        this.onClose()
      }
    },
  },
}
</script>
