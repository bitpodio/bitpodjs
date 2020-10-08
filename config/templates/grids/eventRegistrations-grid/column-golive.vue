<template>
  <div>
    <a v-if="isOnlineEvent()" :href="route" target="_blank">
      <v-btn class="primary" small>Start Sessions</v-btn>
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
      return `/apps/event/live/${this.item.FirstName || 'unknown'}-${
        this.item.LastName || 'user'
      }-${this.item.RegistrationId || 'room123'}?e=${this.$route.params.id}`
    },
  },
  methods: {
    isOnlineEvent() {
      const sessionList = this.$parent.$parent.$parent.$parent.$parent.$parent
        .$refs.recurringGrid._data.tableData.items
      return !!(
        sessionList.length && sessionList[0].LocationType === 'Online meeting'
      )
    },
  },
}
</script>
