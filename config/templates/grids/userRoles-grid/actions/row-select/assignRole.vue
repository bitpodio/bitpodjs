<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="setUsername">
          <v-icon left class="fs-16">fa-pencil</v-icon>Assign Role
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start font-weight-regular"
        >
          <h2 class="black--text pt-10 pb-9 font-weight-regular">
            Assign role
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
              <v-col cols="12">
                <v-text-field
                  v-model="userName"
                  disabled="true"
                  label="Username"
                  :rules="required"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="roles"
                  :rules="fieldRules"
                  :items="rolesDropDown"
                  label="Role*"
                  outlined
                ></v-select>
              </v-col>
              <span v-if="message != ''" class="red--text pl-3 pt-1">{{
                message
              }}</span>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn
            color="primary"
            :disabled="!valid || roles === ''"
            depressed
            @click="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { required } from '~/utility/rules.js'
export default {
  props: {
    refresh: {
      type: Function,
      default: () => false,
    },
  },
  data() {
    return {
      valid: false,
      dialog: false,
      rolesDropDown: [],
      fieldRules: [required],
      roles: [],
      userName: '',
      formData: {},
      message: '',
    }
  },
  mounted() {
    this.getRoles()
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
      if (this.roles !== '') {
        this.message = ''
      }
      const url = this.$bitpod.getApiUrl()
      this.formData.fk = this.userName
      this.formData.id = this.$attrs.items[0].orgId
      this.formData.roleId = this.roles
      try {
        const res = await this.$axios.$post(
          `${url}Organizations/${this.$attrs.items[0].orgId}/Users/${this.userName}/Roles
        `,
          this.formData
        )
        if (res) {
          this.roles = []
          this.dialog = false
          this.onReset()
          this.refresh()
        }
      } catch (e) {
        this.message = 'Please select a role'
        console.log(
          `Error in templates/grids/userRoles-grid/actions/row-select/assignRole.vue while making a POST call to User model from method onSave context:-URL:-${url}\n formData:-${this.formData}\n OrganizationId:-${this.$attrs.items[0].orgId}\n UserName:-${this.userName} `,
          e
        )
      }
    },
    async getRoles() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(`${url}OrganizationInfos/roles`)
        if (res) {
          this.rolesDropDown = res.map((i) => i.name)
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/userRoles-grid/actions/row-select/assignRole.vue while making a GET call to OrganizationInfo model from method getRoles context:-URL:-${url} `,
          e
        )
      }
    },
    setUsername() {
      this.userName = this.$attrs.items[0].email
    },
  },
}
</script>
