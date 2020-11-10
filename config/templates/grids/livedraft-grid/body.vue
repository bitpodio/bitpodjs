<template>
  <v-flex class="greybg">
    <confirm ref="confirm"></confirm>
    <div v-if="items.length">
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
                    <i18n path="Common.Draft" />
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
                    {{ formatedDate(item.StartDate, item.Timezone) }}
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
                    ><i18n path="Common.RecurringE"
                  /></v-text>
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
                        <v-list-item-title
                          ><i18n path="Drawer.Preview"
                        /></v-list-item-title>
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
                        <v-list-item-title
                          ><i18n path="Drawer.Edit"
                        /></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="openMakeCopy(item.id)">
                      <v-list-item-icon class="mr-2">
                        <i class="fa fa-clone mt-1" aria-hidden="true"></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          ><i18n path="Drawer.MakeaCopy"
                        /></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      v-if="item.Status === 'Not ready'"
                      :key="item.id"
                      @click="stop"
                    >
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
                    <i18n path="Common.Draft" />
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
                  <div
                    v-if="item.StartDate !== undefined && item.StartDate"
                    class="text--secondary pa-2 pb-0 body-2 pl-0 pt-0"
                  >
                    {{ $d(new Date(item.StartDate), 'long', $i18n.locale) }}
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
                  <span v-if="item.LocationType === 'Bitpod Virtual'">
                    <v-text class="ma-0 mr-1 event-tags body-2"
                      ><i18n path="Common.BitpodVirtual"
                    /></v-text>
                  </span>
                  <span v-else-if="item.LocationType === 'Online event'">
                    <v-text class="ma-0 mr-1 event-tags body-2"
                      ><i18n path="Common.OnlineEventText"
                    /></v-text>
                  </span>
                  <span v-else>
                    <v-text
                      v-for="Tags in item.Tags"
                      :key="Tags"
                      small
                      class="ma-0 mr-1 event-tags body-2"
                    >
                      #{{ Tags }}
                    </v-text>
                  </span>
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
                        <v-list-item-title
                          ><i18n path="Drawer.Preview"
                        /></v-list-item-title>
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
                        <v-list-item-title
                          ><i18n path="Drawer.Edit"
                        /></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item :key="item.id" @click="openMakeCopy(item.id)">
                      <v-list-item-icon class="mr-2">
                        <i class="fa fa-clone mt-1" aria-hidden="true"></i>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          ><i18n path="Drawer.MakeaCopy"
                        /></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      v-if="item.Status === 'Not ready'"
                      :key="item.id"
                      @click="deleteEvent(item.id)"
                    >
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
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row class="ma-0">
        <v-col class="col-md-12 text-center">
          <v-text class="body-1"><i18n path="Messages.Warn.NoEvents" /></v-text>
        </v-col>
      </v-row>
    </div>
    <div v-if="eventForm">
      <editEventForm :id="id" :event-form.sync="eventForm" />
    </div>
    <makeCopy :id="id" :key="count" :is-make-copy.sync="isMakeCopy" />
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
  </v-flex>
</template>

<script>
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'
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
      snackbar: false,
      timeout: 2000,
      snackbarText: '',
    }
  },
  methods: {
    async deleteEvent(id) {
      const url = this.$bitpod.getApiUrl()
      try {
        const check = await this.$refs.confirm.open(
          this.$t('Drawer.DeleteEvent'),
          this.$t('Messages.Warn.DeleteEvent'),
          { color: 'error lighten-1' }
        )
        if (check === true) {
          const res = await this.$axios.$delete(`${url}Events/${id}`)
          if (res) {
            this.snackbarText = this.$t('Messages.Success.DeletedSuccessfully')
            this.snackbar = true
            this.$eventBus.$emit('grid-refresh')
          }
        }
      } catch (e) {
        console.error(
          `Error in config/templates/grids/livedraft-grid/body.vue while making a DELETE call to Event model in method deleteEvent context: EventId:-${id} \n URL:- ${url} `,
          e
        )
      }
    },
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
      return this.localePath(`/apps/event/event/${id}`)
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
      return this.localePath(`/apps/event/event/recurring/${id}`)
    },
    viewRegistration(UniqLink) {
      const orgName = this.$store.state.currentOrg.name
      if (orgName === 'bitpod') {
        const regUrl = `https://${nuxtconfig.axios.eventUrl}/e/${UniqLink}`
        window.open(`${regUrl}`, '_blank')
      } else {
        const regUrl = `https://${orgName}-${nuxtconfig.axios.eventUrl}/e/${UniqLink}`
        window.open(`${regUrl}`, '_blank')
      }
    },
    formatAddressField(fieldValue) {
      return fieldValue || ' '
    },
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatedDate(date, timezone) {
      if (date) {
        const formattedDate = new Date(date)
        const zonedDate = utcToZonedTime(formattedDate, timezone)
        const pattern = 'PPp'
        const output = format(zonedDate, pattern, { timezone })
        return output
      }
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
