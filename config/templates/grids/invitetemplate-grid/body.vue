<template>
  <div>
    <div>
      <div class="subtitle-1 py-2 greybg">
        <i class="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Invite
        Templates
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

                  <v-list>
                    <v-list-item>
                      <v-list-item-title>Edit Metadata</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Edit Template</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>View</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Delete</v-list-item-title>
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
        >Registration Templates
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
                <div class="text-truncate text-capitalize">{{ item.Name }}</div>

                <v-spacer></v-spacer>

                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title>Edit Metadata</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Edit Template</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>View</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-actions>
            </v-card>
          </div>
        </v-hover>
      </v-flex>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
}
</script>

<style scoped>
.invite-card {
  width: 220px;
  max-width: 220px;
}
</style>
