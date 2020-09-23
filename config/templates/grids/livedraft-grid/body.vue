<template>
  <v-flex class="greybg">
    <div>
      <div class="body-1 pb-2">Live Events</div>
      <v-row class="ma-0">
        <v-col
          v-for="item in items"
          :key="item.id"
          class="pl-0 pt-0 eventtiles"
          cols="12"
          sm="4"
          md="4"
          lg="3"
        >
          <div v-if="item.BusinessType === 'Recurring'">
            <v-card class="elevation-1 pa-2">
              <nuxt-link
                :to="recurringRoutes(item.id)"
                class="text-decoration-none"
              >
                <div v-if="!item.Images.length" class="overflow-h rounded-0">
                  <v-flex
                    class="tile-img tile-pattern rounded-0"
                    :style="{
                      'background-image': getRandomImage(item.Title),
                    }"
                  ></v-flex>
                </div>
                <v-img
                  v-for="image in item.Images"
                  :key="image"
                  :src="getAttachmentLink(image, true)"
                  :lazy-src="getAttachmentLink(image, true)"
                  aspect-ratio="1"
                  class="tile-img rounded-0"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-flex
                        class="tile-img tile-pattern rounded-0"
                        :style="{
                          'background-image': getRandomImage(item.Title),
                        }"
                      ></v-flex>
                    </v-row>
                  </template>
                </v-img>
                <v-flex class="tile-info">
                  <div class="text--secondary pa-2 pb-0 body-2 pl-0">
                    {{ item.StartDate }}
                  </div>
                  <v-card-title
                    class="text-h5 grey--text text--darken-4 text-truncate d-block text-capitalize pa-2 pt-0 pb-1 pl-0"
                  >
                    {{ item.Title }}
                  </v-card-title>
                  <div
                    class="text--secondary pa-2 pt-0 body-2 text-truncate d-block pl-0"
                  >
                    {{ item.VenueName }}
                  </div>
                </v-flex>
                <v-divider></v-divider>
              </nuxt-link>
              <v-card-actions class="px-0">
                <div class="text-truncate d-block">
                  <v-chip
                    v-for="Tags in item.Tags"
                    :key="Tags"
                    small
                    class="ma-0 mr-1"
                  >
                    {{ Tags }}
                  </v-chip>
                </div>

                <v-spacer></v-spacer>
                <v-menu
                  left
                  bottom
                  :offset-y="offset"
                  transition="slide-y-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon small v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list dense>
                    <v-list-item @click="viewRegistration(item.UniqLink)">
                      <v-list-item-icon class="mr-2">
                        <i class="fa fa-eye mt-1" aria-hidden="true"></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Preview</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon class="mr-2">
                        <i
                          class="fa fa-pencil-square-o mt-1"
                          aria-hidden="true"
                        ></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon class="mr-2">
                        <i class="fa fa-clone mt-1" aria-hidden="true"></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Make a copy</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-actions>
            </v-card>
          </div>
          <div v-else>
            <v-card class="elevation-1 pa-2">
              <nuxt-link :to="routes(item.id)" class="text-decoration-none">
                <div v-if="!item.Images.length" class="overflow-h rounded-0">
                  <v-flex
                    class="tile-img tile-pattern rounded-0"
                    :style="{
                      'background-image': getRandomImage(item.Title),
                    }"
                  ></v-flex>
                </div>
                <v-img
                  v-for="image in item.Images"
                  :key="image"
                  :src="getAttachmentLink(image, true)"
                  :lazy-src="getAttachmentLink(image, true)"
                  aspect-ratio="1"
                  class="tile-img rounded-0"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-flex
                        class="tile-img tile-pattern rounded-0"
                        :style="{
                          'background-image': getRandomImage(item.Title),
                        }"
                      ></v-flex>
                    </v-row>
                  </template>
                </v-img>
                <v-flex class="tile-info">
                  <div class="text--secondary pa-2 pb-0 body-2 pl-0">
                    {{ item.StartDate }}
                  </div>
                  <v-card-title
                    class="text-h5 grey--text text--darken-4 text-truncate d-block text-capitalize pa-2 pt-0 pb-1 pl-0"
                  >
                    {{ item.Title }}
                  </v-card-title>
                  <div
                    class="text--secondary pa-2 pt-0 body-2 text-truncate d-block pl-0"
                  >
                    {{ item.VenueName }}
                  </div>
                </v-flex>
                <v-divider></v-divider>
              </nuxt-link>
              <v-card-actions class="px-0">
                <div class="text-truncate d-block">
                  <v-chip
                    v-for="Tags in item.Tags"
                    :key="Tags"
                    small
                    class="ma-0 mr-1"
                  >
                    {{ Tags }}
                  </v-chip>
                </div>

                <v-spacer></v-spacer>
                <v-menu
                  left
                  bottom
                  :offset-y="offset"
                  transition="slide-y-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon small v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list dense>
                    <v-list-item @click="viewRegistration(item.UniqLink)">
                      <v-list-item-icon class="mr-2">
                        <i class="fa fa-eye mt-1" aria-hidden="true"></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Preview</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon class="mr-2">
                        <i
                          class="fa fa-pencil-square-o mt-1"
                          aria-hidden="true"
                        ></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon class="mr-2">
                        <i class="fa fa-clone mt-1" aria-hidden="true"></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Make a copy</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-flex>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
export default {
  props: ['items', 'context'],
  methods: {
    routes(id) {
      return `/apps/event/event/${id}`
    },
    getAttachmentLink(id, isDownloadLink) {
      const attachmentUrl = `https://${nuxtconfig.axios.eventUrl}${
        nuxtconfig.axios.apiEndpoint
      }Attachments${isDownloadLink ? '/download' : ''}${id ? '/' + id : ''}`
      return attachmentUrl
    },
    getRandomImage(name) {
      return window.GeoPattern.generate(name).toDataUrl()
    },
    recurringRoutes(id) {
      return `/apps/event/event/recurring/${id}`
    },
    viewRegistration(UniqLink) {
      const regUrl = `https://${nuxtconfig.axios.eventUrl}/e/${UniqLink}`
      window.open(`${regUrl}`, '_blank')
    },
  },
}
</script>

<style scoped>
.tile-img {
  max-height: 170px;
  min-height: 170px;
}
.eventtiles {
  max-width: 280px;
  min-width: 280px;
}
.tile-info {
  min-height: 90px;
}
.overflow-h {
  overflow: hidden;
}
.tile-pattern {
  background-size: cover;
  height: 170px;
}
</style>
