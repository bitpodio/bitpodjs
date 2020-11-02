<template>
  <div>
    <v-menu
      right
      :offset-x="offset"
      transition="slide-y-transition"
      content-class="overflowHidden"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon small v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item v-if="!item.LayoutId" @click="newSeatMap">
          <v-list-item-icon class="mr-2">
            <i class="fa-plus mt-1" aria-hidden="true"></i>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><i18n path="Common.NewSeatMap" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!item.LayoutId" @click="existingSeatMap">
          <v-list-item-icon class="mr-2">
            <i class="fa-grid-alt mt-1" aria-hidden="true"></i>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><i18n path="Common.ExistingSeatMap" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="item.LayoutId" @click="editSeatMap">
          <v-list-item-icon class="mr-2">
            <i class="fa-pencil mt-1" aria-hidden="true"></i>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><i18n path="Common.EditSeatMap" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="item.LayoutId" @click="popupDialog = true">
          <v-list-item-icon class="mr-2">
            <i class="fa-trash mt-1" aria-hidden="true"></i>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><i18n path="Drawer.Delete" /></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="popupDialog" width="500">
      <v-card>
        <v-card-text class="pt-3">
          <i18n path="Common.DeleteLayout" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" small dark dense @click="deleteSeatMap">
            <i18n path="Drawer.OK" />
          </v-btn>
          <v-btn
            color="primary"
            small
            outlined
            dense
            @click="popupDialog = false"
          >
            <i18n path="Drawer.Cancel" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="toast py-2 pr-1 pl-3">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <selectExistingSeatMap
      :select-existing-seat-map.sync="selectExistingSeatMap"
      :layout-id="item.id"
    />
  </div>
</template>

<script>
import selectExistingSeatMap from '~/pages/apps/_app/event/_id/selectExistingSeatMap.vue'
export default {
  components: {
    selectExistingSeatMap,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      popupDialog: false,
      snackbar: false,
      timeout: 1000,
      snackbarText: '',
      selectExistingSeatMap: false,
    }
  },
  methods: {
    newSeatMap() {
      this.$router.push(`/apps/seatmap/new?location=${this.item.id}`)
    },
    editSeatMap() {
      this.$router.push(`/apps/seatmap/${this.item.LayoutId}`)
    },
    existingSeatMap() {
      this.selectExistingSeatMap = true
    },
    async deleteSeatMap() {
      const URL = `${this.$bitpod.getApiUrl()}Locations/${this.item.id}`
      try {
        const res = await this.$axios.$patch(URL, { LayoutId: '' })
        if (res) {
          this.popupDialog = false
          this.snackbarText = 'Seat Layout deleted successfully'
          this.snackbar = true
          this.refresh()
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateEvent context: EventId:-${this.$route.params.id} \n URL:- ${URL} `,
          e
        )
      }
    },
  },
}
</script>
