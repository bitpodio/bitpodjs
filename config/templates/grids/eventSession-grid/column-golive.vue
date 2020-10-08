<template>
  <div>
    <a v-if="isOnlineEvent()" :href="route" target="_blank">
      <v-btn class="primary" small>Start session</v-btn>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  computed: {
    route() {
      const sdate = new Date(this.item.StartDate || null)
        .toDateString()
        .split(' ')
        .join('-')
      const title = this.item.Name.split(' ').join('-')
      return `/apps/event/live/${sdate}-${title || 'untitled'}?e=${
        this.$route.params.id
      }`
    },
  },
  methods: {
    isOnlineEvent() {
      const location = this.$parent.$parent.$parent.$parent.$parent.$parent
        .$data.eventData
      return !!(location && location.LocationType === 'Online event')
    },
  },
}
</script>
