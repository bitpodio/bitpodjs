<template>
  <div>
    <v-list-item v-if="isHiddenAction('new')">
      <component
        :is="newItem || null"
        v-if="isHiddenAction('new')"
        :content="content"
        :view-name="viewName"
        :on-new-item-save="onNewItemSave"
        :refresh="refresh"
        :context="context"
      />
    </v-list-item>
  </div>
</template>
<script>
import { templateLoaderMixin } from '~/utility'
import { gridActionMixin } from '~/utility/form'

export default {
  mixins: [templateLoaderMixin, gridActionMixin],
  props: {
    content: {
      type: null,
      default: null,
    },
    viewName: {
      type: String,
      required: true,
    },
    onNewItemSave: {
      type: Function,
      default: () => {},
    },
    refresh: {
      type: null,
      default: null,
    },
    context: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      newItem: null,
    }
  },
  computed: {
    _components() {
      return {
        newItem: {
          locations: [
            `templates/grids/${this.templateFolderName}/actions/grid/new-item.vue`,
            `common/templates/grid/actions/grid/new-item.vue`,
          ],
        },
      }
    },
  },
  mounted() {
    this.$emit('hasGridOption', true)
  },
  methods: {},
}
</script>
