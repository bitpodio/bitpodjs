<template>
  <v-layout>
    <v-form ref="form">
      <v-dialog
        v-model="siteSetting"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-3 text-h5">
              Edit Registration Page Settings
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click.native="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-tabs v-model="tabs" center-active height="36">
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1" class="px-0 mr-4">
                <span>Templates</span>
              </v-tab>

              <v-tab href="#tab-2" class="px-0 mr-4">
                <span>Section Settings</span>
              </v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-card flat>
              <v-tabs-items v-model="tabs">
                <v-tab-item :value="'tab-1'">
                  <v-row>
                    <v-col cols="12" class="mb-2">
                      Select a template
                    </v-col>
                    <v-flex
                      class="d-flex flex-wrap pa-0 ml-3 justify-center justify-md-start"
                    >
                      <v-hover
                        v-for="item in formData"
                        :key="item.id"
                        v-slot:default="{ hover }"
                      >
                        <div class="card-content mr-4">
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
                                class="white"
                                min-height="230"
                                max-height="230"
                                contain
                              >
                                <template v-slot:placeholder>
                                  <v-img
                                    :src="$config.cdnUri + 'invitee-image.png'"
                                    class="grey lighten-2"
                                    min-height="230"
                                    max-height="230"
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
                                  dense
                                  color="primary"
                                  @click="
                                    selectTemplate(item.Name)
                                    selectedItem = item.id
                                  "
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
                </v-tab-item>
                <v-tab-item :value="'tab-2'">
                  <v-row>
                    <v-col cols="12" class="mt-3">
                      Here you can change section titles of registration site,
                      to best suit your event. For example, you may relabel
                      Speakers to Artists
                    </v-col>
                    <v-col cols="12" class="mt-3">
                      <v-text-field
                        v-model="sectionHeading.speakers"
                        label="Label for Speakers section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.registrationTypes"
                        label="Label for Registration Types section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.session"
                        label="Label for Sessions section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.registrationbtn"
                        label="Label for Register button"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.ticketsectionlabel"
                        label="Label for Tickets section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.ticketlabel"
                        label="Label for Tickets"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.datetimelabel"
                        label="Label for Date and Time section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.venuelabel"
                        label="Label for Venue section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      v-if="eventData.BusinessType === 'Recurring'"
                      cols="12"
                    >
                      <v-text-field
                        v-model="sectionHeading.sessionsectionlabel"
                        label="Label for Recurring Sessions section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="
                          sectionHeading.registrationquestionsectionlabel
                        "
                        label="Label for Registration Questions section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.gallery"
                        label="Label for Image Gallery section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.review"
                        label="Label for Reviews section"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="animation"
                        :items="animationDropDown"
                        label="Animation"
                        outlined
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12"></v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn
              v-if="tabs === 'tab-2'"
              color="grey lighten-2"
              depressed
              @click="tabs = 'tab-1'"
              >Prev</v-btn
            >
            <v-btn
              v-if="tabs === 'tab-1'"
              color="primary"
              depressed
              @click="tabs = 'tab-2'"
              >Next</v-btn
            >
            <v-btn
              v-if="tabs === 'tab-2'"
              color="primary"
              depressed
              @click.native="onSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import nuxtconfig from '~/nuxt.config'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
import templateList from '~/config/apps/event/gql/templateList.gql'
export default {
  props: {
    siteSetting: {
      type: Boolean,
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
    },
    close() {
      this.$emit('update:siteSetting', false)
      this.onReset()
    },
    refresh() {
      this.$refs.form.$parent.$parent.refresh()
    },
    onReset() {
      this.$refs.form.reset()
    },
    async onSave() {
      this.sectionHeading.animation =
        this.animation !== 'Select' ? this.animation : ''
      Object.assign(this.eventData, {
        _sectionHeading: this.sectionHeading,
      })
      delete this.eventData._VenueAddress
      try {
        const res = await this.$axios.$patch(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}`,
          {
            ...this.eventData,
          }
        )
        if (res) {
          this.close()
          this.refresh()
          this.sectionHeading = res._sectionHeading
        }
      } catch (e) {
        console.log('Error', e)
      }
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
        this.sectionHeading =
          event.length > 0 ? { ...event[0]._sectionHeading } : {}
        this.sectionHeading =
          this.sectionHeading != null ? this.sectionHeading : {}
        this.animation = this.sectionHeading.animation
        this.eventData = event.length > 0 ? { ...event[0] } : {}
        this.eventData.id = this.$route.params.id
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
