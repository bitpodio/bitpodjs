<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <confirm ref="confirm"></confirm>
    <TemplateTabs />
    <v-flex
      class="d-flex flex-wrap greybg pa-0 justify-center justify-md-start"
    >
      <v-hover
        v-for="item in items"
        :key="item.id"
        v-slot:default="{ hover }"
        open-delay="200"
      >
        <v-card :elevation="hover ? 1 : 0" class="ma-8 ml-0 mt-0 invite-card">
          <div v-if="item.ThumbnailUrl !== null" class="pa-1">
            <v-img
              :src="item.ThumbnailUrl"
              :lazy-src="item.ThumbnailUrl"
              aspect-ratio="70/33"
              class="grey lighten-2"
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
              {{ item.Name }}
            </div>

            <v-spacer></v-spacer>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item
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
                <v-list-item @click="deletePrintedTicketTemplate(item.id)">
                  <v-list-item-icon class="mr-2">
                    <i class="fa fa-trash mt-1" aria-hidden="true"></i>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      ><i18n path="Drawer.Delete"
                    /></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <div v-if="editTemplate">
      <editPrintedTicketTemplate
        :edit-template.sync="editTemplate"
        :selected="selected"
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
import editPrintedTicketTemplate from '~/pages/apps/_app/organization/_id/editPrintedTicketTemplate.vue'
import TemplateTabs from '~/components/common/template-tabs'

export default {
  components: { editPrintedTicketTemplate, TemplateTabs },
  props: {
    items: { type: Array, default: () => [] },
    refresh: {
      type: Function,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      editTemplate: false,
      viewTemplate: false,
      selected: {},
      snackbar: false,
      timeout: '2000',
      snackbarText: '',
    }
  },
  methods: {
    updateSnackbar(message) {
      this.snackbar = true
      this.snackbarText = message
    },
    async deletePrintedTicketTemplate(id) {
      const url = this.$bitpod.getApiUrl()

      const check = await this.$refs.confirm.open(
        this.$t('Common.DeleteTicketTemplate'),
        this.$t('Messages.Warn.DeletePrintTicketTemplate'),
        { color: 'error lighten-1' }
      )
      let res = null
      if (check === true) {
        try {
          res = await this.$axios.$delete(`${url}PrintedTicketTemplates/${id}`)
        } catch (e) {
          console.error(
            `Error in printedtickets-grid while DELETE a Printed ticket template context: printedtickettemplateid:- ${id} baseUrl: ${url} error: ${e}`,
            e
          )
        }
        if (res) {
          this.refresh()
        }
      }
    },
  },
}
</script>
<style>
.printedtickets-printed-tickets .grid-actions-container {
  max-width: 900px;
}
@media (min-width: 1904px) {
  .printedtickets-printed-tickets .grid-actions-container {
    max-width: 1100px;
  }
}
@media (min-width: 600px) {
  .printedtickets-printed-tickets .grid-actions-container {
    max-width: 100%;
  }
}
</style>
