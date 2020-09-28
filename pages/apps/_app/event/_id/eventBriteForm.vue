<template>
  <v-layout>
    <v-form ref="form">
      <v-dialog
        v-model="eventBriteDialog"
        persistent
        scrollable
        max-width="900"
        max-height="900"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">Publish Event</h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click.native="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 pb-3 text--primary"
          >
            <v-row>
              <v-col v-if="!allowPublicSearchable" cols="12">
                <div
                  v-for="(error, key) in errors"
                  :key="key"
                  class="pa-1 text-h5"
                >
                  <span class="text-h6">{{ error && error.error }}</span
                  ><br />
                  <span class="text--secondary">{{
                    error && error.error_description
                  }}</span>
                </div>
              </v-col>
              <v-col cols="12">
                <span v-if="errorMsg" class="pa-1 text-h6 caption red--text"
                  >Eventbrite connection is not setup, to use this feature you
                  must setup connection.
                  <v-icon @click="errorMsg = false">mdi-close</v-icon>
                </span>
              </v-col>
              <v-col class="pt-2">
                <v-checkbox
                  v-model="formData.listed"
                  v-if="allowPublicSearchable"
                  label="Allow the event to be publicly searchable on the Eventbrite website"
                ></v-checkbox>
              </v-col>
              <v-col class="text-center" cols="12">
                <v-btn
                  color="primary"
                  depressed
                  class="ma-1 ma-2"
                  @click="publishEventBrite"
                >
                  <v-icon left>mdi-rotate-315 mdi-send</v-icon>
                  Publish</v-btn
                >
              </v-col>
              <div class="orange lighten-5">
                <v-col cols="12" class="pb-0">
                  <v-icon class="amber--text">fa-bulb</v-icon>
                  <v-card-text class="d-inline pa-0">
                    Publish to eventbrite only create and updates event in
                    eventbrite and does not create bidirectional integration, If
                    you would like to receive registration orders submitted
                    through eventbrite into bitpod you must register below
                    webhook url for order.placed action into eventbrite.<a
                      class="link text-decoration-none"
                      @click="webhookEventbrite"
                      >Click here</a
                    >to know more</v-card-text
                  >
                </v-col>
                <v-col cols="12" class="eventUrl">
                  <span class="blue--text"
                    >{{ eventUrl
                    }}<copy :text-to-copy="getEventBriteWebhookUrl()" />
                  </span>
                </v-col>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
import copy from '~/components/common/copy'
export default {
  components: {
    copy,
  },
  props: {
    eventBriteDialog: {
      default: false,
    },
  },
  data() {
    return {
      eventUrl: `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Webhooks`,
      formData: {
        eventId: '',
        listed: '',
      },
      errorMsg: false,
      errors: [],
      allowPublicSearchable: true,
    }
  },
  methods: {
    reset() {
      this.allowPublicSearchable = true
      this.errorMsg = false
    },
    getEventBriteWebhookUrl() {
      const url = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Webhooks`
      return url
    },
    close() {
      this.reset()
      this.$emit('update:eventBriteDialog', false)
    },
    async publishEventBrite() {
      debugger
      this.formData.eventId = this.$route.params.id
      try {
        const res = await this.$axios.$post(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/eventbrite`,
          this.formData
        )
        if (res) {
          debugger
          if (res.error) {
            this.allowPublicSearchable = false
            this.errors = [...res.error]
          } else {
            this.this.eventBriteDialog = false
          }
        }
      } catch (e) {
        this.errorMsg = true
        console.log('Error', e)
      }
    },
    webhookEventbrite() {
      alert('clicked')
    },
  },
}
</script>
<style scoped>
.link {
  cursor: pointer;
}
</style>
