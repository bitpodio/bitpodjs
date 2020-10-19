<template>
  <v-flex class="d-flex flex-wrap greybg pa-0 justify-center justify-md-start">
    <v-hover
      v-for="item in items"
      :key="item.id"
      v-slot:default="{ hover }"
      open-delay="200"
    >
      <v-card :elevation="hover ? 1 : 0" class="ma-3 ml-0 mt-0 invite-card">
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

            <v-list>
              <v-list-item
                @click="
                  editMetadata = true
                  selected = item
                "
              >
                <v-list-item-title>Edit Metadata</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="
                  editTemplate = true
                  selected = item
                "
              >
                <v-list-item-title>Edit Template</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="item.ImageURL"
                @click="
                  viewTemplate = item.ImageURL
                  showDialog = true
                "
              >
                <v-list-item-title>View</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteTemplete(item.id)">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
    </v-hover>
    <div v-if="editTemplate">
      <editInviteTemplate
        :edit-template.sync="editTemplate"
        :selected="selected"
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
  </v-flex>
</template>

<script>
import editInviteTemplate from '~/pages/apps/_app/organization/_id/editInviteTemplate.vue'
import editInviteMetadata from '~/pages/apps/_app/organization/_id/editInviteMetadata.vue'
import { getApiUrl } from '~/utility'
export default {
  components: {
    editInviteTemplate,
    editInviteMetadata,
  },
  props: { items: { type: Array, default: () => [] } },
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
      const url = getApiUrl()

      const check = confirm('Are you sure you want to delete this template?')
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
          console.log(res)
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
