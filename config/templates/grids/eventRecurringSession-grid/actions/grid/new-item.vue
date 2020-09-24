<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> New Recurring Session
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-10 pb-9">New Session</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <div class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                  Basic Information
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <v-text-field
                  v-model="session.Name"
                  label="Name*"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.Type"
                  :field="typeProps"
                  :rules="required"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <v-text-field
                  v-model="session.MaxAllow"
                  label="Max Allow*"
                  outlined
                  type="number"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1">
                  <i class="fa fa-clock" aria-hidden="true"></i>
                  Session Time
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.StartTime"
                  :field="startTimeProps"
                  :rules="required"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.EndTime"
                  :field="endTimeProps"
                  :rules="required"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Timezone
                  v-model="session.Timezone"
                  :rules="requiredRules"
                  :field="timezonefield"
                  dense
                  class="v-timezone"
                ></Timezone>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.Duration"
                  :field="durationProps"
                  :rules="required"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <v-text-field
                  v-model="session.Duration"
                  label="Duration"
                  outlined
                  type="number"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1">
                  <i class="fa fa-location" aria-hidden="true"></i>
                  Location
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.LocationType"
                  :field="locationTypeProps"
                  :rules="required"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="Phone"
                  label="Phone"
                  outlined
                  dense
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="WebinarLink"
                  label="online meeting link*"
                  outlined
                  dense
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <div v-if="isZoom">
                  To send Zoom joining info, you must setup Zoom integration,
                  <a href="" @click.stop.prevent="openWindow(zoomDocumentLink)"
                    >click here</a
                  >
                  for documentation.
                </div>
                <div v-if="isGoogleMeet">
                  To send google meet joining info, you must setup google meet
                  integration,
                  <a
                    href=""
                    @click.stop.prevent="openWindow(googleMeetDocumentLink)"
                    >click here</a
                  >
                  for documentation.
                </div>
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
            :disabled="!valid || isSaveButtonDisabled"
            depressed
            @click.native="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
// import member from '~/config/apps/event/gql/memberList.gql'
import { required } from '~/utility/rules.js'
import { getApiUrl } from '~/utility/index.js'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
export default {
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      valid: false,
      required: [required],
      dialog: false,
      isSaveButtonDisabled: false,
      isZoom: true,
      isGoogleMeet: false,
      session: {},
      typeProps: {
        type: 'lookup',
        caption: 'Type*',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'SessionType',
            }
          },
        },
      },
      startTimeProps: {
        type: 'lookup',
        caption: 'Start Time*',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'AvailableHour',
            }
          },
        },
      },
      endTimeProps: {
        type: 'lookup',
        caption: 'End Time*',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'AvailableHour',
            }
          },
        },
      },
      durationProps: {
        type: 'lookup',
        caption: 'Duration',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'EventDuration',
            }
          },
        },
      },
      locationTypeProps: {
        type: 'lookup',
        caption: 'Type*',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'LocationType',
            }
          },
        },
      },
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'session.Timezone',
      },
    }
  },

  methods: {
    openWindow(link) {
      window.open(link, '_blank')
    },
    async onSave() {
      this.duplicateMessage = ''
      this.isSaveButtonDisabled = true
      const offerCodeId = this.$route.params.id
      const baseUrl = getApiUrl()
      let res = null
      try {
        res = await this.$axios.$put(
          `${baseUrl}OfferCodes/${offerCodeId}/getMember/rel/${this.customerId}`
        )
      } catch (error) {
        this.isSaveButtonDisabled = false
        if (error.response.status === 422) {
          this.duplicateMessage = 'Already exist member!'
        }
      }
      if (res) {
        this.dialog = false
        this.refresh()
        this.customerId = ''
        return res
      }
    },
  },
}
</script>
