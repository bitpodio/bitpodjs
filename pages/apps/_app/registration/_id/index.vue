<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column class="mxw-w70">
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-row>
          <v-col class="col-md-5 col-12 pt-0">
            <v-card class="elevation-0 mt-n2">
              <v-list class="pt-0">
                <v-list-item class="pl-0">
                  <v-list-item-avatar size="62">
                    <v-avatar
                      color="primary"
                      size="62"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span class="white--text Twitter">{{
                        data.registration.FirstName
                      }}</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <h2 class="text-capitalize text-truncate">
                        {{ data.registration.FirstName }}
                      </h2>
                    </v-list-item-title>
                    <v-list-item-subtitle>{{
                      data.registration.Status
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col class="col-md-5 col-12 pt-0">
            <div class="text-truncate my-3 mt-0">
              <v-icon class="mr-2 fs-16">mdi-email-outline</v-icon>
              {{ data.registration.Email }}
            </div>
            <div class="text-truncate my-3">
              <v-icon class="mr-2 fs-16">mdi-cellphone-iphone</v-icon>
              {{ data.registration.Phone }}
            </div>
            <div class="text-truncate my-3">
              <v-icon class="mr-2 fs-16">mdi-map-marker-outline</v-icon>
              {{ data.registration.Country }}
            </div>
          </v-col>

          <v-col class="col-md-2 col-12 pt-0">
            <v-menu bottom origin="center center" transition="scale-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn depressed color="primary" v-bind="attrs" v-on="on">
                  <i18n path="Drawer.Action" />
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item @click="isEditReg = true">
                  <v-list-item-icon class="mr-2">
                    <i
                      class="fa fa-pencil-square-o mt-1"
                      aria-hidden="true"
                    ></i>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      ><i18n path="Drawer.Edit"
                    /></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="data.registration.Status === 'Success'"
                  @click="isCancelReg = true"
                >
                  <v-list-item-icon class="mr-2">
                    <i class="fa-cross-circle mt-1" aria-hidden="true"></i>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      ><i18n path="Drawer.Cancel"
                    /></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="data.registration.TotalAmount > 0"
                  @click="isRefund = true"
                >
                  <v-list-item-icon class="mr-2">
                    <i class="fa-refresh mt-1" aria-hidden="true"></i>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      ><i18n path="Common.Refund"
                    /></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-flex class="d-flex flex-row align-center">
          <v-chip pill class="greybg" v-on="on">
            <v-avatar left color="warning" size="24">
              <span class="white--text name-initial">{{
                data.registration.FirstName
              }}</span>
            </v-avatar>
            <span>{{ data.registration.FirstName }}</span>
          </v-chip>
          <v-subheader class="d-inline-flex pl-1"
            ><span class="pl-1"
              >Registered on
              {{ formatDate(data.registration.createdDate) }}.</span
            ></v-subheader
          >
        </v-flex>
      </div>
      <div
        v-if="content"
        class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-ticket pr-1" aria-hidden="true"></i>
            <i18n path="Common.Tickets" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  <i18n path="Common.Name" />
                </th>
                <th class="text-left">
                  <i18n path="Common.Amount" />
                </th>
                <th class="text-left">
                  <i18n path="Common.Quantity" />
                </th>
                <th class="text-left">
                  <i18n path="Common.Total" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i18n path="Common.Student" /></td>
                <td>{{ data.registration.SubTotal }}</td>
                <td>{{ data.registration.TicketQuantity }}</td>
                <td>{{ data.registration.TotalAmount }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td><i18n path="Common.Total" /></td>
                <td>
                  {{ data.registration.Currency
                  }}{{ data.registration.TotalAmount }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div
        v-if="content"
        class="xs12 sm8 md8 lg8 boxview pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
            <i18n path="Common.Sessions" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="registrationSessions"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm8 md8 lg8 boxview pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-users pr-1" aria-hidden="true"></i>
            <i18n path="Common.Attendees" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="registrationAttendees"
          :content="content"
          :context="data"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm8 md8 lg8 boxview pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-mail pr-1" aria-hidden="true"></i>
            <i18n path="Common.Emails" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="registrationEmails"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="data.registration._Refund"
        class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-credit-card pr-1" aria-hidden="true"></i>
            <i18n path="Common.RefundDetails" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <v-row>
          <v-col class="col-md-6 col-12">
            <i18n path="Common.TransactionID" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.registration._Refund &&
                    data.registration._Refund.TransactionID
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <i18n path="Common.Amount" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.registration._Refund && data.registration._Refund.Amount
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <i18n path="Common.Status" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.registration._Refund &&
                    data.registration._Refund.RefundStatus
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <i18n path="Common.Reason" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.registration._Refund && data.registration._Refund.Reason
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <i18n path="Common.Comment" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.registration._Refund &&
                    data.registration._Refund.Comments
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <i18n path="Common.Date" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.registration._Refund &&
                    data.registration._Refund.RefundInitiatedDate
                )
              }}
            </div>
          </v-col>
        </v-row>
      </div>
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-comments-alt pr-1" aria-hidden="true"></i>
            <i18n path="Common.Notes" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Notes model-name="Registrations" />
      </div>
    </v-flex>
    <v-flex column class="mxw-w30">
      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 pr-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-info-circle pr-1" aria-hidden="true"></i>
            <i18n path="Common.EventInformation" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <i18n path="Common.EventName" class="body-2 text--secondary" />

          <div class="body-1">
            {{ formatField(data.registration.EventName) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.StartDate" class="body-2 text--secondary" />

          <div class="body-1 text--primary">
            {{ formatField(data.registration.BookingDate) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.EndDate" class="body-2 text--secondary" />

          <div class="body-1">
            {{ formatField(data.registration.ExpiryYear) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.Address" class="body-2 text--secondary" />

          <div class="body-1">
            -
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 pr-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-banknote pr-1" aria-hidden="true"></i>
            <i18n path="Common.PaymentDetails" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <i18n path="Common.CardType" class="body-2 text--secondary" />

          <div class="body-1">
            {{
              formatField(
                data.registration._CustomerPayment &&
                  data.registration._CustomerPayment.brand
              )
            }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.NameonCard" class="body-2 text--secondary" />

          <div class="body-1">
            {{
              formatField(
                data.registration._CustomerPayment &&
                  data.registration._CustomerPayment.card_holder_name
              )
            }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.CardNumber" class="body-2 text--secondary" />

          <div class="body-1">
            {{
              formatField(
                data.registration._CustomerPayment &&
                  data.registration._CustomerPayment.last4
              )
            }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.TransactionId" class="body-2 text--secondary" />

          <div class="body-1">
            {{
              formatField(
                data.registration._CustomerPayment &&
                  data.registration._CustomerPayment.id
              )
            }}
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 pr-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-question-circle pr-1" aria-hidden="true"></i>
            <i18n path="Common.SurveyQuestions" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <editRegistration :is-edit-reg.sync="isEditReg" />
    <cancelRegistration :is-cancel-reg.sync="isCancelReg" />
    <refundRegistration :is-refund.sync="isRefund" />
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import editRegistration from './editRegistration.vue'
import refundRegistration from './refundRegistration.vue'
import cancelRegistration from './cancelRegistration.vue'
import Grid from '~/components/common/grid'
import Notes from '~/components/common/notes'
import registration from '~/config/apps/event/gql/registration.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
export default {
  components: {
    Grid,
    Notes,
    editRegistration,
    cancelRegistration,
    refundRegistration,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      isEditReg: false,
      isCancelReg: false,
      isRefund: false,
      data: {
        registration: {},
      },
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Registrations : null
    },
    // filter() {
    //   return {
    //     where: {
    //       Email: this.contact.Email,
    //     },
    //   }
    // },
  },
  methods: {
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    formatAddressField(fieldValue) {
      return fieldValue || ' '
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${registration}
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
        const registration = formatGQLResult(data, 'Registration')
        return {
          registration: registration.length > 0 ? registration[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>
