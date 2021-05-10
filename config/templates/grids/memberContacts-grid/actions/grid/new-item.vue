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
        <v-btn text small v-bind="attrs" v-on="on" @click="dialog = true">
          <v-icon left>mdi-plus</v-icon> <i18n path="Common.NewContact" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.NewContact" />
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
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            :id="formName"
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="formData.FirstName"
                  "label="$t(Common.FirstName)"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="formData.LastName"
                  :label="$t('Common.LastName')""
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field label="Job Title" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-select
                  v-model="formData.Department"
                  :items="departmentItems"
                  :label="$t('Common.Department')"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="formData.Phone"
                  :label="$t('Common.MobilePhone')"
                  :rules="[rules.required]"
                  number
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="formData.Email"
                  :label="$t('Common.Email')"
                  :rules="[rules.email, rules.required]"
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
          <SaveButton
            v-if="dialog"
            color="primary"
            :action="onSave"
            :disabled="!valid"
            depressed
            :has-submit-action="true"
            :has-external-submit="true"
            :form-name="formName"
            class="ml-2"
            ><i18n path="Drawer.Save"
          /></SaveButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import { rules } from '~/utility/rules.js'
import { formatGQLResult } from '~/utility/gql.js'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import SaveButton from '~/components/common/saveButton'
export default {
  components: {
    SaveButton,
  },
  props: {
    refresh: {
      type: Function,
      default: () => false,
    },
  },

  data() {
    return {
      rules: rules(this.$i18n),
      dialog: false,
      valid: false,
      snackbar: false,
      snackbarText: '',
      timeout: 3000,
      departmentItems: [],
      formData: {
        FirstName: '',
        LastName: '',
        Department: '',
        Email: '',
        JobTitle: '',
        Phone: '',
      },
      formName: 'new-memberContact-form',
    }
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('CRMDepartment')
      if (res) {
        this.departmentItems = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
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
      try {
        const res = await this.$axios.$post(
          `${url}Customers/${this.$route.params.id}/CutomerContact`,
          this.formData
        )
        if (res) {
          this.dialog = false
          this.onReset()
          this.snackbarText = this.$t('Messages.Success.RecordCreateSuccess')
          this.snackbar = true
          this.refresh()
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/accessKey-grid/actions/grid/new-item.vue while making a POST call to Users model from method onSave context:-URL:-${url}\nformData:-${this.formData} `,
          e
        )
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
    async getDropDownData(filterType) {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${generalconfiguration}
          `,
          variables: {
            filters: {
              where: {
                type: filterType,
              },
            },
          },
        })
        if (result) {
          const generalConfig = formatGQLResult(
            result.data,
            'GeneralConfiguration'
          )
          return generalConfig
        }
      } catch (e) {
        console.log(
          `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
          e
        )
      }
    },
  },
}
</script>
<style scoped>
.v-picker {
  border-radius: 0;
}
</style>
