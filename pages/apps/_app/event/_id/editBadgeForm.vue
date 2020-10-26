<template>
  <v-layout>
    <v-dialog
      ref="editBadgeDialog"
      v-model="editBadgeForm"
      persistent
      scrollable
      max-width="900px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">
            Edit Badge
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
            <v-row>
              <v-col cols="12" class="mb-5">
                <RichText
                  v-model="RTEValue"
                  :dropdown-options="dropdownOptions"
                  :show-logo-button="true"
                  :show-q-r-button="true"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn color="primary" depressed @click.native="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
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
    editBadgeForm: {
      default: false,
      type: Boolean,
    },
    id: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      data: {
        badge: {},
        event: {},
      },
      eventBadge: {},
      eventData: {},
      RTEValue: '',
      RTEContent: '',
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
      }
    },
  },
  watch: {
    id(newVal, oldVal) {
      if (newVal !== '') {
        this.editBadge()
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:editBadgeForm', false)
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      const badgeId = getIdFromAtob(this.id)
      try {
        const res = await this.$axios.$patch(`${url}Badges/${badgeId}`, {
          Template: this.RTEValue,
        })
        if (res) {
          this.$refs.editBadgeDialog.$parent.$parent.refresh()
          this.close()
        }
      } catch (e) {
        console.error(
          `Error in editBadgeForm.vue while making a PATCH call in method onSave context: URL:-${url}\n badgeId:${badgeId}`,
          e
        )
      }
    },
    async editBadge() {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${badge}
          `,
          variables: {
            filters: {
              where: {
                id: `${getIdFromAtob(this.id)}`,
              },
            },
          },
        })
        if (result) {
          const badgeTemplate = formatGQLResult(result.data, 'Badge')
          this.RTEValue = badgeTemplate[0].Template
        }
      } catch (e) {
        console.error(
          `Error in editBadgeForm.vue while making a GQL call to Badge model in method editBadge context: id:-${getIdFromAtob(
            this.id
          )}`,
          e
        )
      }
    },
  },

  apollo: {
    data: {
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
        const badge = formatGQLResult(data, 'Badge')
        this.eventData = event.length > 0 ? event[0] : {}
        this.eventBadge = badge.length > 0 ? badge[0] : {}

        return {
          event: event.length > 0 ? event[0] : {},
          badge: badge.length > 0 ? badge[0] : {},
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
