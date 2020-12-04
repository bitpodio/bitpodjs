<template>
  <v-list-item v-if="eventLocation === 'Venue'">
    <v-col class="px-0 min-xw180 seatmap-btn">
      <v-switch
        v-model="switch2"
        v-if="eventLocation === 'Venue'"
        :label="$t('Common.SeatmapTickets')"
        class="mt-0 max-h24"
        @change="updateSeatReservation"
      ></v-switch>
    </v-col>
  </v-list-item>
</template>
<script>
import gql from 'graphql-tag'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'

export default {
  data() {
    return {
      switch2: false,
      eventLocation: '',
    }
  },
  methods: {
    updateSeatReservation() {
      this.$eventBus.$emit('update-seat-reservation', this.switch2)
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${event}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
          badgeFilter: {
            where: {
              EventId: this.$route.params.id,
            },
          },
          eventId: this.$route.params.id,
        }
      },
      update(data) {
        if (Object.values(data).length === 0) {
          this.$apollo.queries.data.refresh()
        } else {
          const event = formatGQLResult(data, 'Event')
          this.switch2 =
            event.length && event[0].SeatReservation
              ? event[0].SeatReservation
              : false
          this.eventLocation = event.length ? event[0].LocationType : false
        }
      },
    },
  },
}
</script>
<style scoped>
.min-xw180 {
  min-width: 180px;
}
.max-h24 {
  max-height: 24px;
}
.v-input--selection-controls {
  padding-top: 0px;
}
</style>
