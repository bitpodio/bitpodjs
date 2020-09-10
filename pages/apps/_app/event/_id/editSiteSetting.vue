<template>
  <v-layout>
    <v-dialog
      v-model="siteSetting"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1"
            >Edit Registration Page Settings
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-card flat>
            <v-tabs v-model="tabs" center-active>
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1" class="px-0 mr-4 primary--text">
                <span>Templates</span>
              </v-tab>

              <v-tab href="#tab-2" class="px-0 mr-4 primary--text">
                <span>Section Settings</span>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tabs">
              <v-tab-item :value="'tab-1'">
                <v-row>
                  <v-col cols="12">
                    Select a template
                  </v-col>
                  <v-flex
                    class="d-flex flex-wrap pa-0 ml-6 justify-center justify-md-start"
                  >
                    <v-hover
                      v-for="item in formData"
                      :key="item.id"
                      v-slot:default="{ hover }"
                    >
                      <div class="card-content" @click="selectedItem = item.id">
                        <v-card
                          :elevation="hover ? 4 : 2"
                          class="ma-3 ml-0 mt-0"
                          :class="{
                            'on-hover': selectedItem === item.id,
                          }"
                          height="250"
                          width="250"
                        >
                          <div v-if="item.ImageUrl !== null" class="pa-1">
                            <v-img
                              :src="item.ImageUrl"
                              :lazy-src="item.ImageUrl"
                              aspect-ratio="1"
                              class="grey lighten-2"
                              min-height="200"
                              max-height="200"
                            >
                              <template v-slot:placeholder>
                                <v-img
                                  :src="$config.cdnUri + 'invitee-image.png'"
                                  class="grey lighten-2"
                                  min-height="200"
                                  max-height="200"
                                >
                                </v-img>
                              </template>
                            </v-img>
                          </div>
                          <div v-else class="pa-1">
                            <v-img
                              :src="$config.cdnUri + 'invitee-image.png'"
                              class="grey lighten-2"
                              min-height="200"
                              max-height="200"
                            >
                            </v-img>
                          </div>
                          <!-- <v-card-actions>
                            <div class="text-truncate text-capitalize">
                              {{ item.Name }}
                            </div>
                          </v-card-actions> -->
                          <v-flex
                            v-if="hover"
                            class="justify-center text-center"
                          >
                            <div
                              class="d-flex justify-center text-center templateButtons"
                            >
                              <v-btn
                                class="ma-2"
                                outlined
                                color="primary"
                                @click="selectTemplate(item.Name)"
                                >Select</v-btn
                              >
                            </div>
                          </v-flex>
                        </v-card>
                        <div
                          class="text-truncate text-capitalize text-center pb-10"
                        >
                          {{ item.Name }}
                        </div>
                      </div>
                    </v-hover>
                  </v-flex>
                </v-row>
                <v-card flat>
                  <v-btn color="primary" @click="tabs = 'tab-2'">Next</v-btn>
                </v-card>
              </v-tab-item>
              <v-tab-item :value="'tab-2'">
                <v-row>
                  <v-col cols="12">
                    Here you can change section titles of registration site, to
                    best suit your event. For example, you may relabel Speakers
                    to Artists
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.speakers"
                      label="Label for Speakers section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.registrationTypes"
                      label="Label for Registration Types section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.session"
                      label="Label for Sessions section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.registrationbtn"
                      label="Label for Register button"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.ticketsectionlabel"
                      label="Label for Tickets section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.ticketlabel"
                      label="Label for Tickets"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.datetimelabel"
                      label="Label for Date and Time section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.venuelabel"
                      label="Label for Venue section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.sessionsectionlabel"
                      label="Label for Recurring Sessions section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.registrationquestionsectionlabel"
                      label="Label for Registration Questions section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.gallery"
                      label="Label for Image Gallery section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sectionHeading.review"
                      label="Label for Reviews section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="animation"
                      :items="animationDropDown"
                      label="Animation"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12"></v-col>
                  <v-col cols="12" class="py-0">
                    <v-checkbox
                      v-model="sectionHeading.showimagegallery"
                      label=" Show Image Gallery"
                      class="ma-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox
                      v-model="sectionHeading.showeventreviews"
                      label=" Show Event Reviews"
                      class="ma-0"
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <v-btn color="primary" depressed @click="tabs = 'tab-1'"
                  >Prev</v-btn
                >
                <v-btn color="primary" depressed @click.native="onSave"
                  >Save</v-btn
                >
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <!-- <v-card-actions class="pl-4"> -->
        <!-- <v-btn color="primary" depressed @click.native="changeTab"
            >Next</v-btn
          > -->
        <!-- <v-btn color="primary" depressed @click="tab = 'tab-1'">Prev</v-btn>
          <v-btn color="primary" depressed @click.native="onSave">Save</v-btn> -->
        <!-- </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
