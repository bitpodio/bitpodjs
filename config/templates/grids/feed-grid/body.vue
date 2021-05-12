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

            <v-list-item-subtitle>
              <timeAgo :date="item.createdDate"
            /></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action> </v-list-item-action>
        </v-list-item>
      </v-list>
      <div class="mx-4 mb-2">
        <div>
          <div class="mt-n2 mb-2">{{ item.Title }}</div>
          <div class="mb-2">{{ item.Body }}</div>
        </div>
        <div>
          <v-btn :id="item.id" text>
            <v-icon left>
              mdi-thumb-up
            </v-icon>
            Like
          </v-btn>
        </div>
        <div>
          <Notes model-name="Feeds" :feed-id="item.id" />
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import timeAgo from '~/components/common/timeAgo'
import Notes from '~/components/common/notes'
export default {
  components: {
    timeAgo,
    Notes,
  },
  props: {
    items: { type: Array, default: () => [] },
    offset: { type: Boolean, default: false },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      like: false,
    }
  },
  methods: {
    getRandomColor(createdBy) {
      return window.GeoPattern.generate(createdBy).color
    },
    // getLikes(item) {
    //   debugger
    //   const userId = this.$auth.user.data.email
    //   return item.Likes.includes(userId) ? 'primary' : ''
    // },
    // feedLike(id) {
    //   const url = `${this.$bitpod.getApiUrl()}`
    // },
    getLike(id) {
      debugger
      // return (this.like = !this.like)
      if (this.like === true) {
        this.like = false
      } else {
        this.like = true
      }
    },
  },
}
</script>
