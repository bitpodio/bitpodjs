<template>
  <div>
    <v-list>
      <v-list-item v-for="item in items" :key="item.id" class="px-0">
        <v-list-item-avatar size="48" class="mr-2 ma-0">
          <v-avatar
            color="primary"
            size="36"
            v-bind="attrs"
            class="mr-"
            v-on="on"
          >
            <v-avatar color="primary" size="36" v-bind="attrs" v-on="on">
              <span class="white--text Twitter">{{ item.FullName }}</span>
            </v-avatar>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content class="py-0">
          <v-list-item-title v-text="item.FullName"></v-list-item-title>
          <v-list-item-subtitle v-text="item.Email"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon class="ma-0 mt-2">
          <v-btn icon disabled>
            <v-icon>mdi-message-outline</v-icon>
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
    formatDateDay(date) {
      return date ? format(new Date(date), 'L') : ''
    },
    formatDateMonth(date) {
      return date ? format(new Date(date), 'LLL') : ''
    },
  },
}
</script>
