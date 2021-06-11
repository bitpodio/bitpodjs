<template>
  <div class="mx-n3 mx-sm-0">
    <div class="col-sm-5 px-5 pl-sm-0 event-list-checkin d-flex">
      <v-btn class="mr-2 mt-1 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon>
      </v-btn>
      <v-autocomplete
        v-model="eventTitle"
        :items="items"
        :item-text="itemText"
        :item-value="itemValue"
        single-line
        outlined
        dense
        @change="onChange"
      ></v-autocomplete>
    </div>
    <div>
      <div v-if="content">
        <Grid
          view-name="eventAttendeesInEvent"
          :content="content"
          :has-mobile-custom-view="true"
          :filter="filter"
          class="mt-n12"
        />
      </div>
    </div>
    <Scanner
      view-name="eventAttendeesInEvent"
      :has-event-ended="isPastEventEnd"
      :event-info="eventData"
      :event-id="eventTitle"
      class="scan-btn py-2"
    />
  </div>
</template>
<script>
import Grid from '~/components/common/grid'
import Scanner from '~/components/common/scanner'
import { configLoaderMixin } from '~/utility'
export default {
  layout: 'event',
  components: {
    Grid,
    Scanner,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      eventList: [],
      eventTitle: this.$route.query.eventId,
      eventId: '',
      items: [],
      isGrid: false,
      itemText: 'Title',
      itemValue: 'id',
      isPastEventEnd: false,
      eventData: {},
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
    filter() {
      return {
        where: {
          EventId: this.eventTitle,
        },
      }
    },
  },
  mounted() {
    this.eventProps()
    this.fetchEventData()
  },
  methods: {
    async eventProps() {
      const filter = {
        where: {
          or: [
            { EndDate: { exists: false } },
            { EndDate: { gte: new Date() } },
            { EndDate: null },
            { StartDate: { gte: new Date() } },
            { StartDate: null },
          ],
        },
      }
      const url = `${this.$bitpod.getApiUrl()}Events?filter=${JSON.stringify(
        filter
      )}`
      try {
        const result = await this.$axios.$get(url)
        if (result) {
          this.items = result
        }
      } catch (e) {
        console.error(
          `Error in pages/apps/_app/event-attendee/index.vue while getting lookup items for live events context:${url}`,
          e
        )
      }
    },
    async fetchEventData() {
      const filter = { where: { id: this.eventTitle } }
      const url = `${this.$bitpod.getApiUrl()}Events/findOne?filter=${JSON.stringify(
        filter
      )}`
      try {
        const res = await this.$axios.$get(url)
        if (res) {
          this.eventData = res
          if (res.EndDate) {
            const eventEnd = new Date(res.EndDate)
            const eventEndDate = new Date(
              Date.UTC(
                eventEnd.getFullYear(),
                eventEnd.getMonth(),
                eventEnd.getDate()
              )
            )
            const todayDate = new Date()
            const today = new Date(
              Date.UTC(
                todayDate.getFullYear(),
                todayDate.getMonth(),
                todayDate.getDate()
              )
            )
            this.isPastEventEnd = today > eventEndDate
          }
        }
      } catch (e) {
        console.error(
          `Error in pages/apps/_app/event-attendee/index.vue while getting event context:${url}`,
          e
        )
      }
    },
    goBack() {
      this.$router.back()
    },
    onChange() {
      this.fetchEventData()
      this.$emit('change', this.eventTitle)
    },
  },
}
</script>
<style>
#eventAttendeesInEvent .grid-actions-container {
  margin-top: -88px !important;
}
.scan-btn {
  position: fixed;
  text-align: center;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #ccc;
}
.event-list-checkin .v-text-field--outlined fieldset {
  border: none !important;
}
.event-list-checkin .v-input input {
  max-height: 32px;
  font-size: 28px !important;
  font-weight: 500;
  text-transform: capitalize !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  display: block !important;
  overflow: hidden !important;
  max-width: 100%;
}
.event-list-checkin .mdi-menu-down::before {
  content: '\F0140' !important;
  font-size: 26px !important;
  color: #1a73e8 !important;
}
.event-list-checkin .v-input__slot {
  padding: 0 !important;
}
#eventAttendeesInEvent .v-sheet.v-list {
  padding-bottom: 0 !important;
}
@media (max-width: 800px) {
  #eventAttendeesInEvent .sticky.grid-actions-container {
    width: 100% !important;
    display: block;
    margin-top: 20px !important;
    margin-bottom: 4px !important;
    position: static;
    height: 36px !important;
  }
  #eventAttendeesInEvent .grid-actions-menu {
    display: none;
  }
  #eventAttendeesInEvent .grid-search-section {
    display: block !important;
    width: 100% !important;
    margin-left: 5px;
  }
  #eventAttendeesInEvent .grid-search-section .v-input__slot {
    background: #eaeaea !important;
    border-radius: 10px !important;
  }
  #eventAttendeesInEvent .grid-search-input {
    max-width: 100vw !important;
    margin-right: 14px !important;
  }
  #eventAttendeesInEvent .grid-search-input .v-text-field--outlined fieldset {
    border: none !important;
  }
  #eventAttendeesInEvent .grid-search-input .v-text-field .v-input__control {
    border: none !important;
  }
  #eventAttendeesInEvent .v-skeleton-loader {
    max-height: calc(100vh - 260px);
    overflow-y: auto;
  }
}
</style>
