<template>
  <div class="pb-7 greybg template-tabs">
    <v-tabs v-model="activeTab" height="36">
      <v-tab
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.route"
        class="px-0 mr-4"
      >
        <v-icon left class="fs-18">{{ tab.icon }}</v-icon
        >{{ tab.name }}
      </v-tab>
    </v-tabs>
  </div>
</template>
<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeTab: `/apps/admin/list/marketingtemplates/template`,
      tabs: [
        {
          id: 1,
          name: 'Email',
          icon: 'fa fa-file',
          route: `/apps/admin/list/marketingtemplates/template`,
        },
        {
          id: 2,
          name: 'Badge',
          icon: 'fa fa-id-badge',
          route: `/apps/admin/list/badge/badge`,
        },
        {
          id: 3,
          name: 'Ticket',
          icon: 'fa fa-ticket',
          route: `/apps/admin/list/printedtickets/printed-tickets`,
        },
      ],
    }
  },
}
</script>
<style>
.template-tabs .theme--light.v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}
</style>
