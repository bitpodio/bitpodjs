<template>
  <v-layout>
    <v-form ref="form">
      <v-dialog
        v-model="siteSetting"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-3 text-h5">
              <i18n path="Common.EditRegistrationPageSettings" />
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
                <span><i18n path="Common.Templates" /></span>
              </v-tab>

              <v-tab href="#tab-2" class="px-0 mr-4">
                <span><i18n path="Common.SectionSettings" /></span>
              </v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-card flat>
              <v-tabs-items v-model="tabs">
                <v-tab-item :value="'tab-1'">
                  <v-row>
                    <v-col cols="12" class="mb-2">
                      <i18n path="Common.SelectTemplate" />
                    </v-col>
                    <v-flex
                      class="d-flex flex-wrap pa-0 ml-3 justify-center justify-md-start"
                    >
                      <v-hover
                        v-for="(item, index) in formData"
                        :key="item.id"
                        v-slot:default="{ hover }"
                      >
                        <div class="card-content mr-4">
                          <v-card
                            :elevation="hover ? 4 : 2"
                            class="ma-3 ml-0 mt-0"
                            :class="{
                              'on-hover': selectedItem === index,
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
                                    :src="
                                      $config.cdnUri + 'new-invitee-image.png'
                                    "
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
                                :src="$config.cdnUri + 'new-invitee-image.png'"
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
                                    selectedItem = index
                                  "
                                  ><i18n path="Common.Select"
                                /></v-btn>
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
                      <i18n path="Common.ChangeSectionTitle" />
                    </v-col>
                    <v-col cols="12" class="mt-3">
                      <v-text-field
                        v-model="sectionHeading.speakers"
                        :label="$t('Common.LabelForSpeakers')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.registrationTypes"
                        :label="$t('Common.LabelForRegistration')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.session"
                        :label="$t('Common.LabelForSessions')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.registrationbtn"
                        :label="$t('Common.LabelForRegister')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.ticketsectionlabel"
                        :label="$t('Common.LabelForTickets')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.ticketlabel"
                        :label="$t('Common.LabelTickets')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.datetimelabel"
                        :label="$t('Common.LabelForDateTime')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.venuelabel"
                        :label="$t('Common.LabelForVenue')"
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
                        :label="$t('Common.LabelForRecurringSessions')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="
                          sectionHeading.registrationquestionsectionlabel
                        "
                        :label="$t('Common.LabelForRegistrationQuestions')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.gallery"
                        :label="$t('Common.LabelForImageGallery')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sectionHeading.review"
                        :label="$t('Common.LabelForReviews')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="animation"
                        :items="animationDropDown"
                        :label="$t('Common.Animation')"
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
              ><i18n path="Drawer.Prev"
            /></v-btn>
            <v-btn
              v-if="tabs === 'tab-1'"
              color="primary"
              depressed
              @click="tabs = 'tab-2'"
              ><i18n path="Drawer.Next"
            /></v-btn>
            <SaveButton
              v-if="siteSetting && tabs === 'tab-2'"
              color="primary"
              depressed
              :action="onSave"
              class="ml-2"
              ><i18n path="Drawer.Save"
            /></SaveButton>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
// import templateList from '~/config/apps/event/gql/templateList.gql'
import SaveButton from '~/components/common/saveButton'

export default {
  components: {
    SaveButton,
  },
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
      selectedItem: 0,
      newData: {},
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
    async getRegistrationSiteTemplates() {
      const primeOrgId = this.$config.axios.primeOrgId
      const customAxiosInstance = this.$axios.create({
        headers: {
          'x-org-id': primeOrgId,
        },
      })
      const url = this.$bitpod.getApiUrl()
      try {
        const template = await customAxiosInstance.get(
          `${url}/Templates?filter={"where":{"Name": {"inq": ["event", "Rhine", "Limmat", "Dark"]}}}`
        )
        this.formData = template.data
      } catch (e) {
        console.error(
          `Error while fetching templates from Templates model while making a GET request from getRegistrationSiteTemplates method context: \n url:${url} \n primeOrgId:${primeOrgId}`
        )
      }
    },
    setDefaultSelected() {
      if (this.eventData.BusinessType === 'Recurring') {
        this.selectedItem = 3
      } else {
        this.selectedItem = 0
      }
    },
    getDefaultTemplate() {
      if (this.eventData.BusinessType === 'Recurring') {
        this.selectTemplate('Dark')
      } else {
        this.selectTemplate('Event')
      }
    },
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
      this.tabs = '1'
    },
    setData() {
      const dataObj = {
        RegistrationSiteTemplate: this.eventData.RegistrationSiteTemplate,
        _sectionHeading: {
          showimagegallery: this.sectionHeading.showimagegallery,
          showeventreviews: this.sectionHeading.showeventreviews,
          animation: this.sectionHeading.animation || '',
          datetimelabel: this.sectionHeading.datetimelabel || '',
          gallery: this.sectionHeading.gallery || '',
          registrationTypes: this.sectionHeading.registrationTypes || '',
          registrationbtn: this.sectionHeading.registrationbtn || '',
          registrationquestionsectionlabel:
            this.sectionHeading.registrationquestionsectionlabel || '',
          review: this.sectionHeading.review || '',
          session: this.sectionHeading.session || '',
          sessionsectionlabel: this.sectionHeading.sessionsectionlabel || '',
          speakers: this.sectionHeading.speakers || '',
          ticketlabel: this.sectionHeading.ticketlabel || '',
          ticketsectionlabel: this.sectionHeading.ticketsectionlabel || '',
        },
      }
      return dataObj
    },
    async onSave() {
      if (this.eventData.RegistrationSiteTemplate === null) {
        this.getDefaultTemplate()
      }
      this.sectionHeading.animation =
        this.animation !== 'Select' ? this.animation : ''
      const obj = this.setData()
      delete this.eventData._VenueAddress
      try {
        const url = this.$bitpod.getApiUrl()
        const res = await this.$axios.$patch(
          `${url}Events/${this.$route.params.id}`,
          obj
        )
        if (res) {
          this.close()
          this.$emit(
            'update:snackbarText',
            this.$t('Messages.Success.EventRegSiteDetailsUpdateSuccess')
          )
          this.$emit('update:snackbar', true)
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
        this.setDefaultSelected()
        this.getRegistrationSiteTemplates()
        this.formData.forEach((ele, index) => {
          if (ele.Name === this.eventData.RegistrationSiteTemplate) {
            this.selectedItem = index
          }
        })
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
