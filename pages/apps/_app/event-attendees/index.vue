<template>
  <div class="mx-n3 mx-sm-0">
    <div class="col-sm-5 px-5 pl-sm-0 event-list-checkin">
      <Lookup v-model="eventTitle" :field="eventProps" />
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
    <Scanner class="scan-btn pt-2" />
  </div>
</template>
<script>
import Grid from '~/components/common/grid'
import Scanner from '~/components/common/scanner'
import { configLoaderMixin } from '~/utility'
import Lookup from '~/components/common/form/lookup.vue'
import eventQuery from '~/config/apps/event/gql/eventNames.gql'
export default {
  layout: 'event',
  components: {
    Grid,
    Lookup,
    Scanner,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      eventList: [],
      eventTitle: this.$route.query.eventId,
      eventId: '',
      isGrid: false,
      eventProps: {
        type: 'lookup',
        dataSource: {
          query: eventQuery,
          itemText: 'Title',
          itemValue: 'id',
          filter(data) {
            return {
              or: [
                {
                  EndDate: {
                    gte: new Date(),
                  },
                },
                {
                  EndDate: {
                    exists: false,
                  },
                },
                {
                  EndDate: null,
                },
                {
                  StartDate: {
                    gte: new Date(),
                  },
                },
                {
                  StartDate: null,
                },
              ],
            }
          },
        },
      },
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
    max-height: calc(100vh - 250px);
    overflow-y: auto;
  }
}
</style>
