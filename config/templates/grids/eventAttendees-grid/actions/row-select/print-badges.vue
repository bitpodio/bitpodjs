<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click="openPrintForm">
      <v-icon left>mdi-printer</v-icon><i18n path="Common.PrintBadges" />
    </v-btn>
    <iframe
      v-show="false"
      id="print"
      ref="iframe"
      style="width: 500px; position: relative; height: 500px"
    >
    </iframe>
  </v-col>
</template>
<script>
import gql from 'graphql-tag'
import badge from '~/config/apps/event/gql/badge.gql'
import organizationInfo from '~/config/apps/event/gql/organizationInfo.gql'
import nuxtconfig from '~/nuxt.config'
import { formatGQLResult } from '~/utility/gql.js'
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      data: {
        event: {},
      },
      eventBadge: {},
      Template: '',
      logoId: '',
    }
  },
  methods: {
    getDefaultBadge(str) {
      const logoUrl =
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      if (str) {
        str = str
          .replace('{{ FullName }}', `${this.$auth.user.data.name}`)
          .replace('{{ Category }}', `${this.getBadgeCategory}`)
          .replace('{{ Organization }}', `${this.$store.state.currentOrg.name}`)
          .replace(logoUrl, this.getAttachmentLink(this.logoId, true))
        if (this.data.event && this.data.event.Title) {
          str = str.replace('{{ EventName }}', `${this.data.event.Title}`)
        }
      }
      return str
    },
    openPrintForm() {
      const logoUrl = `src="${
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      }"`
      let str
      this.getOrgInfo()
      this.items.map((ele) => {
        const template = this.context.badge.Template
          ? this.context.badge.Template
          : this.Template
        if (this.logoId !== '') {
          str = this.getBadge(template, ele)
        } else {
          str = this.getBadge(template, ele)
          str = str.replace(logoUrl, '')
        }
        this.$refs.iframe.contentWindow.document.write(
          `<div style="display:flex">${str}</div>`
        )
      })
      setTimeout(this.printBadge, 2000)
    },
    printBadge() {
      this.$refs.iframe.contentWindow.print()
      this.$refs.iframe.contentWindow.close()
      this.$refs.iframe.contentWindow.document.close()
    },
    getBadge(str, items) {
      const logoUrl =
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      if (str) {
        str = str
          .replace('{{ FullName }}', `${items.FullName}`)
          .replace(
            '{{ Category }}',
            `${(items.regType && items.regType.Name) || 'Guest'}`
          )
          .replace('{{ Organization }}', `${items.CompanyName}`)
        if (this.logoId !== '') {
          str = str.replace(
            logoUrl,
            this.getAttachmentLink(this.logoId, true) || logoUrl
          )
        }
        if (this.context.event && this.context.event.Title) {
          str = str.replace('{{ EventName }}', `${this.context.event.Title}`)
        }
      }
      return str
    },
    getAttachmentLink(id, isDownloadLink) {
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
      return attachmentUrl
    },
    async getOrgInfo() {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${organizationInfo}
          `,
          variables: {
            filters: {
              where: {},
            },
          },
        })
        if (result) {
          const orgInfo = formatGQLResult(result.data, 'OrganizationInfo')
          if (this.context.event.Logo.length > 0) {
            this.logoId = this.context.event.Logo[0] || ''
          } else if (
            this.context.event.Logo.length === 0 &&
            orgInfo[0].Image.length === 0
          ) {
            this.logoId = ''
          } else {
            this.logoId = orgInfo[0].Image[0]
          }
        }
      } catch (e) {
        console.error(
          'Error while fetching data using gql in print-badges.vue using the organizationInfo gql in method getOrgInfo',
          e
        )
      }
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
            where: {
              or: [
                {
                  EventId: {
                    inq: [this.$route.params.id],
                  },
                },
                {
                  EventId: {
                    exists: false,
                  },
                },
              ],
            },
          },
        }
      },
      update(data) {
        const badge = formatGQLResult(data, 'Badge')
        this.eventBadge = badge.length > 0 ? badge : {}
        this.eventBadge.filter((e) => {
          if (e.EventId === this.$route.params.id) {
            this.Template = e.Template
          }
        })
        this.getOrgInfo()
        return {
          badge: badge.length > 0 ? badge : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
        console.error(
          'Error while fetching data using gql in eventAttendees/actions/row-select/print-badges.vue using the badge gql in apollo data query section',
          error
        )
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>
