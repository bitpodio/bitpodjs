<template>
  <div>
    Title {{ data.event.Email }} Category {{ data.badge.Category }}
    <div>Registration</div>
    <Grid view-name="registrationSessions" content-name="Registrations" />
  </div>
</template>
<script>
import gql from 'graphql-tag'
import Grid from '~/components/common/grid'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
export default {
  components: {
    Grid,
  },
  data() {
    return {
      loading: 0,
      data: {
        event: {},
        badge: {},
      },
    }
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
        }
      },
      update(data) {
        const event = formatGQLResult(data, 'Event')
        const badge = formatGQLResult(data, 'Badge')
        return {
          event: event.length > 0 ? event[0] : {},
          badge: badge.length > 0 ? badge[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>
