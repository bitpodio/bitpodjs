<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="onNew">
          <v-icon left>mdi-plus</v-icon> <i18n path="Drawer.CreateUser" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.NewUser" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form
            id="new-userRoles-item-form"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            @submit.prevent="onSave"
          >
            <v-row>
              <v-col cols="12" sm="10" md="8" class="pb-0">
                <v-text-field
                  ref="emailField"
                  v-model="email"
                  :label="$t('Common.EnterEmail')"
                  :rules="[rules.email, rules.required]"
                  outlined
                  dense
                  :error-messages="duplicateMessage"
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
            :disabled="!valid"
            depressed
            :reset="reset"
            type="submit"
            form="new-userRoles-item-form"
            ><i18n path="Drawer.Save"
          /></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { rules } from '~/utility/rules.js'
import { postGaData } from '~/utility/index.js'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
    viewName: {
      type: String,
      default: '',
    },
    content: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      rules: rules(this.$i18n),
      valid: false,
      dialog: false,
      formData: {
        emailId: '',
      },
      email: '',
      lazy: false,
      snackbar: false,
      snackbarText: '',
      timeout: 3000,
      duplicateMessage: '',
      reset: false,
    }
  },
  methods: {
    onNew() {
      this.dialog = true
      postGaData('New', this.$t('Common.NewUser'))
    },
    onClose() {
      this.formData.emailId = ''
      this.duplicateMessage = ''
      this.$refs.form.reset()
      this.dialog = false
      postGaData('Close', this.$t('Common.NewUser'))
    },
    async onSave() {
      this.reset = false
      postGaData(this.$t('Drawer.Save'), this.$t('Common.NewUser'))
      if (this.valid) {
        const url = this.$bitpod.getApiUrl()
        this.formData.emailId = this.email
        const orgId = this.$store.state.currentOrg.id
        this.formData.id = orgId
        try {
          const res = await this.$axios.$post(
            `${url}Organizations/${orgId}/Users`,
            this.formData
          )
          if (res) {
            this.$refs.emailField.blur()
            this.onClose()
            this.$nextTick(() => {
              this.snackbarText = this.$t(
                'Messages.Success.UserCreatedSuccessfully'
              )
              this.snackbar = true
              this.refresh()
            })
          }
        } catch (error) {
          if (error.response.status === 400) {
            this.duplicateMessage = this.$t('Messages.Error.UserExists')
            this.reset = !this.reset
            setTimeout(() => {
              this.duplicateMessage = ''
            }, 1000)
          }
          console.log(
            `Error in templates/grids/userRoles-grid/actions/grid/new-item.vue while making a POST call to Users model from method onSave context:-URL:-${url}\n OrgId:-${orgId}\n formData:-${this.formData} `,
            error
          )
        }
      }
    },
  },
}
</script>
