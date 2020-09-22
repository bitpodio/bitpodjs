<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="eventBriteDialog"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dense flat dark fixed color="accent">
            <v-toolbar-title class="body-1">Event Brite</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click.native="eventBriteDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col>
                <v-checkbox
                  label=" SEO elements are auto derived from event elements when event is created or edited. Check this if you want to Turn off auto update"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :rules="nameRules"
                  label="Part which goes into URL"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Meta Description" outlined> </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Meta Keywords" outlined> </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pl-4">
            <v-btn
              color="primary"
              :disabled="!valid"
              depressed
              @click.native="onSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  props: {
    eventBriteDialog: {
      default: false,
    },
  },
}
</script>
