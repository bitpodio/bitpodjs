<template>
  <v-flex class="greybg">
    <div class="pt-4">
      <v-row class="ma-0">
        <v-col
          v-for="item in items"
          :key="item.id"
          class="pa-4 pl-0 pt-0 eventtiles ma-4 ml-0 mt-0"
        >
          <div v-if="item.BusinessType === 'Recurring'">
            <v-card class="elevation-0 pa-0">
              <nuxt-link
                :to="recurringRoutes(item.id)"
                class="text-decoration-none"
              >
                <div class="positionRelative">
                  <v-btn
                    v-if="item.Status === 'Not ready'"
                    class="ma-2 positionAbsolute draft-event grey--text text--darken-2"
                    depressed
                    small
                    color="white"
                  >
                    Draft
                  </v-btn>
                  <div v-if="!item.Images.length" class="overflow-h rounded-t">
                    <v-flex
                      class="tile-img tile-pattern rounded-0"
                      :style="{
                        'background-image': getRandomImage(item.Title),
                      }"
                    ></v-flex>
                  </div>
                  <div class="overflow-h rounded-t">
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
                  </div>
                </div>
                <v-flex class="tile-info pa-4 pb-0">
                  <div class="text--secondary pa-2 pb-0 body-2 pl-0 pt-0">
                    {{ item.StartDate }}
                  </div>
                  <v-card-title
                    class="text-h5 grey--text text--darken-4 text-truncate d-block text-capitalize pa-2 pt-0 pb-1 pl-0"
                  >
                    {{ item.Title }}
                  </v-card-title>
                  <div
                    class="text--secondary pa-2 pb-0 pt-0 body-2 text-truncate d-block pl-0"
                  >
                    {{
                      formatAddressField(
                        item._VenueAddress && item._VenueAddress.City
                      )
                    }}
                    {{
                      formatAddressField(
                        item._VenueAddress && item._VenueAddress.Country
                      )
                    }}
                    <!-- {{ item._VenueAddress.Country }} -->
                  </div>
                </v-flex>
              </nuxt-link>
              <v-card-actions class="pt-0 pl-4 tiles-action">
                <div class="text-truncate d-block">
                  <v-text class="ma-0 mr-1 event-tags body-2"
                    >#Recurring event</v-text
                  >
                  <v-text
                    v-for="Tags in item.Tags"
                    :key="Tags"
                    small
                    class="ma-0 mr-1 event-tags body-2"
                  >
                    #{{ Tags }}
                  </v-text>
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
                    <v-list-item @click="openEventForm(item.id)">
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
                    <v-list-item @click="openMakeCopy(item.id)">
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
            <v-card class="elevation-0 pa-0">
              <nuxt-link :to="routes(item.id)" class="text-decoration-none">
                <div class="positionRelative">
                  <v-btn
                    v-if="item.Status === 'Not ready'"
                    class="ma-2 positionAbsolute draft-event grey--text text--darken-2"
                    depressed
                    small
                    color="white"
                  >
                    Draft
                  </v-btn>
                  <div v-if="!item.Images.length" class="overflow-h rounded-t">
                    <v-flex
                      class="tile-img tile-pattern rounded-0"
                      :style="{
                        'background-image': getRandomImage(item.Title),
                      }"
                    ></v-flex>
                  </div>
                  <div class="overflow-h rounded-t">
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
                  </div>
                </div>
                <v-flex class="tile-info pa-4 pb-0">
                  <div class="text--secondary pa-2 pb-0 body-2 pl-0 pt-0">
                    {{ item.StartDate }}
                  </div>
                  <v-card-title
                    class="text-h5 grey--text text--darken-4 text-truncate d-block text-capitalize pa-2 pt-0 pb-1 pl-0"
                  >
                    {{ item.Title }}
                  </v-card-title>
                  <div
                    class="text--secondary pa-2 pb-0 pt-0 body-2 text-truncate d-block pl-0"
                  >
                    {{
                      formatAddressField(
                        item._VenueAddress && item._VenueAddress.City
                      )
                    }}
                    {{
                      formatAddressField(
                        item._VenueAddress && item._VenueAddress.Country
                      )
                    }}
                  </div>
                </v-flex>
              </nuxt-link>
              <v-card-actions class="pt-0 pl-4 tiles-action">
                <div class="text-truncate d-block">
                  <v-text
                    v-for="Tags in item.Tags"
                    :key="Tags"
                    small
                    class="ma-0 mr-1 event-tags body-2"
                  >
                    #{{ Tags }}
                  </v-text>
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
                    <v-list-item :key="item.id" @click="openEventForm(item.id)">
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
                    <v-list-item :key="item.id" @click="openMakeCopy(item.id)">
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
    <div v-if="eventForm">
      <editEventForm :id="id" :event-form.sync="eventForm" />
    </div>
    <makeCopy :id="id" :key="count" :is-make-copy.sync="isMakeCopy" />
  </v-flex>
</template>

<script>
import editEventForm from '~/pages/apps/_app/event/_id/editEventForm.vue'
import makeCopy from '~/pages/apps/_app/event/_id/makeCopy.vue'
import nuxtconfig from '~/nuxt.config'
export default {
  components: {
    editEventForm,
    makeCopy,
  },
  props: {
    items: { type: Array, default: () => [] },
    offset: { type: Boolean, default: false },
  },
  data() {
    return {
      eventForm: false,
      isMakeCopy: false,
      id: '',
      count: 0,
    }
  },
  methods: {
    openEventForm(itemId) {
      this.id = itemId
      this.eventForm = true
    },
    openMakeCopy(itemId) {
      this.id = itemId
      this.isMakeCopy = true
      this.count += 1
    },
    routes(id) {
      return `/apps/event/event/${id}`
    },
    getAttachmentLink(id, isDownloadLink) {
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
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
    formatAddressField(fieldValue) {
      return fieldValue || ' '
    },
  },
}
</script>

<style scoped>
.tile-pattern {
  background-size: cover;
  height: 140px;
}
.tile-img {
  max-height: 140px;
  min-height: 140px;
  transition: transform 0.3s, opacity 0.3s ease-out;
  -moz-transition: transform 0.3s, opacity 0.3s ease-out;
  -webkit-transition: transform 0.3s, opacity 0.3s ease-out;
  -o-transition: transform 0.3s, opacity 0.3s ease-out;
}
.tile-img:focus,
.tile-img:hover {
  transform: scale(1.1);
  opacity: 1;
  overflow: hidden;
}
.eventtiles {
  max-width: 280px;
  min-width: 280px;
}
.tile-info {
  min-height: 92px;
}
.overflow-h {
  overflow: hidden;
}
.event-tags::after {
  content: ', ';
}
.event-tags:last-child::after {
  content: '';
}
.tiles-action {
  min-height: 36px;
}
.draft-event {
  right: -15px;
  top: 5px;
  z-index: 4;
  pointer-events: none;
}
</style>
