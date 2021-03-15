<template>
  <v-layout>
    <v-dialog
      v-model="editWorkTiming"
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
              <i18n path="Common.EditOrganizationSetting" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="onClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <i18n path="Common.AvailableHours" class="ml-0 body-1" />
            <v-row>
              <v-col cols="12" sm="6" md="5" class="pb-0">
                <v-select
                  v-model="formData.AvailableStartHour"
                  :items="timingDropDown"
                  :label="$t('Common.StartTime')"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="5" class="pb-0">
                <v-select
                  v-model="formData.AvailableEndHour"
                  :items="timingDropDown"
                  :label="$t('Common.EndTime')"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <div class="col-md-12">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1">
                    <i class="fa-repeat pr-1" aria-hidden="true"></i>
                    <i18n path="Common.WorkingDays" />
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
                <v-divider></v-divider>
              </div>
              <v-col
                v-for="(day, k) in selectedDays"
                :key="k"
                cols="4"
                class="py-0"
              >
                <v-checkbox
                  v-model="day.selected"
                  :label="day.dayNameLang"
                  class="mt-0"
                  height="20"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              v-if="editWorkTiming"
              color="primary"
              depressed
              :action="onSave"
              :has-submit-action="true"
              form-name="edit-workTiming-form"
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
import gql from 'graphql-tag'
import { formatGQLResult } from '~/utility/gql.js'
import organization from '~/config/apps/admin/gql/organization.gql'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import SaveButton from '~/components/common/saveButton'

export default {
  components: {
    SaveButton,
  },
  props: {
    editWorkTiming: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      valid: false,
      formData: {},
      venueAddress: {},
      data: {
        organization: {},
      },
      startTiming: [],
      endTiming: [],
      selectedDays: [
        {
          dayNameLang: this.$t('Common.Sundays'),
          dayName: 'sunday',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Mondays'),
          dayName: 'monday',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Tuesdays'),
          dayName: 'tuesday',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Wednesdays'),
          dayName: 'wednesday',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Thursdays'),
          dayName: 'thursday',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Fridays'),
          dayName: 'friday',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Saturdays'),
          dayName: 'saturday',
          selected: false,
        },
      ],
      timingDropDown: [],
      workingDay: [],
    }
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('AvailableHour')
      if (res) {
        this.timingDropDown = res.map((i) => i.value)
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
      this.formData.AvailableStartHour = ''
      this.formData.AvailableEndHour = ''
    },
    onClose() {
      this.$emit('update:editWorkTiming', false)
      this.onReset()
    },
    refresh() {
      this.$refs.form.$parent.$parent.refresh()
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.formData.weekDay = this.selectedDays
        .filter((x) => x.selected)
        .map((y) => y.dayName)
      try {
        const res = await this.$axios.$patch(
          `${url}OrganizationInfos/${this.$route.params.id}`,
          this.formData
        )
        if (res) {
          this.onClose()
          this.$emit('update:snackbar', true)
          this.$store.commit('setCurrentOrgInfo', this.formData)
          this.$eventBus.$emit('organization-details-updated')
        }
      } catch (e) {
        console.log(
          `Error in pages/apps/organization/_id/editWorkTiming while making a PATCH call to Organization Info model from method onSave context:-URL:-${url}\nformData:-${this.formData}`,
          e
        )
      }
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
          `Error in pages/apps/organization/_id/editWorkTiming while making a GQL call to Organization Info model from method getDropDownData context:-filterType:-${filterType}`,
          e
        )
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'edit-workTiming-form')
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${organization}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        const organization = formatGQLResult(data, 'OrganizationInfo')
        this.formData = { ...organization[0] }
        this.formData.id = this.$route.params.id
        this.formData._PaymentGatewaySetting.id = this.formData
          ._PaymentGatewaySetting.id
          ? atob(this.formData._PaymentGatewaySetting.id).split(':')[1]
          : ''
        this.formData._CurrentAddress.id = this.formData._CurrentAddress.id
          ? atob(this.formData._CurrentAddress.id).split(':')[1]
          : ''
        this.currency = this.formData.Currency
        this.venueAddress = { ...organization[0]._CurrentAddress }
        this.formData.weekDay.map((x) => {
          this.selectedDays.map((y) => {
            if (x === y.dayName) {
              y.selected = true
            }
          })
        })
        return {
          organization: organization.length > 0 ? organization[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
        console.log(
          'Error while fetching data from organization model while making GQL call from apollo data query section',
          error
        )
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>
