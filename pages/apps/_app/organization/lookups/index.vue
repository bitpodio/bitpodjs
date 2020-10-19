<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8 class="lookup-tabs">
      <v-toolbar-title class="pl-4 ml-n4 mb-6 font-weight-regular"
        >Lookups</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-tabs
        v-model="tabs"
        center-active
        height="36"
        class="mb-4"
        background-color="gerybg"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1" class="px-0 mr-4">
          <span>General</span>
        </v-tab>
        <v-tab href="#tab-2" class="px-0 mr-4">
          <span>Events</span>
        </v-tab>
        <v-tab href="#tab-3" class="px-0 mr-4">
          <span>Refund</span>
        </v-tab>
        <v-tab href="#tab-4" class="px-0 mr-4">
          <span>Badge</span>
        </v-tab>
        <v-tab href="#tab-5" class="px-0 mr-4">
          <span>Contact</span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs" class="gerybg">
        <v-tab-item :value="'tab-1'">
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Currency
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="lookups" :content="content" class="mt-n12" />
          </div>
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                TimeZone
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="timezone" :content="content" class="mt-n12" />
          </div>
        </v-tab-item>
        <v-tab-item :value="'tab-2'">
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Event Privacy
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="eventprivacy" :content="content" class="mt-n12" />
          </div>
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Event Tag
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="eventtag" :content="content" class="mt-n12" />
          </div>
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Ticket Type
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="tickettype" :content="content" class="mt-n12" />
          </div>
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Session Type
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="sessiontype" :content="content" class="mt-n12" />
          </div>
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Question Control
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid
              view-name="questioncontrol"
              :content="content"
              class="mt-n12"
            />
          </div>
        </v-tab-item>
        <v-tab-item :value="'tab-3'">
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Refund Method
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="refundmethod" :content="content" class="mt-n12" />
          </div>
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Reason
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="reason" :content="content" class="mt-n12" />
          </div>
        </v-tab-item>
        <v-tab-item :value="'tab-4'">
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Badge Category
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="badgecategory" :content="content" class="mt-n12" />
          </div>
        </v-tab-item>
        <v-tab-item :value="'tab-5'">
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Contact Types
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="contacttypes" :content="content" class="mt-n12" />
          </div>
          <div
            v-if="content"
            class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                Departments
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid view-name="departments" :content="content" class="mt-n12" />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
  </v-flex>
</template>

<script>
import Grid from '~/components/common/grid'
import { configLoaderMixin } from '~/utility'
export default {
  layout: 'admin',
  components: {
    Grid,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      tabs: 'tab-1',
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.lookup : null
    },
  },
}
</script>
