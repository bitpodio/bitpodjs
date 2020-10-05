<template>
  <div>
    <!-- <v-dialog
      v-model="isEmailTemplate"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4">Schedule a Task</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="isEmailTemplate = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="Title"
                  label="Title*"
                  :rules="requiredRules"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog> -->
    <v-menu left :offset-y="offset" transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon small v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <!-- <v-list-item @click="dialog">
          <v-list-item-icon class="mr-2">
            <i class="fa fa-paperplane mt-1" aria-hidden="true"></i>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Edit Activity</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item> -->
        <newItem
          :dialog.sync="dialog"
          button-label="Edit Activity"
          :item="item"
        />
        <editTemplate
          v-if="
            item.Category === 'Registration Email' ||
            item.Category === 'Survey Invite'
          "
          button-label="Edit Template"
          :context="context"
          :item="item"
        />
        <!-- </v-list-item> -->
        <!-- <v-list-item @click="editTemplate"> -->
        <!-- <v-btn text small v-bind="attrs" v-on="on" @click="editTemplate">
          <v-icon left>mdi-plus</v-icon> EDIT TEMPLATE
        </v-btn> -->
        <!-- <v-list-item-icon class="mr-2">
            <i class="fa fa-clone mt-1" aria-hidden="true"></i>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>EDIT TEMPLATE</v-list-item-title>
          </v-list-item-content> -->
        <!-- </v-list-item> -->
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import newItem from './actions/grid/new-item.vue'
import editTemplate from './edit-template.vue'
export default {
  components: {
    newItem,
    editTemplate,
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
  },
  data() {
    return {
      isEditActivity: false,
      isEmailTemplate: false,
      Title: '',
      dialog: false,
    }
  },
  methods: {
    editActivity() {
      // debugger
      this.dialog = true
    },
    editTemplate() {
      this.isEmailTemplate = true
    },
  },
}
</script>
