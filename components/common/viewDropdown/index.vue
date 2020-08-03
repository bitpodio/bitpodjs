<template>
  <div>
    <span>{{ viewCaption }}</span>
    <v-menu bottom right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="view in viewList"
          :key="view.value"
          @click="onViewChange(value)"
        >
          <v-list-item-title>{{ view.caption }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
function getContentViews(content) {
  const views = content.views
  const viewList = []
  for (const [viewKey, view] of Object.entries(views)) {
    viewList.push({
      caption: view.title,
      value: viewKey,
    })
  }
  return viewList
}
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      viewList: getContentViews(this.content),
      viewName: 'Registrations',
    }
  },
  computed: {
    viewCaption() {
      const views = this.content.views
      return views[this.viewName] ? views[this.viewName].title : 'Registrations'
    },
  },
  methods: {
    onViewChange(value) {
      this.viewName = value
    },
  },
}
</script>
