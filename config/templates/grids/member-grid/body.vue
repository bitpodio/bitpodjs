<template>
  <div class="greybg">
    <v-row class="ma-0">
      <v-card
        v-for="item in items"
        :key="item.id"
        class="text-center ma-8 ml-0 mt-0 member-tile"
      >
        <v-card-text>
          <div>
            <v-avatar color="primary" size="62">
              <span class="white--text Twitter">{{ item.CustomerName }}</span>
            </v-avatar>
          </div>
          <v-card-title class="justify-center">
            {{ item.CustomerName }}
          </v-card-title>

          <v-card-subtitle class="justify-center">
            {{ item.CustomerName }}
          </v-card-subtitle>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn text color="deep-purple accent-4">
            {{ item.createdBy }}
          </v-btn>
        </v-card-actions>
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
}
</script>
<style scoped>
.member-tile {
  min-width: 300px;
  max-width: 300px;
}
</style>
