<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="selectExistingSeatMap"
        persistent
        scrollable
        content-class="slide-form"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-3 text-h5">
              Select Existing Seatmap Layout
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click.native="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-card flat class="pl-2">
              <v-row>
                <v-col cols="12" class="mb-2">
                  Select an existing seat map.
                </v-col>
                <v-spacer></v-spacer>
                <v-flex
                  class="d-flex flex-wrap pa-0 ml-3 justify-center justify-md-start"
                >
                  <v-hover
                    v-for="item in seatMaps"
                    :key="item.id"
                    v-slot:default="{ hover }"
                  >
                    <div class="card-content mr-4">
                      <v-card
                        :elevation="hover ? 2 : 1"
                        class="ma-3 ml-0 mt-0 seatMaptile"
                        height="125"
                        max-width="155"
                        width="155"
                      >
                        <div class="pa-9 ml-5">
                          <v-icon size="36" color="warning">fa-grid</v-icon>
                        </div>
                        <v-flex
                          v-if="hover"
                          class="d-flex justify-center text-center"
                        >
                          <div
                            class="d-flex justify-center text-center templateButtons"
                          >
                            <v-btn
                              class="mt-8"
                              outlined
                              dense
                              small
                              color="primary"
                              @click="updateLayoutId(item.id)"
                              >Select</v-btn
                            >
                          </div>
                        </v-flex>
                      </v-card>
                      <div
                        class="text-truncate text-capitalize text-center pb-5"
                      >
                        {{ item.Name }}
                      </div>
                    </div>
                  </v-hover>
                </v-flex>
              </v-row>
            </v-card>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
    </v-form>
    <v-snackbar v-model="snackbar" timeout="500" :top="true">
      <div class="text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
  </v-layout>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
export default {
  props: {
    selectExistingSeatMap: {
      type: Boolean,
      default: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      seatMaps: [],
      selectedItem: '',
      snackbar: false,
      snackbarText: '',
    }
  },
  mounted() {
    this.getSeatMaps()
  },
  methods: {
    close() {
      this.$emit('update:selectExistingSeatMap', false)
    },
    async getSeatMaps() {
      const URL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}SeatMaps`
      try {
        const res = await this.$axios.$get(URL)
        if (res) {
          console.log('res', res)
          this.seatMaps = res
          console.log('seatMaps', this.seatMaps)
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a Get call to SeatMap model in method getSeatMaps context: \n URL:- ${URL} `,
          e
        )
      }
    },
    async updateLayoutId(itemId) {
      const obj = {
        LayoutId: itemId,
      }
      const URL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}`
      try {
        const res = await this.$axios.$patch(URL, obj)
        if (res) {
          this.$refs.form.$parent.$parent.refresh()
          this.close()
          this.snackbar = true
          this.snackbarText = 'Seat Layout added successfully'
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateLayoutId context: \n URL:- ${URL} \n Object:- ${obj} `,
          e
        )
      }
    },
  },
}
</script>

<style scoped>
.card-content {
  position: relative;
}
.templateButtons {
  position: absolute;
  bottom: 5px;
  width: 100%;
}
.selectBtn:hover {
  background: #1a73e8;
  text-align: center;
  color: blue;
}
.on-hover {
  /* opacity: 0.3; */
  border: 2px solid #1a73e8;
}
.seatMaptile:hover {
  background: #f2f2f2;
}
</style>