import templateList from '~/config/apps/event/gql/templateList.gql'
export default {
  props: {
    siteSetting: {
      default: false,
    },
  },
  data() {
    return {
      tabs: '1',
      data: {
        template: {},
        event: {},
      },
      formData: {},
      eventData: {},
      sectionHeading: {},
      themeSelected: '',
      animation: [],
      animationDropDown: [],
      selectedItem: '',
    }
  },
  mounted() {
    this.getDropDownData('AnimationImage')
      .then((res) => {
        this.animationDropDown = res.map((i) => i.value)
        this.animationDropDown.unshift('Select')
        return res
      })
      .catch((e) => {
        console.log('Error', e)
      })
  },
  methods: {
    changeTab() {
      this.tabs = '2'
    },
    selectTemplate(value) {
      this.eventData.RegistrationSiteTemplate = value
      console.log('===ooutput', value)
    },
    close() {
      this.$emit('update:siteSetting', false)
    },
    refresh() {
      this.$apollo.queries.data1.refresh()
    },
    onSave() {
      this.sectionHeading.animation =
        this.animation !== 'Select' ? this.animation : ''
      Object.assign(this.eventData, {
        _sectionHeading: this.sectionHeading,
      })
      delete this.eventData._VenueAddress
      this.$axios
        .$patch(
          `https://event.test.bitpod.io/svc/api/Events/${this.$route.params.id}`,
          {
            ...this.eventData,
          }
        )
        .then((res) => {
          this.close()
          this.refresh()
          return (this.sectionHeading = res._sectionHeading)
        })
        .catch((e) => {
          console.log('Error', e)
        })
    },
    getDropDownData(filterType) {
      return this.$apollo
        .query({
          query: gql`
            ${generalconfiguration}
          `,
          variables: {
            filters: {
              where: {
                type: filterType,
              },
            },
          },
        })
        .then((result) => {
          const generalConfig = formatGQLResult(
            result.data,
            'GeneralConfiguration'
          )
          return generalConfig
        })
        .catch((e) => {
          console.log('Error', e)
        })
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${templateList}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              Name: {
                inq: ['event', 'Rhine', 'Limmat', 'Dark'],
              },
            },
          },
        }
      },
      update(data) {
        const template = formatGQLResult(data, 'Template')
        this.formData = template
        return {
          template: template.length > 0 ? template : {},
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
    data1: {
      query() {
        return gql`
          ${event}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
          badgeFilter: {
            where: {
              EventId: this.$route.params.id,
            },
          },
          eventId: this.$route.params.id,
        }
      },
      update(data) {
        const event = formatGQLResult(data, 'Event')
        // this.eventData = event.length > 0 ? { ...event[0]._sectionHeading } : {}
        this.sectionHeading = event.length > 0 ? event[0]._sectionHeading : {}
        this.sectionHeading =
          this.sectionHeading != null ? this.sectionHeading : {}
        this.animation = this.sectionHeading.animation
        this.eventData = event.length > 0 ? { ...event[0] } : {}
        this.eventData.id = this.$route.params.id
        console.log('result===', this.eventData)
        return {
          event: event.length > 0 ? event : {},
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
.card-content {
  position: relative;
}
.templateButtons {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.selectBtn:hover {
  background: #1a73e8;
  text-align: center;
  color: grey;
}
.on-hover {
  /* opacity: 0.3; */
  border: 2px solid #1a73e8;
}
</style>
