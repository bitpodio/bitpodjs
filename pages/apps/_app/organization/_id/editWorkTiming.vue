<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="editWorkTiming"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              Edit Organization Setting
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="onClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <span class="ml-0 body-1">Available Hours</span>
            <v-row>
              <v-col cols="12" sm="6" md="5" class="pb-0">
                <v-select
                  v-model="formData.AvailableStartHour"
                  :items="timingDropDown"
                  label="Start Time"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="5" class="pb-0">
                <v-select
                  v-model="formData.AvailableEndHour"
                  :items="timingDropDown"
                  label="End Time"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <div class="col-md-12">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1">
                    <i class="fa-repeat pr-1" aria-hidden="true"></i> Working
                    Days
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
                  :label="day.dayName"
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
            <v-btn color="primary" depressed @click.native="onSave">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import { formatGQLResult } from '~/utility/gql.js'
import organization from '~/config/apps/admin/gql/organization.gql'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { getApiUrl } from '~/utility'
export default {
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
        { dayName: 'sunday', selected: false },
        { dayName: 'monday', selected: false },
        { dayName: 'tuesday', selected: false },
        { dayName: 'wednesday', selected: false },
        { dayName: 'thursday', selected: false },
        { dayName: 'friday', selected: false },
        { dayName: 'saturday', selected: false },
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
    onClose() {
      this.$emit('update:editWorkTiming', false)
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    async onSave() {
      const url = getApiUrl()
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
          this.refresh()
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
        this.formData = organization[0]
        this.formData.id = this.$route.params.id
        this.currency = this.formData.Currency
        this.venueAddress = organization[0]._CurrentAddress
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
