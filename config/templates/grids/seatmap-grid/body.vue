<template>
  <v-flex class="greybg">
    <div class="seatmap-inner">
      <div>
        <v-text class="text-h5 mt-4 lh-36"
          ><i18n path="Common.SeatMapNo"
        /></v-text>
      </div>
      <div class="seatmap-subline">
        <v-text class="body-1 font-weight-light"
          ><i18n path="Messages.Warn.SeatmapSubline"
        /></v-text>
      </div>
    </div>
    <v-col class="d-flex flex-wrap greybg pa-0 pt-10 seatmap-inner">
      <v-hover v-slot:default="{ hover }" open-delay="200">
        <nuxt-link :to="seatmapRoute" class="text-decoration-none">
          <v-card
            :elevation="hover ? 1 : 0"
            class="ma-3 ma-md-10 ml-0 mt-0 ml-md-0 mt-md-0 d-flex justify-center align-center"
            height="125"
            max-width="155"
            width="155"
          >
            <v-card-text class="font-weight-medium text-center subtitle-1 pt-2">
              <i class="fa fa-plus fs-36 warning--text"></i>
              <div><i18n path="Common.NewSeatmap" class="body-1" /></div>
            </v-card-text>
          </v-card>
        </nuxt-link>
      </v-hover>
      <v-hover
        v-for="item in items"
        :key="item.id"
        v-slot:default="{ hover }"
        open-delay="200"
      >
        <v-card
          :elevation="hover ? 1 : 0"
          class="ma-3 ma-md-10 ml-0 mt-0 ml-md-0 mt-md-0 seat-maps"
        >
          <nuxt-link :to="seatmapRoutes(item.id)" class="text-decoration-none">
            <v-card-text
              class="font-weight-medium text-center positionRelative subtitle-1 seat-card pb-0"
            >
              <i class="fa fa-grid-alt fs-36 warning--text"></i>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs">
                    <div
                      class="body-1 grey--text text--darken-1 text-truncate"
                      v-on="on"
                    >
                      {{ item.Name }}
                    </div>
                  </span>
                </template>
                <span>{{ item.Name }}</span>
              </v-tooltip>
            </v-card-text>
          </nuxt-link>
          <v-card-actions class="pa-0 ma-0 pb-1">
            <div></div>
            <v-spacer></v-spacer>
            <div class="box-actions pa-1 pb-0">
              <v-menu
                left
                bottom
                :offset-y="offset"
                transition="slide-y-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon small v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list dense>
                  <v-list-item @click="seatmapView(item.id)">
                    <v-list-item-icon class="mr-2">
                      <i class="fa fa-eye mt-1" aria-hidden="true"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><i18n path="Common.MoreInfo"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item :to="seatmapRoutes(item.id)">
                    <v-list-item-icon class="mr-2">
                      <i
                        class="fa fa-pencil-square-o mt-1"
                        aria-hidden="true"
                      ></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><i18n path="Drawer.Edit"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
  </v-flex>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
    offset: { type: Boolean, default: false },
  },
  computed: {
    seatmapRoute() {
      return this.localePath(`/apps/seatmap/new`)
    },
  },
  methods: {
    seatmapRoutes(id) {
      return this.localePath(`/apps/seatmap/${id}`)
    },
    seatmapView(id) {
      this.$router.push(
        this.localePath(`/apps/seatmap/seatmap/seatmap?id=${id}`)
      )
    },
  },
}
</script>

<style scoped>
.seat-maps {
  height: 125px;
  width: 155px;
  max-width: 155px;
}
.seat-card {
  top: 12px;
}
.box-actions {
  bottom: 5px;
  right: 5px;
  display: none;
}
.seat-maps:hover .box-actions {
  display: block;
}
.seatmap-inner {
  max-width: 65%;
  margin: auto;
}
.lh-36 {
  line-height: 36px;
}
.seatmap-subline {
  max-width: 740px;
}
@media (max-width: 600px) {
  .seatmap-inner {
    max-width: 100%;
  }
}
</style>
