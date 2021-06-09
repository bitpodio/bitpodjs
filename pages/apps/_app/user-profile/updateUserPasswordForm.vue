<template>
  <v-layout>
    <v-dialog
      v-model="updatePasswordDialog"
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
              <i18n path="Common.UpdatePassword" />
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
                  v-model="oldPassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  :label="$t('Common.OldPasswordReq')"
                  :rules="[rules.id4PasswordValidation]"
                  outlined
                  dense
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="newPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  :label="$t('Common.NewPasswordReq')"
                  :rules="[rules.id4PasswordValidation]"
                  outlined
                  dense
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="confirmPassword"
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  :label="$t('Common.ConfirmPasswordReq')"
                  :rules="[
                    rules.id4PasswordValidation,
                    passwordMismatchValidation,
                  ]"
                  outlined
                  dense
                  @click:append="show3 = !show3"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              v-if="updatePasswordDialog"
              :action="onSave"
              :disabled="!valid"
              color="primary"
              depresseds
              :has-submit-action="true"
              :form-name="formName"
              class="ml-2"
              ><i18n path="Drawer.Save"
            /></SaveButton>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
import { rules } from '~/utility/rules.js'
export default {
  props: {
    updatePasswordDialog: {
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
      formName: 'update-password-form',
      valid: false,
      formData: {},
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
      show1: false,
      show2: false,
      show3: false,
      passwordMismatchValidation: [
        (v) => {
          const newPassword = this.newPassword
          if (v !== newPassword) {
            this.valid = false
            return this.$t('Messages.Error.PasswordMismatch')
          } else {
            this.valid = true
            return true
          }
        },
      ],
    }
  },
  methods: {
    close() {
      this.updatePasswordDialog = false
      this.$emit('update:updatePasswordDialog', false)
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
    getID4ServerUrl() {
      const url = nuxtconfig.auth.strategies.bitpod.userInfoEndPointUrl
      console.log('url', url)
      return url.split('auth/')[0]
    },
    async onSave() {
      const url = `${this.getID4ServerUrl()}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.id}/UpdateCredentials`
      try {
        await this.$axios.$put(`${url}`, {
          ConfirmPassword: this.confirmPassword,
          Email: this.$auth.state.user.data.email,
          NewPassword: this.newPassword,
          OldPassword: this.oldPassword,
        })
        this.close()
        this.$emit(
          'update:snackbarText',
          this.$t('Messages.Success.PasswordUpdateSuccesMsg')
        )
        this.$emit('update:snackbar', true)
        this.$eventBus.$emit('refresh-page')
      } catch (err) {
        console.error('error', err)
      }
    },
  },
}
</script>
