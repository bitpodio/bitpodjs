<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <confirm ref="confirm"></confirm>
    <v-layout column>
      <v-flex class="d-flex align-center" xs12 sm12 md12>
        <v-btn class="ml-n3 mr-2" icon @click="goBack">
          <v-icon class="fs-30">mdi-chevron-left</v-icon>
        </v-btn>
        <i18n path="Common.PrintedTicketTemplate" />
        <v-spacer />
      </v-flex>
      <v-skeleton-loader
        :loading="!!loading"
        type="card"
        width="425"
        height="200"
        class="mt-4"
      >
        <v-flex
          v-if="ticketTemplates.length"
          class="d-flex flex-wrap greybg pa-0 justify-center justify-md-start"
        >
          <v-hover
            v-for="item in ticketTemplates"
            :key="item.id"
            v-slot:default="{ hover }"
            open-delay="200"
          >
            <v-card
              :elevation="hover ? 1 : 0"
              class="ma-8 ml-0 mt-0 invite-card"
            >
              <v-chip
                v-if="
                  templateCheckboxes.length &&
                  templateCheckboxes[0] === item.Name
                "
                label
                class="positionAbsolute active-ticket-template success text-white elevation-1"
                ><i18n path="Common.Active"
              /></v-chip>
              <div v-if="item.ThumbnailUrl !== null" class="pa-1">
                <v-img
                  :src="item.ThumbnailUrl"
                  :lazy-src="item.ThumbnailUrl"
                  class="grey lighten-2"
                  aspect-ratio="70/33"
                  height="200"
                  width="425"
                  position="top"
                >
                  <template v-slot:placeholder>
                    <v-img
                      :src="$config.cdnUri + 'new-invitee-image.png'"
                      class="grey lighten-2"
                      aspect-ratio="1"
                      height="200"
                      width="200"
                    >
                    </v-img>
                  </template>
                </v-img>
              </div>
              <div v-else class="pa-1">
                <v-img
                  :src="$config.cdnUri + 'new-invitee-image.png'"
                  class="grey lighten-2"
                  aspect-ratio="1"
                  height="200"
                  width="200"
                >
                </v-img>
              </div>
              <v-divider></v-divider>
              <v-card-actions>
                <div class="text-truncate text-capitalize">
                  <v-checkbox
                    v-model="templateCheckboxes"
                    :disabled="!!loadingChanges"
                    :label="item.Name"
                    :value="item.Name"
                    class="ml-2"
                    @change="updateTemplateSelection(item)"
                  ></v-checkbox>
                </div>

                <v-spacer></v-spacer>
                <v-menu
                  v-if="
                    (templateCheckboxes.length &&
                      templateCheckboxes[0] === item.Name) ||
                    item.ThumbnailUrl
                  "
                  bottom
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item
                      v-if="
                        templateCheckboxes.length &&
                        templateCheckboxes[0] === item.Name
                      "
                      @click="
                        editTemplate = true
                        selected = item
                      "
                    >
                      <v-list-item-icon class="mr-2">
                        <i
                          class="fa fa-pencil-square-o mt-1"
                          aria-hidden="true"
                        ></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          ><i18n path="Common.EditTemplate"
                        /></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      v-if="item.ThumbnailUrl"
                      @click="
                        viewTemplate = item.ThumbnailUrl
                        showDialog = true
                      "
                    >
                      <v-list-item-icon class="mr-2">
                        <i class="fa fa-eye mt-1" aria-hidden="true"></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          ><i18n path="Drawer.View"
                        /></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
        <div v-else>
          No ticket templates found.
        </div>
      </v-skeleton-loader>
    </v-layout>
    <div v-if="editTemplate">
      <edit-printed-ticket-template
        :edit-template.sync="editTemplate"
        :selected="eventTicketTemplate"
        :refresh="refresh"
        @update-snackbar="updateSnackbar"
      />
    </div>
    <v-dialog v-if="!!viewTemplate" v-model="showDialog" width="600px">
      <v-card>
        <v-card-title class="pa-1">
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="
              viewTemplate = false
              showDialog = false
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-img :src="viewTemplate"></v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import printedTicketsQuery from '~/config/apps/admin/gql/printedTickets.gql'
import { formatGQLResult } from '~/utility/gql.js'
import editPrintedTicketTemplate from '~/pages/apps/_app/organization/_id/editPrintedTicketTemplate.vue'
import { getIdFromAtob } from '~/utility'

