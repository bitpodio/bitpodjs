<template>
  <div>
    <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn icon small v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template> -->

    <newItem
      :dialog.sync="dialog"
      button-label="Edit"
      button-icon="fa fa-pencil-square-o"
      :items="items"
      :refresh="refresh"
    />
  </div>
</template>
<script>
import newItem from '../grid/new-item.vue'
export default {
  components: {
    newItem,
  },
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
    items: {
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
      dialog: false,
    }
  },
}
</script>
