<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="editTemplate"
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
            <v-row>
              <v-col cols="12" class="pb-0">
                <RichText
                  v-model="selected.Body"
                  class="pl-0"
                  :is-edit-template="true"
                  :is-general="template === 'General Template'"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn color="primary" depressed @click.native="onSave">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import { getApiUrl } from '~/utility'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
  },
  props: {
    editTemplate: {
      type: Boolean,
      default: false,
    },
    selected: {
      default: () => {},
      allowSpaces: false,
      type: Object,
    },
  },
  data() {
    return {
      valid: false,
    }
  },
  methods: {
    onClose() {
      this.$emit('update:editTemplate', false)
    },

    async onSave() {
      this.isSaveButtonDisabled = true
      const url = getApiUrl()
      this.selected.Documents = this.fileList
      let res = null
      try {
        res = await this.$axios.$patch(
          `${url}MarketingTemplates/${this.selected.id}`,
          { Body: this.selected.Body }
        )
      } catch (e) {
        this.isSaveButtonDisabled = false
        console.log(
          `Error in pages/apps/organization/_id/editTemplte while making a PATCH call to MarketingTemplates model from method onSave context:-${this.selected}`,
          e
        )
      }
      if (res) {
        this.onClose()
      }
    },
  },
}
</script>
