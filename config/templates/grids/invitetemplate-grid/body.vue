<template>
  <div>
    <confirm ref="confirm"></confirm>
    <div>
      <div class="subtitle-1 py-2 greybg">
        <i class="fa fa-pencil-square-o mr-1" aria-hidden="true"></i
        ><i18n path="Common.InviteTemplates" />
      </div>
      <v-flex
        class="d-flex flex-wrap greybg pa-0 justify-center justify-md-start"
      >
        <v-hover
          v-for="item in items"
          :key="item.id"
          v-slot:default="{ hover }"
          open-delay="200"
        >
          <div v-if="item.Type == 'Invitation Template'">
            <v-card
              :elevation="hover ? 1 : 0"
              class="ma-3 ml-0 mt-0 invite-card"
            >
              <div v-if="item.ImageURL !== null" class="pa-1">
                <v-img
                  :src="item.ImageURL"
                  :lazy-src="item.ImageURL"
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
                        editMetadata = true
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
                          ><i18n path="Common.EditMetadata"
                        /></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
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
                      v-if="item.ImageURL"
                      @click="
                        viewTemplate = item.ImageURL
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
                    <v-list-item @click="deleteTemplete(item.id)">
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
          </div>
        </v-hover>
      </v-flex>
    </div>

    <div>
      <div class="subtitle-1 py-2 greybg">
        <i class="fa fa-pencil-square-o mr-1" aria-hidden="true"></i
        ><i18n path="Common.RegistrationTemplates" />
      </div>
      <v-flex
        class="d-flex flex-wrap greybg pa-0 justify-center justify-md-start"
      >
        <v-hover
          v-for="item in items"
          :key="item.id"
          v-slot:default="{ hover }"
          open-delay="200"
        >
          <div v-if="item.Type == 'Registration Email Template'">
            <v-card
              :elevation="hover ? 1 : 0"
              class="ma-3 ml-0 mt-0 invite-card positionRelative"
            >
              <div v-if="item.ImageURL !== null" class="pa-1">
                <v-img
                  :src="item.ImageURL"
                  :lazy-src="item.ImageURL"
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
              <v-divider></v-divider>
              <v-card-actions>
                <div class="text-truncate text-capitalize">{{ item.Name }}</div>

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
                        editMetadata = true
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
                          ><i18n path="Common.EditMetadata"
                        /></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
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
                      v-if="item.ImageURL"
                      @click="
                        viewTemplate = item.ImageURL
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
                    <v-list-item @click="deleteTemplete(item.id)">
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
          </div>
        </v-hover>
      </v-flex>
    </div>
    <div v-if="editTemplate">
      <editInviteTemplate
        :edit-template.sync="editTemplate"
        :selected="selected"
        :refresh="refresh"
      />
    </div>
    <div v-if="editMetadata">
      <editInviteMetadata
        :edit-metadata.sync="editMetadata"
        :selected="selected"
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
import editInviteTemplate from '~/pages/apps/_app/organization/_id/editInviteTemplate.vue'
import editInviteMetadata from '~/pages/apps/_app/organization/_id/editInviteMetadata.vue'

export default {
  components: {
    editInviteTemplate,
    editInviteMetadata,
  },
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
      editMetadata: false,
      viewTemplate: false,
      showDialog: false,
      selected: {},
    }
  },
  methods: {
    async deleteTemplete(id) {
      const url = this.$bitpod.getApiUrl()
      const check = await this.$refs.confirm.open(
        this.$t('Common.CancelCheckin'),
        this.$t('Messages.Warn.DeleteTemplate'),
        { color: 'error lighten-1' }
      )
      let res = null
      if (check === true) {
        try {
          res = await this.$axios.$delete(`${url}MarketingTemplates/${id}`)
        } catch (e) {
          console.error(
            `Error in invitetemplate-grid while making a DELETE call to MarketingTemplate model in method deleteTemplete context: url:-${url}`,
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

<style scoped>
.invite-card {
  width: 220px;
  max-width: 220px;
}
</style>
