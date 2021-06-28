<template>
  <v-layout>
    <v-dialog
      v-model="editUserProfileDialog"
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
              <i18n path="Common.EditUserProfileInfo" />
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
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="resData.firstName"
                  :label="$t('Common.FirstNameCaption')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="resData.lastName"
                  :label="$t('Common.LastNameCaption')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="phone"
                  :label="$t('Common.Phone')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="email"
                  :label="$t('Common.Email')"
                  :disabled="true"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <Language
                  v-model="resData.language"
                  :field="languagefield"
                  outlined
                  dense
                ></Language>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-select
                  :key="timezoneItems.id"
                  v-model="resData.timezone"
                  :items="timezoneItems"
                  :value="timezoneItems.displayName"
                  item-text="displayName"
                  item-value="id"
                  :label="$t('Common.TimeZone')"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="address"
                  :label="$t('Common.Address')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="city"
                  :label="$t('Common.City')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="state"
                  :label="$t('Common.State')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="country"
                  :label="$t('Common.Country')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="zipCode"
                  :label="$t('Common.ZipCode')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              v-if="editUserProfileDialog"
              :action="onSave"
              :disabled="!valid"
              color="primary"
              depressed
              :has-submit-action="true"
              :form-name="formName"
              class="ml-2"
              ><i18n path="Drawer.DeleteAccount"
            /></SaveButton>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
import Language from '~/components/common/form/languageID4'
import { rules } from '~/utility/rules.js'
import { getID4ServerUrl } from '~/utility'
export default {
  components: {
    Language,
  },
  props: {
    editUserProfileDialog: {
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
      valid: false,
      timezonefield: {
        caption: this.$t('Common.TimeZone'),
        type: 'Timezone',
      },
      rules: rules(this.$i18n),
      formName: 'edit-user-profile-info',
      resData: {},
      email: this.$auth.state.user.data.email,
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        language: '',
        timezone: null,
        contact: {
          address: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
          phone: '',
        },
      },
      languagefield: {
        caption: 'Language',
        type: 'Language',
        fieldName: 'resData.Language',
      },
      timezoneItems: [],
    }
  },
  mounted() {
    this.getUserData()
    this.getTimezone()
  },
  methods: {
    close() {
      this.editUserProfileDialog = false
      this.$emit('update:editUserProfileDialog', false)
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
    async getTimezone() {
      const url = `${getID4ServerUrl()}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.id}/timeZones`
      try {
        const res = await this.$axios.$get(`${url}`)
        if (res) {
          this.timezoneItems = res
        }
      } catch (e) {
        console.error(
          `Error in apps/userprofile/editUserpProfileInfo.vue in getTimezone method context:-\nURl:${url} \nerror:${e}`
        )
      }
    },
    async getUserData() {
      const url = `${getID4ServerUrl()}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.sub}`
      try {
        const res = await this.$axios.$get(`${url}`)
        this.resData = Object.entries(res).length > 0 ? res : {}
        if (Object.entries(this.resData.contact).length > 0) {
          this.address = this.resData.contact.address
          this.phone = this.resData.contact.phone
          this.city = this.resData.contact.city
          this.state = this.resData.contact.state
          this.country = this.resData.contact.country
          this.zipCode = this.resData.contact.zipCode
        }
        this.timezoneItems.map((ele) => {
          if (ele.id === this.resData.timeZone) {
            this.resData.timezone = ele.id
          }
        })
      } catch (e) {
        console.error(
          `Error in apps/userprofile/editUserpProfileInfo.vue in getUserData method context:-\nURl:${url} \nerror:${e}`
        )
      }
    },
    async onSave() {
      this.timezoneItems.forEach((ele) => {
        if (ele.id === this.resData.timezone) {
          this.formData.timeZone = ele.id
        }
      })
      this.formData.firstName = this.resData.firstName || ''
      this.formData.lastName = this.resData.lastName || ''
      this.formData.email = this.email || ''
      this.formData.contact.phone = this.phone || ''
      this.formData.timezone = this.resData.timezone || null
      this.formData.language = this.resData.language || ''
      this.formData.contact.address = this.address || ''
      this.formData.contact.city = this.city || ''
      this.formData.contact.state = this.state || ''
      this.formData.contact.country = this.country || ''
      this.formData.contact.zipCode = this.zipCode || ''
      const url = `${getID4ServerUrl()}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.id}`
      try {
        const res = await this.$axios.$put(`${url}`, {
          ...this.formData,
        })
        if (res) {
          this.close()
          this.$emit(
            'update:snackbarText',
            this.$t('Messages.Success.UserProfileUpdatedSuccessMsg')
          )
          this.$emit('update:snackbar', true)
          this.$eventBus.$emit('refresh-page')
        }
      } catch (err) {
        console.error(
          `Error in apps/userprofile/editUserpProfileInfo.vue in onSave method context:-\nURl:${url} \nerror:${err}`
        )
      }
    },
  },
}
</script>