export default {
  layout: 'event',
  components: { editPrintedTicketTemplate },
  data: () => {
    return {
      ticketTemplates: [],
      eventTicketTemplate: {},
      eventId: '',
      editTemplate: false,
      newTemplate: false,
      error: null,
      loading: 0,
      loadingChanges: 0,
      templateCheckboxes: [],
      viewTemplate: false,
      showDialog: false,
    }
  },
  computed: {
    existingTemplateId() {
      if (Object.keys(this.ticketTemplate).length > 0) {
        return getIdFromAtob(this.ticketTemplate.id)
      }
      return ''
    },
  },
  mounted() {
    this.eventId = this.$route.params.id
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    updateSnackbar(message) {
      this.snackbar = true
      this.snackbarText = message
    },
    refresh() {
      this.$apollo.queries.ticketTemplates.refresh()
      this.$apollo.queries.eventTicketTemplate.refresh()
    },
    async updateTemplateSelection(selectedItem) {
      this.loadingChanges = this.loadingChanges + 1
      const url = this.$bitpod.getApiUrl()
      const templateCheckboxesBackup = this.templateCheckboxes
      if (this.templateCheckboxes.length) {
        let check = true
        if (this.templateCheckboxes.length > 1)
          check = await this.$refs.confirm.open(
            this.$t('Common.NewTicketTemplate'),
            this.$t('Messages.Warn.ReplaceTicketTemplate'),
            { color: 'warning' }
          )
        if (check) {
          this.templateCheckboxes = [selectedItem.Name]
          const { id, isDefault, ...templateToPush } = selectedItem
          try {
            const res = await this.$axios.$patch(
              `${url}PrintedTicketTemplates`,
              {
                ...templateToPush,
                eventId: this.eventId,
                ...(this.eventTicketTemplate && {
                  id: this.eventTicketTemplate.id,
                }),
              }
            )
            if (res) {
              this.refresh()
            }
          } catch (e) {
            console.error(
              `Error in printedtickets page while UPDATE a Printed ticket template context: printedtickettemplateid:- ${this.eventTicketTemplate.id} baseUrl: ${url} error: ${e}`,
              e
            )
            this.templateCheckboxes = [templateCheckboxesBackup[0]]
            this.refresh()
            this.updateSnackbar(this.$t('Messages.Error.SetupErrorTitle'))
          }
        } else {
          this.templateCheckboxes = [templateCheckboxesBackup[0]]
        }
      } else {
        const ticketTemplateId = this.eventTicketTemplate
          ? this.eventTicketTemplate.id
          : ''
        if (ticketTemplateId) {
          const check = await this.$refs.confirm.open(
            this.$t('Common.DeleteTicketTemplate'),
            this.$t('Messages.Warn.UnassignPrintTicketTemplate'),
            { color: 'error lighten-1' }
          )
          if (check) {
            try {
              const res = await this.$axios.$delete(
                `${url}PrintedTicketTemplates/${ticketTemplateId}`
              )
              if (res) {
                this.refresh()
              }
            } catch (e) {
              console.error(
                `Error in printedtickets page while DELETE a Printed ticket template context: printedtickettemplateid:- ${ticketTemplateId} baseUrl: ${url} error: ${e}`,
                e
              )
              this.templateCheckboxes = [this.eventTicketTemplate.Name]
              this.refresh()
              this.updateSnackbar(this.$t('Messages.Error.SetupErrorTitle'))
            }
          } else {
            this.templateCheckboxes = [this.eventTicketTemplate.Name]
          }
        }
      }
      this.loadingChanges = this.loadingChanges - 1
    },
  },
  apollo: {
    eventTicketTemplate: {
      query() {
        return gql`
          ${printedTicketsQuery}
        `
      },
      variables() {
        return {
          filters: {
            order: 'DisplayOrder Asc',
            where: {
              eventId: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        const ticketTemplates = formatGQLResult(data, 'PrintedTicketTemplate')
        if (ticketTemplates.length) {
          const returnData = ticketTemplates.map((template) => ({
            ...template,
            id: getIdFromAtob(template.id),
          }))
          this.templateCheckboxes = [returnData[0].Name]
          return returnData[0]
        }
        this.templateCheckboxes = []
        return {}
      },
      result({ data, loading, networkStatus }) {},
      error(err) {
        this.error = err
      },
      fetchPolicy: 'no-cache',
      prefetch: false,
      loadingKey: 'loading',
    },
    ticketTemplates: {
      query() {
        return gql`
          ${printedTicketsQuery}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              isDefault: true,
            },
          },
        }
      },
      update(data) {
        const ticketTemplates = formatGQLResult(data, 'PrintedTicketTemplate')
        if (ticketTemplates.length) {
          const returnData = ticketTemplates.map((template) => ({
            ...template,
            id: getIdFromAtob(template.id),
          }))
          return returnData
        }
        return []
      },
      result({ data, loading, networkStatus }) {},
      error(err) {
        this.error = err
      },
      fetchPolicy: 'no-cache',
      prefetch: false,
      loadingKey: 'loading',
    },
  },
}
</script>

<style>
.active-ticket-template {
  right: -15px;
  top: 15px;
  z-index: 4;
  pointer-events: none;
}
</style>
