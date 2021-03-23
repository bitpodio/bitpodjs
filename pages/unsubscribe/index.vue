<template>
  <v-layout>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pt-4 pb-4 d-flex align-start"
          >
            <h2>
              Unsubscribe
            </h2>
          </v-card-title>
          <v-divider class="ml-10 mr-11"></v-divider>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-4">
            <h2>
              Please select a reason to unsubscribe from newsletter. This will
              help us to improve our services.
            </h2>
            <v-row class="unsubscribeBox pt-4 mt-3 ml-2">
              <v-col cols="12" class="py-0">
                <v-radio-group v-model="reason">
                  <v-radio
                    v-for="(day, k) in selectedDays"
                    :key="k"
                    :label="day.dayNameLang"
                    :value="day.dayNameLang"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              color="primary"
              depressed
              :has-submit-action="true"
              form-name="unsubscribe-form"
              :action="onUnSubscribe"
              class="ml-2"
              ><i18n path="Drawer.Save"
            /></SaveButton>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog
      v-model="successUnsubscribe"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pt-4 pb-4 d-flex align-start"
          >
            <h2>
              You have unsubscribed successfully
            </h2>
          </v-card-title>
          <!-- <v-divider class="ml-10 mr-11"></v-divider>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-4">
            <v-row class="unsubscribeBox pt-4 mt-3 ml-2">
              <v-col cols="12" class="py-0">
                <h3>You have unsubscribed successfully</h3>
              </v-col>
            </v-row>
          </v-card-text> -->
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
import SaveButton from '~/components/common/saveButton'
export default {
  layout: 'public',
  components: {
    SaveButton,
  },
  data() {
    return {
      dialog: true,
      email: '',
      reason: '',
      campaignId: '',
      selectedDays: [
        {
          dayNameLang: this.$t('Common.SendManyMails'),
          dayName: 'You have send me too many mails',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.StopReceiveMails'),
          dayName: 'I no longer wanted to receive these mails',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.NeverSignedForMails'),
          dayName: 'I never signed up for this mailing list',
          selected: false,
        },
        {
          dayNameLang: this.$t('Common.Other'),
          dayName: 'Other',
          selected: false,
        },
      ],
    }
  },
  created() {
    this.email = this.$route.query.emailid
    this.campaignId = this.$route.query.cid
  },
  methods: {
    async onUnSubscribe() {
      const url = this.$bitpod.getApiUrl()
      const object = {
        Email: this.email,
        Reason: this.reason,
        CampaignId: this.campaignId,
      }
      try {
        const res = await this.$axios.post(`${url}Unsubscribes`, {
          ...object,
        })
        if (res) {
          console.log(res)
          this.dialog = false
          this.successUnsubscribe = true
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'unsubscribe-form')
    },
  },
}
</script>
<style scoped>
.unsubscribeBox {
  border: 2px solid grey;
}
</style>
