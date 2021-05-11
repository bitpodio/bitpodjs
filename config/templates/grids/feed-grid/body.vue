<template>
  <div class="greybg">
    <v-card
      v-for="item in items"
      :key="item.id"
      max-width="600"
      class="mb-4 mr-4"
    >
      <v-list subheader two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar size="48" color="primary">
              <span class="white--text Twitter">{{ item.createdBy }}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.createdBy }}</v-list-item-title>

            <v-list-item-subtitle> {{ item.createdDate }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div class="mx-4 mb-2">
        <div class="mt-n2 mb-2">{{ item.Title }}</div>
        <div class="mb-2">{{ item.Body }}</div>
      </div>
    </v-card>
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
    getRandomColor(createdBy) {
      return window.GeoPattern.generate(createdBy).color
    },
  },
}
</script>
