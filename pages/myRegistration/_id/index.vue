<template>
  <div class="search-section mt-6">
    <v-card
      v-if="formData && formData.status === 'Not Found'"
      class="not-found"
    >
      <div class="text-lg-center pt-16 fs-22 red--text">
        {{ $t('Common.RegistrationNotFound') }}
      </div>
    </v-card>
    <v-card v-else>
      <v-card-title>
        <v-skeleton-loader
          :loading="!loading"
          class="rounded-lg"
          type="heading"
          height="30"
          width="600"
        >
          <h2>
            {{ $t('Common.OrderFor') }} {{ formData && formData.EventName }}
          </h2>
        </v-skeleton-loader></v-card-title
      >
      <v-card-text>
        <div class="black--text fs-15">
          <div
            v-if="
              formData && formData.EventList && formData.EventList.StartDate
            "
          >
            {{ getEventStartDate() }} - {{ getEventEndDate() }} -
            {{
              formatField(
                formData && formData.EventList && formData.EventList.Timezone
              )
            }}
          </div>

          <div v-if="formData && formData.RegistrationId">
            #{{ formData && formData.RegistrationId }}
            {{ $t('Common.RegisteredOnSerach') }}

            {{
              $d(
                new Date(formData && formData.createdDate),
                'short',
                $i18n.locale
              )
            }}
          </div>
        </div>
        <div v-if="Object.keys(formData).length">
          <div v-if="formData && formData.Status !== 'Cancelled'">
            <div
              v-if="
                formData &&
                formData.Status !== 'Cancelled' &&
                cancelledNow === false
              "
            >
              <v-btn
                v-if="formData && formData.Status !== 'Cancelled'"
                depressed
                :disabled="
                  formData &&
                  formData.EventList &&
                  !formData.EventList.isRefundable
                "
                color="primary"
                class="mr-1 mt-2"
                @click="cancelRegistration()"
              >
                {{
                  formData &&
                  formData.EventList &&
                  formData.EventList.isRefundable
                    ? $t('Common.CancelRegistration')
                    : $t('Common.CancelationNotAllowed')
                }}
              </v-btn>

              <div>
                <v-btn
                  v-if="
                    formData &&
                    formData.EventList &&
                    formData.EventList.isRefundable &&
                    formData &&
                    formData.EventList &&
                    formData.EventList.CancellationPolicy !== ''
                  "
                  plain
                  text
                  color="primary"
                  class="mt-2 pl-0"
                  @click="show = !show"
                >
                  <v-icon>{{
                    show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                  <span class="fs-14">{{
                    $t('Common.CancellationPolicy')
                  }}</span>
                </v-btn>
              </div>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div
              v-show="show"
              class="px-4 fs-14"
              v-html="
                formData &&
                formData.EventList &&
                formData.EventList.CancellationPolicy
              "
            />
          </div>
          <div
            v-if="formData && formData.Status !== 'Cancelled' && cancelledNow"
            class="red--text fs-20 d-flex align-center mt-4"
          >
            <v-icon color="error" class="mr-2">fa fa-info-circle</v-icon
            ><i18n path="Common.CancelledSuccessfully" />
          </div>
          <div
            v-if="
              formData &&
              formData.Status === 'Cancelled' &&
              cancelledNow === false
            "
            class="red--text fs-20 d-flex align-center mt-4"
          >
            <v-icon color="error" class="mr-2">fa fa-info-circle</v-icon
            ><i18n path="Common.AlreadyCancelled" />
          </div>
        </div>
        <div class="mt-4">{{ $t('Common.ContactInformation') }}</div>
        <v-divider></v-divider>
        <div class="black--text">
          <div class="mt-2">{{ $t('Common.FullName') }}</div>
          <div class="mt-1">
            {{ formatField(formData && formData.FullName) }}
          </div>
          <div class="mt-2">
            <i18n path="Common.EmailCaption" />
          </div>
          <div class="mt-1">
            {{ formatField(formData && formData.Email) }}
          </div>
          <div class="mt-2">
            <i18n path="Common.Phone" />
          </div>
          <div class="mt-1">
            {{ formatField(formData && formData.Phone) }}
          </div>
          <div class="mt-2">
            <i18n path="Common.Address" />
          </div>
          <div class="mt-1">
            {{ formatField(getAddress()) }}
          </div>
        </div>
        <div class="mt-8">
          <i class="fa fa-ticket" aria-hidden="true"></i>
          {{ $t('Common.TicketsAttendee') }}
        </div>
        <v-divider></v-divider>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  <i18n path="Common.Name" />
                </th>
                <th class="text-left">
                  <i18n path="Common.EmailCaption" />
                </th>
                <th class="text-left">
                  <i18n path="Common.Ticket" />
                </th>
                <th class="text-left">
                  <i18n path="Common.Amount" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in formData && formData.attendee" :key="item">
                <td>{{ item.FullName }}</td>
                <td>{{ item.Email }}</td>
                <td>{{ item.TicketName }}</td>
                <td>{{ item.TicketAmount }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td><i18n path="Common.Total" /></td>
                <td>
                  <i18n-n
                    v-if="formData && formData.Currency"
                    :value="formData && formData.TotalAmount"
                    :format="{
                      key: 'currency',
                      currency: formData && formData.Currency,
                    }"
                    :locale="$i18n.locale"
                  >
                  </i18n-n>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'
export default {
  layout: 'public',
  data() {
    return {
      formData: {},
      show: false,
      cancelledNow: false,
      loading: false,
    }
  },
  mounted() {
    this.getRegistrationData()
  },
  methods: {
    async getRegistrationData() {
      const url = `${this.$bitpod.getApiUrl()}Registrations/findRegistration?registrationId=${
        this.$route.params.id
      }&email=${this.$route.query.email}`

      try {
        const res = await this.$axios.$get(url)
        if (res) {
          this.formData = res.result

          this.loading = true
        }
      } catch (err) {
        console.error(
          `Error in pages/myRegistration while fetching the registration context: Url: ${url} Id:${this.$route.params.id}`,
          err
        )
      }
    },
    getEventStartDate() {
      return this.$d(
        new Date(
          this.formatedDate(
            this.formData &&
              this.formData.EventList &&
              this.formData.EventList.StartDate,
            this.formData &&
              this.formData.EventList &&
              this.formData.EventList.Timezone
          )
        ),
        'long',
        this.$i18n.locale
      )
    },
    getEventEndDate() {
      return this.$d(
        new Date(
          this.formatedDate(
            this.formData &&
              this.formData.EventList &&
              this.formData.EventList.EndDate,
            this.formData &&
              this.formData.EventList &&
              this.formData.EventList.Timezone
          )
        ),
        'long',
        this.$i18n.locale
      )
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    formatedDate(date, timezone) {
      if (date) {
        const formattedDate = new Date(date)
        const zonedDate = utcToZonedTime(formattedDate, timezone)
        const pattern = 'PPp' // 'd.M.YYYY HH:mm:ss.SSS [GMT]Z (z)'
        const output = format(zonedDate, pattern, { timezone })
        return output
      }
    },
    async cancelRegistration() {
      const url = `${this.$bitpod.getApiUrl()}Registrations/updateRegistration`
      const Obj = { registrationId: this.formData.id }
      try {
        const res = await this.$axios.$patch(url, Obj)
        if (res) {
          this.cancelledNow = true
        }
      } catch (error) {
        console.error(
          `Error in pages/myRegistration while cancelling the registration context: Url: ${url} Id:${this.formData.id}`,
          error
        )
      }
    },
    formatAddressField(fieldValue) {
      return fieldValue || ' '
    },
    getAddress() {
      const fullAddress =
        this.formatAddressField(
          this.formData &&
            this.formData._CurrentAddress &&
            this.formData._CurrentAddress.AddressLine
        ) +
        this.formatAddressField(
          this.formData &&
            this.formData._CurrentAddress &&
            this.formData._CurrentAddress.City !== ''
            ? ',' + this.formData._CurrentAddress.City
            : ''
        ) +
        this.formatAddressField(
          this.formData &&
            this.formData._CurrentAddress &&
            this.formData._CurrentAddress.State !== ''
            ? ',' + this.formData._CurrentAddress.State
            : ''
        ) +
        this.formatAddressField(
          this.formData &&
            this.formData._CurrentAddress &&
            this.formData._CurrentAddress.Country !== ''
            ? ',' + this.formData._CurrentAddress.Country
            : ''
        ) +
        this.formatAddressField(
          this.formData &&
            this.formData._CurrentAddress &&
            this.formData._CurrentAddress.PostalCode !== ''
            ? ',' + this.formData._CurrentAddress.PostalCode
            : ''
        )
      return fullAddress
    },
  },
}
</script>
<style scoped>
.search-section {
  max-width: 650px;
  margin: 0 auto;
}
.not-found {
  height: 200px;
}
</style>
