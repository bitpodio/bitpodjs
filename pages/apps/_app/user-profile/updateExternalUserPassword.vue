<template>
  <v-layout>
    <v-dialog
      v-model="updateExternalUserDialog"
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
              <i18n path="Common.SetUpBitpodPassword" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click.native="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text
            v-if="beforeIsVerified"
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0"
          >
            <v-row>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <span>{{
                  $t('Common.VerifyOTPTemplate', {
                    emailId: $auth.state.user.data.email,
                  })
                }}</span>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="verificationCode"
                  :label="$t('Common.VerifyCode')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text
            v-if="isVerified"
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0"
          >
            <v-row>
              <v-col cols="12" sm="12" md="12" class="pb-0">
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
                  @change="changeNewPassword"
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
            v-if="beforeIsVerified"
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              v-if="updateExternalUserDialog"
              :action="onSave"
              :disabled="!valid"
              color="primary"
              :reset="resetBtn"
              depresseds
              :has-submit-action="true"
              :form-name="formName"
              class="ml-2"
              ><i18n path="Drawer.Save"
            /></SaveButton>
          </v-card-actions>
          <v-card-actions
            v-if="isVerified"
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              v-if="updateExternalUserDialog"
              :action="onUpdatePassword"
              :disabled="!valid"
              color="primary"
              :reset="resetBtn"
              depressed
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
    updateExternalUserDialog: {
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
      formName: 'setupBitpodPassword',
      valid: false,
      verificationCode: '',
      show2: false,
      show3: false,
      rules: rules(this.$i18n),
      isVerified: false,
      beforeIsVerified: false,
      resetBtn: false,
      formData: {},
      newPassword: '',
      confirmPassword: '',
    }
  },
  mounted() {
    this.getVerificationCode()
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
      this.updateExternalUserDialog = false
      this.$emit('update:updateExternalUserDialog', false)
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
    async onSave() {
      const url = `${getID4ServerUrl()}api/tiers/users/${
        this.$auth.state.user.data.email
      }/verifyOTP`
      try {
        const res = await this.$axios.$post(`${url}`, {
          OTP: this.verificationCode,
        })
        if (res.statusCode === 200) {
          this.beforeIsVerified = false
          this.isVerified = true
          this.resetBtn = !this.resetBtn
          this.valid = false
        }
      } catch (err) {
        console.error(
          `Error in apps/userprofile/updateExternalUserPasswordForm.vue in onSave method context:-\nURl:${url} \n OTP:${this.verificationCode} \nerror:${err}`
        )
      }
    },
    async onUpdatePassword() {
      const url = `${getID4ServerUrl()}api/tiers/users/${
        this.$auth.state.user.data.id
      }/updateBitpodPassword`
      this.formData.NewPassword = this.newPassword
      this.formData.Email = this.$auth.state.user.data.email
      try {
        const res = await this.$axios.$post(`${url}`, this.formData)
        if (res.statusCode === 200) {
          this.close()
          this.$emit(
            'update:snackbarText',
            this.$t('Messages.Success.PasswordUpdateSuccesMsg')
          )
          this.$emit('update:snackbar', true)
          this.$eventBus.$emit('refresh-page')
        }
      } catch (err) {
        this.resetBtn = !this.resetBtn
        console.error(
          `Error in apps/userprofile/updateExternalUserPasswordForm.vue in onUpdatePassword method context:-\nURl:${url} \nerror:${err}`
        )
      }
    },
    async getVerificationCode() {
      this.beforeIsVerified = true
      const url = `${getID4ServerUrl()}api/tiers/users/${
        this.$auth.state.user.data.email
      }/sendotppasswordupdate`
      try {
        await this.$axios.$get(`${url}`)
      } catch (err) {
        console.error(
          `Error in apps/userprofile/updateExternalUserPasswordForm.vue in onSave method context:-\nURl:${url} \nerror:${err}`
        )
      }
    },
  },
}
</script>
