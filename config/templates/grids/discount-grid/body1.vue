<template>
  <div>
    <v-card
      v-for="item in items"
      :key="item.id"
      class="mr-3 mt-3"
      min-width="300"
      max-width="300"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div v-if="item.isActive === true">
            <v-chip
              class="my-2"
              x-small
              color="success"
              outlined
              text-color="success"
            >
              Active
            </v-chip>
          </div>
          <div v-else>
            <v-chip
              class="my-2"
              x-small
              color="primary"
              outlined
              pill
              text-color="primary"
            >
              Inactive
            </v-chip>
          </div>
          <v-list-item-title class="headline mb-1 text-capitalize">{{
            item.codeTitle
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.offerValue }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-actions class="mt-3">
        <v-badge color="primary" content="6">
          Max Use
        </v-badge>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['items'],
}
</script>

<style>
tbody {
  display: flex !important;
  flex-wrap: wrap !important;
  background: #f5f5f5 !important;
}
</style>
