<template>
  <div>
    <v-list>
      <v-list-item v-for="item in items" :key="item.id" class="px-1">
        <v-list-item-avatar tile size="48">
          <v-avatar
            size="48"
            tile
            v-bind="attrs"
            :style="{
              'background-color': getRandomColor(item.Name),
            }"
            v-on="on"
          >
            <div class="d-flex flex-column">
              <div class="white--text text-h6 pt-0">
                {{ formatDateDay(item.StartDate) }}
              </div>
              <div class="white--text body-2 mt-n1">
                {{ formatDateMonth(item.StartDate) }}
              </div>
            </div>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize"
            v-text="item.Name"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-text="formatDate(item.StartDate)"
          ></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn class="ma-2" outlined color="success">
            <i18n path="Common.Join" />
            <v-icon right>
              mdi-video
            </v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import format from 'date-fns/format'
export default {
  props: {
    items: { type: Array, default: () => [] },
  },
  data() {
    return {
      Type: 'value',
    }
  },
  methods: {
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatDateDay(date) {
      return date ? format(new Date(date), 'd') : ''
    },
    formatDateMonth(date) {
      return date ? format(new Date(date), 'LLL') : ''
    },
    getRandomColor(name) {
      return window.GeoPattern.generate(name).color
    },
  },
}
</script>
