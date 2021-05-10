<template>
  <div class="greybg">
    <v-row class="ma-0">
      <v-card
        v-for="item in items"
        :key="item.id"
        class="text-center mx-auto ma-sm-8 ml-sm-0 mt-sm-0 member-tile elevation-0 positionRelative"
      >
        <v-card-text>
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
            v-if="item._VenueAddress && item._VenueAddress.City"
            class="text--secondary pa-2 pb-0 pt-0 body-2 text-truncate d-block pl-0"
          >
            <i class="fa fa-location" aria-hidden="true"></i>
            {{
              formatAddressField(item._VenueAddress && item._VenueAddress.City)
            }}
          </div>
        </v-card-text>
        <v-card-actions>
          <div
            class="text--secondary mt-1 pa-2 pb-0 pt-0 body-2 text-truncate d-block pl-0"
          >
            <i class="fa fa-clock" aria-hidden="true"></i>
            {{ formatDate(item.createdDate) }}
          </div>
          <v-spacer></v-spacer>
        </v-card-actions>
        <div class="positionAbsolute member-status">
          <v-chip class="ma-2" small outlined color="primary">
            Active
          </v-chip>
        </div>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
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
  },
}
</script>
<style scoped>
.member-tile {
  min-width: 230px;
  max-width: 230px;
}
.member-status {
  top: 0;
  left: 0;
}
</style>
