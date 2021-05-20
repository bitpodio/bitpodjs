<template>
  <div class="greybg">
    <v-row class="ma-0">
      <v-card
        v-for="item in items"
        :key="item.id"
        class="text-center mx-auto ma-sm-8 ml-sm-0 mt-sm-0 member-tile elevation-0 positionRelative"
      >
        <nuxt-link :to="route(item.id)" class="text-decoration-none">
          <v-card-text class="member-card">
            <div>
              <v-avatar
                size="62"
                :style="{
                  'background-color': getRandomColor(item.CustomerName),
                }"
              >
                <span class="white--text Twitter">{{ item.CustomerName }}</span>
              </v-avatar>
            </div>
            <v-card-title
              class="justify-center text-truncate d-block pt-2 pb-2 text-capitalize"
            >
              {{ item.CustomerName }}
            </v-card-title>

            <v-card-subtitle
              class="justify-center text-truncate d-block pt-2 pb-2"
            >
              {{ item.CustomerId }}
            </v-card-subtitle>

            <div
              v-if="item._BillingAddress && item._BillingAddress.City"
              class="text--secondary pa-2 pb-0 pt-0 body-2 text-truncate d-block pl-0"
            >
              <i class="fa fa-location" aria-hidden="true"></i>
              {{
                formatAddressField(
                  item._BillingAddress && item._BillingAddress.City
                )
              }}
            </div>
          </v-card-text>
          <v-card-actions>
            <div
              class="text--secondary mt-1 pa-2 pb-0 pt-0 body-2 text-truncate d-block pl-0"
            >
              <timeAgo :date="item.createdDate" />
            </div>
            <v-spacer></v-spacer>
            <v-chip
              v-if="item.Rating"
              class="ma-2 mr-0 mb-0 white--text"
              small
              :color="getRandomColor(item.Rating)"
            >
              {{ item.Rating }}
            </v-chip>
          </v-card-actions>
        </nuxt-link>
      </v-card>
    </v-row>
  </div>
</template>
<script>
import timeAgo from '~/components/common/timeAgo'
export default {
  components: {
    timeAgo,
  },
  props: {
    items: { type: Array, default: () => [] },
    offset: { type: Boolean, default: false },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  methods: {
    getRandomColor(CustomerName) {
      return window.GeoPattern.generate(CustomerName).color
    },
    formatAddressField(fieldValue) {
      return fieldValue || ' '
    },
    formatDate(date) {
      return date ? this.$d(new Date(date), 'short', this.$i18n.locale) : '-'
    },
    route(id) {
      return this.localePath(`/apps/member/member/${id}`)
    },
  },
}
</script>
<style scoped>
.member-tile {
  min-width: 230px;
  max-width: 230px;
}
.member-card {
  min-height: 185px !important;
}
</style>
