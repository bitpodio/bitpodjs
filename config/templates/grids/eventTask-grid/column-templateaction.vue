<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
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
          :button-label="$t('Common.EditActivity')"
          button-icon="fa fa-pencil-square-o"
          :item="item"
          :refresh="refresh"
          @update-snackbar="updateSnackbar"
        />
        <editTemplate
          v-if="item.Category === 'Registration Email'"
          :button-label="$t('Common.EditTemplate')"
          button-icon="fa fa-pencil-square-o"
          :context="context"
          :item="item"
          @update-snackbar="updateSnackbar"
        />
        <editSurveytemplate
          v-if="item.Category === 'Survey Invite'"
          :button-label="$t('Common.EditTemplate')"
          button-icon="fa fa-pencil-square-o"
          :context="context"
          :item="item"
          @update-snackbar="updateSnackbar"
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
      updateCount: 1,
      dialog: false,
      snackbar: false,
      timeout: '2000',
      snackbarText: '',
    }
  },
  methods: {
    updateSnackbar(message) {
      this.snackbar = true
      this.snackbarText = message
    },
  },
}
</script>
<style scoped>
.overflowHidden {
  overflow: hidden !important;
}
</style>
