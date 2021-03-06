<template>
  <div>
    <v-snackbar
      v-if="!hideToast"
      v-model="snackbar"
      :timeout="timeout"
      :top="true"
      width="2px"
    >
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-dialog
      v-model="isCancelReg"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
        @submit.prevent="submitForm"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-4 text-h5">
              <i18n path="Common.Comment" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="comment"
                  outlined
                  required
                  :rules="[rules.required]"
                  dense
                  rows="4"
                  placeholder="Say something"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveBtn
              v-if="isCancelReg"
              color="primary"
              :disabled="!valid"
              depressed
              :action="onSave"
              :has-submit-action="true"
              form-name="cancel-registrationMain-form"
              class="ml-2"
              ><i18n path="Common.Comment"
            /></SaveBtn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { rules } from '~/utility/rules.js'
import SaveBtn from '~/components/common/saveButton'
import { postGaData } from '~/utility/index.js'
export default {
  components: {
    SaveBtn,
  },
  props: {
    isCancelReg: {
      type: Boolean,
      default: false,
      allowSpaces: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      rules: rules(this.$i18n),
      valid: false,
      snackbar: false,
      timeout: 2000,
    }
  },
  computed: {
    snackbarText() {
      return this.$t('Messages.Success.CancelRegistrationSuccess')
    },
  },
  watch: {
    valid(newVal) {
      if (newVal) {
        postGaData('Edit', this.$t('Common.Comment'))
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:isCancelReg', false)
      this.$refs.form.reset()
      postGaData('Close', this.$t('Common.Comment'))
    },
    async onSave() {
      postGaData(this.$t('Drawer.Save'), this.$t('Common.Comment'))
      const baseUrl = this.$bitpod.getApiUrl()
      const regId = this.$route.params.id
      let commentRes = null
      let regRes = null
      try {
        commentRes = await this.$axios.$post(
          `${baseUrl}Registrations/${regId}/Comment`,
          {
            Notes: this.comment,
          }
        )
      } catch (e) {
        console.error(
          `Error in Save function of cancel registration form, context: create comment , baseUrl: ${baseUrl} regId: ${regId} comment: ${this.comment} error: ${e}`
        )
      }
      if (commentRes) {
        try {
          regRes = await this.$axios.$post(
            `${baseUrl}Registrations/update?where={"id":"${regId}"}`,
            {
              Status: 'Cancelled',
            }
          )
        } catch (e) {
          console.error(
            `Error in Save function of cancel registration form, context: cancel registration , baseUrl: ${baseUrl} registrationId: ${regId} status: Cancelled, error: ${e}`
          )
        }
      }
      if (regRes) {
        this.close()
        this.$parent.$refs.notes.fetchAllComments()
        this.snackbar = true
        this.$emit('registrationCancelled')
        return regRes
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'cancel-registrationMain-form')
    },
  },
}
</script>
