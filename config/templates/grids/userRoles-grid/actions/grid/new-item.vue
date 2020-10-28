<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="dialog = true">
          <v-icon left>mdi-plus</v-icon> Create User
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start font-weight-regular"
        >
          <h2 class="black--text pt-10 pb-9 font-weight-regular">New User</h2>
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
              <v-col cols="12" sm="10" md="8" class="pb-0">
                <v-text-field
                  v-model="email"
                  label="Enter Email *"
                  :rules="emailRules"
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
          <v-btn color="primary" :disabled="!valid" depressed @click="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { email, required } from '~/utility/rules.js'

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
      emailRules: [required, email],
      valid: false,
      dialog: false,
      formData: {
        emailId: '',
      },
      email: '',
      lazy: false,
    }
  },
  methods: {
    onReset() {
      this.$refs.form.reset()
    },
    onClose() {
      this.$refs.form.reset()
      this.dialog = false
    },
    async onSave() {
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
          this.dialog = false
          this.onReset()
          this.refresh()
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/userRoles-grid/actions/grid/new-item.vue while making a POST call to Users model from method onSave context:-URL:-${url}\n OrgId:-${orgId}\n formData:-${this.formData} `,
          e
        )
      }
    },
  },
}
</script>
