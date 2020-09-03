<template>
  <v-flex>
    <v-col class="d-flex flex-wrap greybg pa-0">
      <v-hover v-slot:default="{ hover }" open-delay="200">
        <v-card
          :elevation="hover ? 1 : 0"
          class="ma-3 ml-0 mt-0 d-flex justify-center align-center"
          height="125"
          max-width="155"
          width="155"
        >
          <v-card-text class="font-weight-medium text-center subtitle-1">
            <i class="fa fa-plus fs-36 warning--text"></i>
            <div class="body-1">New Seatmap</div>
          </v-card-text>
        </v-card>
      </v-hover>
      <v-hover
        v-for="item in items"
        :key="item.id"
        v-slot:default="{ hover }"
        open-delay="200"
      >
        <v-card
          :elevation="hover ? 1 : 0"
          class="ma-3 ml-0 mt-0 d-flex justify-center align-center seat-maps"
        >
          <v-card-text class="font-weight-medium text-center subtitle-1">
            <i class="fa fa-grid-alt fs-36 warning--text"></i>
            <div class="body-1">{{ item.Name }}</div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-flex>
</template>

<script>
export default {
  props: ['items'],
}
</script>

<style scoped>
.seat-maps {
  height: 125px;
  width: 155px;
  max-width: 155px;
}
</style>
