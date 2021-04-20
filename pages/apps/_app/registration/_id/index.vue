<template>
  <div>
    <v-flex class="detailview-head mb-3"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36"><i18n path="Common.Registration" /></v-text
    ></v-flex>
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
                      <v-list-item-subtitle>
                        <v-chip
                          small
                          :class="{
                            blue: data.registration.Status === 'Cancelled',
                            red: data.registration.Status === 'Failed',
                            orange: data.registration.Status === 'Pending',
                            success: data.registration.Status === 'Success',
                          }"
                          text-color="white"
                        >
                          {{ data.registration.Status }}</v-chip
                        ></v-list-item-subtitle
                      >
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
                {{
                  formatField(
                    data.registration._CurrentAddress &&
                      data.registration._CurrentAddress.AddressLine
                  )
                }}
                {{
                  formatField(
                    data.registration._CurrentAddress &&
                      data.registration._CurrentAddress.State
                  )
                }}
              </div>
            </v-col>

            <v-col class="col-md-2 col-12 pt-0">
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
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
          <v-flex class="d-flex flex-row align-center flex-wrap pt-2 pt-sm-0">
            <v-chip pill class="greybg" v-on="on">
              <v-avatar left color="warning" size="24">
                <span class="white--text name-initial">{{
                  data.registration.FirstName
                }}</span>
              </v-avatar>
              <span>{{ data.registration.FirstName }}</span>
            </v-chip>
            <v-subheader
              v-if="data.registration.createdDate !== undefined"
              class="d-inline-flex pl-1"
            >
              {{
                $t('Common.RegisteredOn', {
                  date: $d(
                    new Date(data.registration.createdDate),
                    'long',
                    $i18n.locale
                  ),
                })
              }}
            </v-subheader>
          </v-flex>
        </div>
        <div
          v-if="content && data.event && data.event.HasTickets"
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
                <tr v-for="item in attendeeData" :key="item">
                  <td>{{ item.ticketName }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.count }}</td>
                  <td>{{ item.total }}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td><i18n path="Common.SubTotal" /></td>
                  <td>
                    <i18n-n
                      v-if="regData.Currency"
                      :value="regData.SubTotal"
                      :format="{ key: 'currency', currency: regData.Currency }"
                      :locale="$i18n.locale"
                    >
                    </i18n-n>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td><i18n path="Common.Discount" /></td>
                  <td>
                    <i18n-n
                      v-if="regData.Currency"
                      :value="regData.Discount"
                      :format="{ key: 'currency', currency: regData.Currency }"
                      :locale="$i18n.locale"
                    >
                    </i18n-n>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td><i18n path="Common.Total" /></td>
                  <td>
                    <i18n-n
                      v-if="regData.Currency"
                      :value="regData.TotalAmount"
                      :format="{ key: 'currency', currency: regData.Currency }"
                      :locale="$i18n.locale"
                    >
                    </i18n-n>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <div v-if="data && data.event && data.event.BusinessType === 'Single'">
          <div
            v-if="content"
            class="xs12 sm8 md8 lg8 boxview pad-card pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
          >
            <div class="sticky d-flex flex-column justify-center boxview">
              <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
                <h2 class="body-1 pb-0">
                  <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
                  <i18n path="Common.Sessions" />
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
              <v-divider></v-divider>
            </div>
            <Grid
              view-name="registrationSessions"
              :content="content"
              class="mt-n12"
              :no-action="!data.event.HasTickets"
              :has-custom-no-data-text="
                !data.event.HasTickets ? $t('Common.SessionsNotAvailable') : ''
              "
            />
          </div>
        </div>
        <div
          v-if="data && data.event && data.event.BusinessType === 'Recurring'"
        >
          <div
            v-if="content"
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pad-card pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
          >
            <div class="sticky d-flex flex-column justify-center boxview">
              <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
                <h2 class="body-1 pb-0">
                  <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
                  <i18n path="Common.Sessions" />
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
              <v-divider></v-divider>
            </div>
            <Grid
              view-name="registrationRecurringSessions"
              :content="content"
              class="mt-n12"
            />
          </div>
        </div>
        <div
          v-if="content"
          class="xs12 sm8 md8 lg8 boxview pad-card pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-users pr-1" aria-hidden="true"></i>
                <i18n path="Common.Attendees" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid
            view-name="registrationAttendees"
            :content="content"
            :context="data"
            class="mt-n12"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm8 md8 lg8 boxview pad-card pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-mail pr-1" aria-hidden="true"></i>
                <i18n path="Common.Emails" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
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
              <i18n
                path="Common.TransactionID"
                class="body-2 text--secondary"
              />

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
                    data.registration._Refund &&
                      data.registration._Refund.Amount
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
                    data.registration._Refund &&
                      data.registration._Refund.Reason
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
          class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-comments-alt pr-1" aria-hidden="true"></i>
              <i18n path="Common.Notes" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Notes ref="notes" model-name="Registrations" />
        </div>
      </v-flex>
      <v-flex column class="mxw-w30">
        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 pr-2 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                  <i18n path="Common.EventInformation" />
                </h2>
              </template>
              <span><i18n path="Common.EventInformation" /></span>
            </v-tooltip>
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
              {{ StartDate }}
            </div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.EndDate" class="body-2 text--secondary" />

            <div class="body-1">
              {{ EndDate }}
            </div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.Address" class="body-2 text--secondary" />
            <div class="body-1">{{ VenueName }}{{ AddressLine }}</div>
          </v-flex>
        </div>

        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 pr-2 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                  <i18n path="Common.PaymentDetails" />
                </h2>
              </template>
              <span><i18n path="Common.PaymentDetails" /></span>
            </v-tooltip>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <v-flex my-3>
            <i18n path="Common.CardType" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  regData._CustomerPayment && regData._CustomerPayment.brand
                )
              }}
            </div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.NameOnCard" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  regData._CustomerPayment &&
                    regData._CustomerPayment.card_holder_name
                )
              }}
            </div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.CardNumber" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  regData._CustomerPayment && regData._CustomerPayment.last4
                )
              }}
            </div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.TransactionId" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  regData._CustomerPayment &&
                    regData._CustomerPayment.processorAuthorizationCode
                )
              }}
            </div>
          </v-flex>
        </div>

        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 pr-2 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                  <i18n path="Common.SurveyQuestions" />
                </h2>
              </template>
              <span><i18n path="Common.SurveyQuestions" /></span>
            </v-tooltip>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <div v-for="item in resArray" :key="item" class="pt-2">
            <span class="pl-2">Q: {{ item.Question }}</span>
            <div
              v-if="
                item.ControlType !== 'date' &&
                item.ControlType !== 'checkbox' &&
                item.ControlType !== 'radio' &&
                item.ControlType !== 'dropdown'
              "
            >
              <v-chip class="ma-2" small label color="blue" text-color="white">
                {{ 'Answer' }}
              </v-chip>
              <span v-for="ele in item.Answer" :key="ele">{{ ele }}</span>
            </div>
            <div v-else-if="item.ControlType === 'date'">
              <v-chip class="ma-2" small label color="blue" text-color="white">
                {{ 'Answer' }}
              </v-chip>
              <span v-for="ele in item.Answer" :key="ele">{{
                formatDate(ele)
              }}</span>
            </div>
            <div v-else>
              <v-chip class="ma-2" small label color="blue" text-color="white">
                {{ 'Answer' }}
              </v-chip>
              <span v-for="(ele, index) in item.Answer" :key="index"
                >{{ ele
                }}{{ index !== item.Answer.length - 1 ? ',' : '' }}</span
              >
            </div>
          </div>
        </div>
      </v-flex>
      <editRegistration
        :is-edit-reg.sync="isEditReg"
        :update-form="updateForm"
        @updateData="updateData"
      />
      <cancelRegistration
        :is-cancel-reg.sync="isCancelReg"
        @registrationCancelled="registrationCancelled"
      />
      <refundRegistration :is-refund.sync="isRefund" @updateData="updateData" />
    </v-flex>
  </div>
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
      updateForm: false,
      isEditReg: false,
      isCancelReg: false,
      isRefund: false,
      data: {
        registration: {},
        event: {},
      },
      StartDate: '-',
      EndDate: '-',
      AddressLine: '',
      VenueName: '',
      attendeeData: {},
      regData: {},
      resArray: [],
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
  async mounted() {
    const url = this.$bitpod.getApiUrl()
    const filter = { where: { RegistrationId: this.$route.params.id } }
    try {
      const res = await this.$axios.get(
        `${url}Attes?filter=${JSON.stringify(filter)}`
      )
      if (res) {
        res.data.map((i) => {
          if (!this.attendeeData[i.TicketId]) {
            this.attendeeData[i.TicketId] = {
              count: 1,
              ticketName: i.TicketName,
              price: i.TicketAmount,
              total: i.TicketAmount,
            }
          } else {
            this.attendeeData[i.TicketId].count++
            this.attendeeData[i.TicketId].total += i.TicketAmount
          }
        })
        this.attendeeData = [...Object.values(this.attendeeData)]
      }
    } catch (e) {
      console.error(
        `Error while fetching data using GET call in registration/_id/index.vue in async mounted context:-url:${url}\n registrationId:${this.$route.params.id}`,
        e
      )
    }
  },
  methods: {
    updateData(newData) {
      this.data.registration = newData
    },
    registrationCancelled() {
      this.data.registration.Status = 'Cancelled'
      this.updateForm = !this.updateForm
    },
    formatDate(date) {
      return date ? format(new Date(date), 'PP') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    formatAddressField(fieldValue) {
      return fieldValue || ' '
    },
    goBack() {
      this.$router.back()
    },
    async getEventInfo() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.get(
          `${url}Registrations/${this.$route.params.id}/EventList`
        )
        if (res && res.data) {
          debugger
          this.data.event = res.data
          this.StartDate = this.formatDate(this.data.event.StartDate)
          this.EndDate = this.formatDate(this.data.event.EndDate)
          this.resArray = []
          this.resArray = this.regData._QuestionResponse.map((i) => {
            const questData = this.data.event._Survey.find(
              (j) => j.id === i.QuestionId
            )
            return {
              Question: questData ? questData.Question : '-',
              Answer: i.Answer,
              ControlType: questData ? questData.ControlType : '-',
            }
          })
          if (this.data.event.VenueName !== '') {
            this.VenueName = this.formatAddressField(this.data.event.VenueName)
          }
          if (
            this.data.event._VenueAddress.AddressLine !== null &&
            Object.keys(this.data.event._VenueAddress).length > 0
          ) {
            if (this.data.event._VenueAddress.AddressLine !== '') {
              this.AddressLine = this.formatAddressField(
                this.data.event._VenueAddress.AddressLine
              )
            }
            if (this.data.event._VenueAddress.City !== '') {
              this.AddressLine =
                this.AddressLine + ',' + this.data.event._VenueAddress.City
            }
            if (this.data.event._VenueAddress.Country !== '') {
              this.AddressLine =
                this.AddressLine + ',' + this.data.event._VenueAddress.Country
            }
            if (this.data.event._VenueAddress.PostalCode !== '') {
              this.AddressLine =
                this.AddressLine +
                ',' +
                this.data.event._VenueAddress.PostalCode
            }
          }
        }
      } catch (e) {
        console.error(
          `Error while fetching data using GET call in registration/_id/index.vue in method getEventInfo context:-url:${url}\n registrationId:${this.$route.params.id}`,
          e
        )
      }
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
        this.regData = registration.length > 0 ? registration[0] : {}
        this.getEventInfo()
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
<style scoped>
@media (max-width: 500px) {
  .pad-card {
    padding: 0 12px 0 12px;
  }
}
@media (min-width: 600px) {
  .pad-card {
    padding: 12px 12px 0 12px;
  }
}
</style>
