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
        <v-btn text small v-bind="attrs" v-on="on" @click="openDialog()">
          <v-icon left>fa-pencil</v-icon> {{ $t('Drawer.Edit') }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.NewSponsor" />
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
            :id="formName"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="formData.Organization"
                  :label="$t('Common.OrganizationName')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.FirstName"
                  :label="$t('Common.FirstName')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.LastName"
                  :label="$t('Common.LastName')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.Email"
                  :label="$t('Common.EmailCaption')"
                  outlined
                  dense
                ></v-text-field>
                <div
                  v-if="duplicateMessage !== ''"
                  class="red--text pa-3 pt-0 body-1 mt-n5"
                >
                  {{ duplicateMessage }}
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.CellPhone"
                  :label="$t('Common.Phone')"
                  number
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="formData.Website"
                  :label="$t('Common.Website')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="formData.ImageURL"
                  :label="$t('Common.LogoURL')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-select
                  v-model="Tags"
                  :items="tagsItems"
                  :label="$t('Common.Tags')"
                  outlined
                  dense
                ></v-select>
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
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
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
      tagsItems: [],
      Tags: '',
      formData: {
        FirstName: '',
        LastName: '',
        Department: '',
        Email: '',
        Job: '',
        CellPhone: '',
        Type: '',
        Organization: '',
        Website: '',
        ImageURL: '',
        Tags: [],
      },
      formName: 'new-memberContact-form',
      contactTypeItems: '',
      duplicateMessage: '',
    }
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('ContactTags')
      if (res) {
        this.tagsItems = res.map((i) => i.value)
      }
    } catch (e) {
      console.error(
        `Error in /templates/grids/eventSponsor-grid/actions/grid/new-item.vue while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getDropDownData('CRMContactType')
      if (res) {
        this.contactTypeItems = res.map((i) => i.value)
      }
    } catch (e) {
      console.error(
        `Error in /templates/grids/eventSponsor-grid/actions/grid/new-item.vue while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
  },
  methods: {
    onReset() {
      this.$refs.form.reset()
      this.duplicateMessage = ''
    },
    onClose() {
      this.$refs.form.reset()
      this.duplicateMessage = ''
      this.dialog = false
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.formData.Type = 'Sponsor'
      this.formData.Tags.push(this.Tags)
      console.log('data', this.formData)
      try {
        const res = await this.$axios.$put(
          `${url}Events/${this.$route.params.id}/contacts/${this.formData.id}`,
          this.formData
        )
        if (res) {
          this.dialog = false
          this.onReset()
          this.snackbarText = this.$t('Messages.Success.RecordUpdatedSuccess')
          this.snackbar = true
          this.refresh()
        }
      } catch (error) {
        if (error.response.status === 406) {
          this.duplicateMessage = this.$t('Messages.Error.ContactExists')
        }
        console.error(
          `Error in /templates/grids/eventSponsor-grid/actions/grid/new-item.vue while making a POST call to contact model from method onSave context:-URL:${url}`,
          error
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
        console.error(
          `Error in /templates/grids/eventSponsor-grid/actions/grid/new-item.vue while making a GQL call to GeneralConfiguration model from method getDropDownData`,
          e
        )
      }
    },
    openDialog() {
      this.formData = { ...this.items[0] }
      this.dialog = true
    },
  },
}
</script>
<style scoped>
.v-picker {
  border-radius: 0;
}
</style>
