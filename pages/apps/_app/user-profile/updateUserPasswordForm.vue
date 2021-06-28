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
                  :error-messages="message"
                  outlined
                  dense
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0 xs-3">
                <v-text-field
                  v-model="newPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  :label="$t('Common.NewPasswordReq')"
                  :rules="
                    newPasswordMismatchValidation().concat(
                      rules.id4PasswordValidation
                    )
                  "
                  outlined
                  dense
                  @click:append="show2 = !show2"
                  @change="changeNewPassword()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="confirmPassword"
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  :label="$t('Common.ConfirmPasswordReq')"
                  :rules="
                    confirmPasswordMismatchValidation().concat(
                      rules.id4PasswordValidation
                    )
                  "
                  outlined
                  dense
                  @click:append="show3 = !show3"
                  @change="changeConfirmPassword()"
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
              :reset="reset"
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
import { rules } from '~/utility/rules.js'
import { getID4ServerUrl } from '~/utility'
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
      message: '',
      reset: false,
    }
  },
  methods: {
    changeNewPassword() {
      this.$refs.form && this.$refs.form.validate()
    },
    changeConfirmPassword() {
      this.$refs.form && this.$refs.form.validate()
    },
    confirmPasswordMismatchValidation() {
      return [
        (v) => {
          const confirmPassword = v
          let errorMsg = ''
          if (confirmPassword !== this.newPassword)
            errorMsg = this.$t('Messages.Error.PasswordMismatch')
          else errorMsg = ''
          return errorMsg || true
        },
      ]
    },
    newPasswordMismatchValidation() {
      return [
        (v) => {
          const newPassword = v
          let errorMessage = ''
          if (newPassword !== this.confirmPassword)
            errorMessage = this.$t('Messages.Error.PasswordMismatch')
          else errorMessage = ''
          return errorMessage || true
        },
      ]
    },
    close() {
      this.message = ''
      this.updatePasswordDialog = false
      this.$emit('update:updatePasswordDialog', false)
      this.$refs.form.reset()
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
    async onSave() {
      this.reset = false
      const url = `${getID4ServerUrl()}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.id}/UpdateCredentials`
      try {
        const res = await this.$axios.$put(`${url}`, {
          ConfirmPassword: this.confirmPassword,
          Email: this.$auth.state.user.data.email,
          NewPassword: this.newPassword,
          OldPassword: this.oldPassword,
        })
        console.log('res', res)
        this.close()
        this.$emit(
          'update:snackbarText',
          this.$t('Messages.Success.PasswordUpdateSuccesMsg')
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
          `Error in apps/userprofile/updateUserPasswordForm.vue in onSave method context:-\nURl:${url} \nerror:${err}`
        )
      }
    },
  },
}
</script>
