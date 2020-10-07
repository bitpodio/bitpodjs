<template>
  <div class="d-flex">
    <div class="fs-18 min-h36">{{ viewCaption }}</div>
    <v-menu offset-y transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon class="fs-30">mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="view in viewList" :key="view.value" @click="true">
          <NuxtLink :to="view.path" class="text-decoration-none text--primary">
            {{ view.caption }}
          </NuxtLink>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
function getViewPath(viewKey, view, contentName) {
  const { type = 'list' } = view
  let path = ''
  switch (type) {
    case 'path':
      path = view.path
      break
    case 'card':
    case 'list':
      path = `${viewKey}`
      break
  }
  return path
}

function getContentViews(content, contentName) {
  const views = content.views
  const viewList = []
  for (const [viewKey, view] of Object.entries(views)) {
    if (view.hidden !== true) {
      viewList.push({
        caption: view.title,
        value: viewKey,
        path: getViewPath(viewKey, view, contentName),
      })
    }
  }
  return viewList
}
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    contentName: {
      type: String,
      required: true,
    },
    viewName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      viewList: getContentViews(this.content, this.contentName),
    }
  },
  computed: {
    viewCaption() {
      const views = this.content.views
      return views[this.viewName] ? views[this.viewName].title : ''
    },
  },
  methods: {
    onViewChange(value) {
      this.viewName = value
    },
  },
}
</script>

<style scoped>
.min-h36 {
  min-height: 36px;
  line-height: 36px;
}
</style>
