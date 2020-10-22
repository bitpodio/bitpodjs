<template>
  <div>
    <i18n path="Common.LiveDraftEvents" />
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.id"
        cols="12"
        sm="4"
        md="4"
        lg="3"
      >
        <v-card class="elevation-1">
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
            {{ item.Title }}
          </v-card-title>
          <v-card-subtitle>
            {{ item.VenueName }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-actions>
            <v-chip class="ma-1" small>
              <i18n path="Drawer.RecurringEventAction" />
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
                  <v-list-item-title
                    ><i18n path="Drawer.Preview"
                  /></v-list-item-title>
                </v-list-item>
                <v-list-item @click="method">
                  <v-list-item-title
                    ><i18n path="Drawer.Edit"
                  /></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import liveDraftEventsQuery from '~/config/apps/event/gql/live-draft-events.gql'
export default {
  data() {
    return {
      items: [],
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
      result({ data, loading, networkStatus }) {},
      error(error) {
        console.error("We've got an error!", error)
      },
      prefetch: false,
      loadingKey: 'loading',
    },
  },
}
</script>
