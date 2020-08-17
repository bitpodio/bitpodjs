<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8>
      <div class="xs12 sm8 md8 lg8 boxview pa-4 mr-2 mb-2">
        <h1>Event Name Here</h1>
        <v-chip class="my-2" label>
          Aug 20, 2020 5:36 PM - Aug 24, 2020 5:36 PM
        </v-chip>
        <Cardtiles />
        <v-flex>
          <p class="blue--text">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <a class="blue--text"
              >gf, Indira Gandhi International Airport New Delhi Delhi India
              110037</a
            >
          </p>
        </v-flex>
        <v-stepper
          alt-labels
          class="elevation-0 boxview"
          style="max-width: 800px;"
        >
          <v-stepper-header>
            <v-stepper-step step="3" complete>Not Ready</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4" complete class="text-center align-center"
              >Open for regsitarion</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="4" complete>Sold out</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="" class="text-center align-center"
              >Registarion Closed</v-stepper-step
            >
          </v-stepper-header>
        </v-stepper>

        <v-divider></v-divider>
        <v-flex class="d-flex flex-row align-center">
          <v-avatar color="warning" size="24" class="d-inline-flex">
            <span class="white--text body-2">M</span>
          </v-avatar>
          <v-subheader class="d-inline-flex pl-1"
            ><span class="pl-1"
              >Created this event 1 day ago.</span
            ></v-subheader
          >
        </v-flex>
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1">Attendees</h2>
        <v-divider></v-divider>
        <!-- <Grid :content="content.EventsManagement" view-name="All Events" /> -->
      </div>
      <div class="xs12 sm12 md12 boxview pa-4 mr-2 mb-2">
        <!-- <Grid :content="content.EventsManagement" view-name="All Events" /> -->
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1">Event Information</h2>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Organizer</div>
          <div class="body-1">Rishikesh Belhekar</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Event Manager</div>
          <div class="body-1 text--primary">Rishikesh Belhekar</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Tags</div>
          <div class="body-1">-</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Description</div>
          <div class="body-1">
            Event information may be out of date due to the coronavirus
            (COVID-19). Confirm details with event organisers.
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1">SEO Details</h2>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">SEO Title</div>
          <div class="body-1">gf-tickets</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">SEO Description</div>
          <div class="body-1">Confirm details with event organisers</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">SEO Keywords</div>
          <div class="body-1">Event, OnlineEvenet</div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1">Event Settings</h2>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Privacy</div>
          <div class="body-1">Public</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Currency</div>
          <div class="body-1">-</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">GL Account Code</div>
          <div class="body-1">asddeee</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Cost Center</div>
          <div class="body-1">-</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Business Type</div>
          <div class="body-1">Single</div>
        </v-flex>
      </div>
    </v-flex>
  </v-flex>
</template>

<script>
// import Grid from '~/components/common/grid'
// import content from '~/config/apps/event/content'
import Cardtiles from '~/components/Cardtiles.vue'
export default {
  layout: 'flatlayout',
  components: {
    // Grid,
    Cardtiles,
  },
  data() {
    return {
      // content,
    }
  },
  created() {},
}
</script>
