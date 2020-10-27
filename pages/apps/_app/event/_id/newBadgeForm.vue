<template>
  <v-layout>
    <v-dialog
      ref="badgeDialog"
      v-model="newBadge"
      persistent
      scrollable
      content-class="slide-form-default"
      max-width="900px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">
            New Badge
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click.native="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-card flat>
            <v-tabs v-model="tabs" center-active height="36">
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1" class="px-0 mr-4">
                <span>Templates</span>
              </v-tab>

              <v-tab href="#tab-2" class="px-0 mr-4">
                <span>Designer</span>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tabs">
              <v-tab-item :value="'tab-1'">
                <v-row>
                  <v-col cols="12" class="mb-2">
                    Select a template
                  </v-col>
                  <div id="template" class="pa-0">
                    <i class="fa fa-id-badge pl-1" aria-hidden="true"></i>
                    ID Card Badge
                  </div>
                  <v-flex
                    class="d-flex flex-wrap pa-0 justify-center justify-md-start"
                  >
                    <v-card
                      v-for="badges in eventBadge"
                      :key="badges.id"
                      class="ml-0 mt-0 elevation-0 badge-view"
                      :class="{
                        'on-click': selectedItem === badges.id,
                      }"
                      @click="
                        RTEValue = ''
                        selectTemplate(badges.id)
                        selectedItem = badges.id
                      "
                    >
                      <div
                        v-if="
                          badges.Size === 'B010 - ID Card Badge (54mm x 76mm)'
                        "
                      >
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div v-html="getBadge(badges.Template)" />
                      </div>
                    </v-card>
                  </v-flex>
                  <p class="tempId"></p>
                  <div class="pa-0">
                    <i class="fa fa-id-badge pl-1 ml-2" aria-hidden="true"></i>
                    Pin Name Badge
                  </div>
                  <v-flex
                    class="d-flex flex-wrap pa-0 justify-center justify-md-start"
                  >
                    <v-card
                      v-for="badges in eventBadge"
                      :key="badges.id"
                      class="ml-0 mt-0 elevation-0 badge-view"
                      :class="{
                        'on-click': selectedItem === badges.id,
                      }"
                      @click="
                        selectTemplate(badges.id)
                        selectedItem = badges.id
                      "
                    >
                      <div
                        v-if="
                          badges.Size === 'B004 - Pin Name Badge (98mm x 52mm)'
                        "
                      >
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div v-html="getBadge(badges.Template)" />
                      </div>
                    </v-card>
                  </v-flex>
                </v-row>
              </v-tab-item>
              <v-tab-item :value="'tab-2'">
                <v-row>
                  <v-col v-if="tabs === 'tab-2'" cols="12" class="mb-5">
                    <RichText
                      v-model="RTEValue"
                      label="Description"
                      :dropdown-options="dropdownOptions"
                    />
                  </v-col>
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
            @click="
              tabs = 'tab-1'
              RTEValue = ''
            "
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
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import nuxtconfig from '~/nuxt.config'
import event from '~/config/apps/event/gql/event.gql'
import badge from '~/config/apps/event/gql/badge.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { getIdFromAtob } from '~/utility'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
  },
  props: {
    newBadge: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tabs: '1',
      data: {
        badge: {},
        event: {},
      },
      eventBadge: {},
      selectedItem: '',
      selectedBadge: {},
      RTEValue: '',
      formData: {
        EventId: '',
        DisplayOrder: '',
        Size: '',
        Template: '',
      },
      FullName: '',
      Organization: '',
      Category: 'Guest',
      template: '',
    }
  },
  computed: {
    dropdownOptions() {
      return {
        'First Name': 'First  Name',
        'Last Name': 'Last  Name',
        'Full Name': 'Full  Name',
        Category: 'Category',
        'Event Name': 'Event  Name',
        Organization: 'Organization',
        Logo: 'Logo',
        QRCode: 'QRCode',
      }
    },
  },
  methods: {
    getAttachmentLink(id, isDownloadLink) {
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
      return attachmentUrl
    },
    getBadge(str) {
      const logoId = this.$refs.badgeDialog.$parent.$parent.$data.logoId
      const logoUrl =
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      str = str
        .replace('{{ FullName }}', `${this.$auth.user.data.name}`)
        .replace('{{ Category }}', `${this.Category}`)
        .replace('{{ Organization }}', `${this.$store.state.currentOrg.name}`)
        .replace(logoUrl, this.getAttachmentLink(logoId, true))
      if (this.data.event && this.data.event.Title) {
        str = str.replace('{{ EventName }}', `${this.data.event.Title}`)
      }

      return str
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.formData.EventId = this.$route.params.id
      this.formData.DisplayOrder = this.selectedBadge.DisplayOrder
      this.formData.Size = this.selectedBadge.Size
      this.formData.Template = this.selectedBadge.Template
      try {
        const res = await this.$axios.$post(`${url}Badges`, {
          ...this.formData,
        })
        if (res) {
          this.$refs.badgeDialog.$parent.$parent.refresh()
          this.close()
        }
      } catch (e) {
        console.log(
          `Error in apps/event/_id/newBadgeForm.vue while making a POST call in method onSave context: URL:-${url}\n formData:${this.formData}`,
          e
        )
      }
    },
    async selectTemplate(id) {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${badge}
          `,
          variables: {
            filters: {
              where: {
                id: getIdFromAtob(id),
              },
            },
          },
        })
        const getSelectedBadgeData = formatGQLResult(result.data, 'Badge')
        this.selectedBadge =
          getSelectedBadgeData.length > 0 ? getSelectedBadgeData[0] : {}
        this.RTEValue =
          getSelectedBadgeData.length > 0
            ? getSelectedBadgeData[0].Template
            : ''
      } catch (e) {
        console.log(
          `Error in  apps/event/_id/newBadgeForm.vue while making a GQL call to Badge model in method selectTemplate context: id:-${getIdFromAtob(
            id
          )}`,
          e
        )
      }
    },
    close() {
      this.tabs = 'tab-1'
      this.RTEValue = ''
      this.$emit('update:newBadge', false)
    },
    refresh() {
      this.$apollo.queries.data1.refresh()
      this.$apollo.queries.data.refresh()
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${badge}
        `
      },
      variables() {
        return {
          filters: {
            order: 'DisplayOrder Asc',
            where: {
              EventId: {
                exists: false,
              },
            },
          },
        }
      },
      update(data) {
        const badge = formatGQLResult(data, 'Badge')
        this.eventBadge = badge
        this.template = this.eventBadge[0].Template
        return {
          badge: badge.length > 0 ? badge : {},
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
          eventId: this.$route.params.id,
        }
      },
      update(data) {
        const event = formatGQLResult(data, 'Event')
        this.data.event = event.length > 0 ? event[0] : {}
        return {
          event: event.length > 0 ? event[0] : {},
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
.on-click {
  border: 2px solid #1a73e8;
}
</style>
