<template>
  <div>
    <div class="col-sm-6">
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
  </div>
</template>
<script>
import Grid from '~/components/common/grid'
import { configLoaderMixin } from '~/utility'
import Lookup from '~/components/common/form/lookup.vue'
import eventList from '~/config/apps/event/gql/eventNames.gql'
export default {
  layout: 'event',
  components: {
    Grid,
    Lookup,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      eventTitle: this.$route.query.eventId,
      eventId: '',
      isGrid: false,
      eventProps: {
        type: 'lookup',
        dataSource: {
          query: eventList,
          itemText: 'Title',
          itemValue: 'id',
          filter(data) {
            return {}
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
  methods: {
    // changeEvent(value) {
    //   this.isGrid = true
    // },
  },
}
</script>
