<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="dialog = true">
          <v-icon left>mdi-plus</v-icon>
          <i18n path="Common.AddExistingContact" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.AddExistingContact" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-container v-if="setContent()" class="pt-0 px-4 pb-8 inviteeDialog">
          <Grid
            view-name="allContacts"
            :content="setContent()"
            class="mt-n12"
          />
        </v-container>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import Grid from '~/components/common/grid'
export default {
  components: {
    Grid,
  },
  props: {
    refresh: {
      type: Function,
      default: () => false,
    },
  },

  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Contacts : null
    },
  },
  methods: {
    setContent() {
      return this.contents ? this.contents.Contacts : null
    },
    onClose() {
      this.dialog = false
    },
  },
}
</script>
