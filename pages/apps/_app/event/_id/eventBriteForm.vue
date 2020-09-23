<template>
  <v-layout>
    <v-form ref="form">
      <v-dialog
        v-model="eventBriteDialog"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
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
              <v-col class="pt-2">
                <v-checkbox
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
                  <span>{{ eventUrl }}</span
                  ><v-icon>mdi-content-copy</v-icon>
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
export default {
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
      },
    }
  },
  methods: {
    close() {
      this.$emit('update:eventBriteDialog', false)
    },
    async publishEventBrite() {
      debugger
      this.formData.eventId = this.$route.params.id
      const res = await this.$axios.$post(
        `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/eventBrite`,
        formData
      )
      if (res) {
        this.eventBriteDialog = false
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
