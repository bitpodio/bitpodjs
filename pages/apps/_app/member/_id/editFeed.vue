<template>
  <div>
    <v-dialog
      v-model="feedForm"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-form
        :id="formName"
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
        @submit.prevent="submitForm"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              <i18n path="Common.EditFeed" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click.native="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="formData.Title"
                  :label="$t('Common.Title')"
                  outlined
                  :rules="[rules.required]"
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <RichText v-model="formData.Body" class="pl-0" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              v-if="feedForm"
              color="primary"
              :disabled="!valid"
              depressed
              :label="this.$t('Drawer.Save')"
              :action="onSave"
              :has-submit-action="true"
              :has-external-submit="true"
              :form-name="formName"
              class="ml-2"
            ></SaveButton>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { rules } from '~/utility/rules.js'
import { postGaData } from '~/utility/index.js'
import SaveButton from '~/components/common/saveButton'

export default {
  components: {
    SaveButton,
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
  },
  props: {
    feedForm: {
      type: Boolean,
      default: false,
    },
    selected: {
      default: () => {},
      allowSpaces: false,
      type: Object,
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      data: {
        feed: {},
      },
      formName: 'editFeed',
      rules: rules(this.$i18n),
      formData: this.selected || {},
      valid: true,
      feedData: {
        Title: '',
        Body: '',
      },
    }
  },
  methods: {
    close() {
      this.$emit('update:feedForm', false)
      //   this.onReset()
      postGaData('Close', this.$t('Common.EditFeed'))
    },
    async onSave() {
      postGaData(this.$t('Drawer.Save'), this.$t('Common.EditFeed'))
      try {
        const obj = { Title: this.formData.Title, Body: this.formData.Body }
        const url = this.$bitpod.getApiUrl()
        const res = await this.$axios.$patch(`${url}Feeds/${this.id}`, obj)
        if (res) {
          this.close()
          this.$emit(
            'update:snackbarText',
            this.$t('Messages.Success.EventDetailsUpdateSuccess')
          )
          this.$emit('update:snackbar', true)
          this.$eventBus.$emit('update-event-details')
          this.data.feed = res
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
  },
}
</script>
