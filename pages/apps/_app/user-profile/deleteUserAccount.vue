<template>
  <v-layout>
    <v-dialog
      v-model="deleteAccountDialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              <i18n path="Common.DeleteAccount" />
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
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="email"
                  :disabled="true"
                  :label="$t('Common.EmailCaption')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  :label="$t('Common.PasswordReq')"
                  :rules="[rules.required]"
                  :error-messages="message"
                  outlined
                  dense
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              v-if="deleteAccountDialog"
              :action="onSave"
              :disabled="!valid"
              color="primary"
              :reset="reset"
              depresseds
              :label="$t('Drawer.Delete')"
              :has-submit-action="true"
              :form-name="formName"
              class="ml-2"
              ><i18n path="Drawer.Delete"
            /></SaveButton>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
import { rules } from '~/utility/rules.js'
import { getID4ServerUrl } from '~/utility'
export default {
  props: {
    deleteAccountDialog: {
      type: Boolean,
      default: false,
    },
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      rules: rules(this.$i18n),
      show1: false,
      valid: false,
      email: this.$auth.state.user.data.email,
      password: '',
      formName: 'delete-account',
      message: '',
      formData: {},
      reset: false,
    }
  },
  methods: {
    close() {
      this.deleteAccountDialog = false
      this.$emit('update:deleteAccountDialog', false)
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
    async onSave() {
      this.reset = false
      const url = `${getID4ServerUrl(this)}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.id}`
      this.formData.OldPassword = this.password
      try {
        await this.$axios.$delete(`${url}`, { data: this.formData })
        this.close()
        this.$emit(
          'update:snackbarText',
          this.$t('Messages.Success.AccountDeleteSuccess')
        )
        this.$emit('update:snackbar', true)
        this.$eventBus.$emit('refresh-page')
      } catch (err) {
        if (err.response.status === 400) {
          this.message = this.$t('Messages.Error.CredentialMismatch')
          this.reset = !this.reset
          setTimeout(() => {
            this.message = ''
          }, 1000)
        }
        console.error(
          `Error in apps/userprofile/deleteUserAccount.vue in onSave method context:-\nURl:${url} \nerror:${err}`
        )
      }
    },
  },
}
</script>
