<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="3">
          <v-card class="elevation-0">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              lazy-src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              aspect-ratio="1"
              class="tile-img"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div class="text--secondary px-4 pt-4 mb-n4">
              Mon, Aug 10, 2020 6:15 PM
            </div>
            <v-card-title>
              Test Automation Task
            </v-card-title>
            <v-card-subtitle>
              Pune India
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-actions>
              <v-chip class="ma-1" small>
                Recurring event
              </v-chip>

              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon small v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="method">
                    <v-list-item-title>Preview</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="method">
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4" md="4" lg="3">
          <v-card class="elevation-0">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              lazy-src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              aspect-ratio="1"
              class="tile-img"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div class="text--secondary px-4 pt-4 mb-n4">
              Mon, Aug 10, 2020 6:15 PM
            </div>
            <v-card-title>
              Test Automation Task
            </v-card-title>

            <v-card-subtitle>
              Pune India
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-actions>
              <v-chip class="ma-1" small>
                Recurring event
              </v-chip>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon small v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="method">
                    <v-list-item-title>Preview</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="method">
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4" md="4" lg="3">
          <v-card class="elevation-0">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              lazy-src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              aspect-ratio="1"
              class="tile-img"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div class="text--secondary px-4 pt-4 mb-n4">
              Mon, Aug 10, 2020 6:15 PM
            </div>
            <v-card-title>
              Test Automation Task
            </v-card-title>

            <v-card-subtitle>
              Pune India
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-actions>
              <v-chip class="ma-1" small>
                Online event
              </v-chip>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon small v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="method">
                    <v-list-item-title>Preview</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="method">
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="4"
          md="4"
          lg="3"
        >
          <v-card class="elevation-0">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              lazy-src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              aspect-ratio="1"
              class="tile-img"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div class="text--secondary px-4 pt-4 mb-n4">
              Mon, Aug 10, 2020 6:15 PM
              <!-- {{ item.StartDate }} -->
            </div>
            <v-card-title class="text-truncate d-block">
              {{ item.Title }}
            </v-card-title>
            <v-card-subtitle class="event-venue">
              {{ item.VenueName }}
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-actions>
              <v-chip class="ma-1" small>
                Recurring event
              </v-chip>

              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon small v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="method">
                    <v-list-item-title>Preview</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="method">
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import liveDraftEventsQuery from '~/config/apps/event/gql/live-draft-events.gql'
export default {
  data() {
    return {
      items: [],
      show: false,
    }
  },
  apollo: {
    items: {
      query() {
        return gql`
          ${liveDraftEventsQuery}
        `
      },
      variables() {
        // Use vue reactive properties here
        const where = {}
        const skip = 0
        const limit = 10
        return {
          filters: { limit, skip, where },
          where,
        }
      },
      update(data) {
        const modelName = 'Event'
        const { edges } = data[modelName][`${modelName}Find`]
        return edges.map(({ node }) => node)
      },
      // Optional result hook
      result({ data, loading, networkStatus }) {
        console.log('We got some result!')
      },
      error(error) {
        console.error("We've got an error!", error)
      },
      prefetch: false,
      loadingKey: 'loading',
      // pollInterval:0
    },
  },
}
</script>

<style scoped>
.tile-img {
  height: 200px;
}
.event-venue {
  min-height: 38px;
}
@media (max-width: 1440px) {
  .tile-img {
    height: 150px;
  }
}
</style>
