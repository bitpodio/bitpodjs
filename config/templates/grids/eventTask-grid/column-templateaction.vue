<template>
  <div>
    <v-menu
      left
      :offset-y="offset"
      transition="slide-y-transition"
      content-class="overflowHidden"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon small v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <newItem
          :key="updateCount"
          :dialog.sync="dialog"
          button-label="Edit Activity"
          button-icon="fa fa-pencil-square-o"
          :item="item"
          :refresh="refresh"
        />
        <editTemplate
          v-if="item.Category === 'Registration Email'"
          button-label="Edit Template"
          button-icon="fa fa-pencil-square-o"
          :context="context"
          :item="item"
        />
        <editSurveytemplate
          v-if="item.Category === 'Survey Invite'"
          button-label="Edit Template"
          button-icon="fa fa-pencil-square-o"
          :context="context"
          :item="item"
        />
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import newItem from './actions/grid/new-item.vue'
import editTemplate from './edit-template.vue'
import editSurveytemplate from './edit-surveytemplate.vue'
export default {
  components: {
    newItem,
    editTemplate,
    editSurveytemplate,
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
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      // isEditActivity: false,
      // isEmailTemplate: false,
      // Title: '',
      updateCount: 1,
      dialog: false,
    }
  },
  // methods: {
  //   editActivity() {
  //     this.dialog = true
  //   },
  //   editTemplate() {
  //     this.isEmailTemplate = true
  //   },
  // },
}
</script>
<style scoped>
.overflowHidden {
  overflow: hidden !important;
}
</style>
