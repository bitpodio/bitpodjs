<template>
  <tr>
    <td>
      <div class="event-attendee-list">
        <div>
          <v-list subheader two-line class="px-0">
            <v-list-item class="px-0">
              <v-list-item-avatar size="36">
                <v-avatar
                  size="36"
                  :style="{
                    'background-color': getRandomColor(item.FullName),
                  }"
                >
                  <span class="white--text Twitter-18">{{
                    item.FullName
                  }}</span>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  :class="item.CheckIn ? 'green--text' : ''"
                  class="text-capitalize"
                  >{{ item.FullName }}</v-list-item-title
                >

                <v-list-item-subtitle>
                  {{ item.Email }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <div class="min-w-checkin">
                  <ColumnCheckin
                    :item="item"
                    :context="context"
                    :refresh="refresh"
                    :is-custom-mobile="true"
                  />
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </td>
  </tr>
</template>
<script>
import ColumnCheckin from './column-checkin.vue'
export default {
  components: {
    ColumnCheckin,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    select: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    getRandomColor(Name) {
      return window.GeoPattern.generate(Name).color
    },
  },
}
</script>
<style scoped>
.min-w-checkin {
  min-width: 88px;
}
.fs-larger {
  font-size: 1.25rem;
}
</style>
