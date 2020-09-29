<template>
  <v-col class="px-0">
    <v-card>
      <v-card-title
        class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
      >
        <h2 class="black--text pt-10 pb-9">Google Drive Setup</h2>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon @click.native="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          To integrate with google drive, you will need to authenticate using
          google drive credentials, click button below to go to google drive
          login site and login with account you want to use for this
          integration.
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.maxFileSize"
                label="Max File Size Allowed (in bytes) *"
                :rules="required"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.fileExtention"
                label="File Extentions Allowed(eg, csv,txt,xls) *"
                :rules="required"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.fileNameRgex"
                label="Filename Regex"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions
        class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
      >
        <v-btn
          color="primary"
          :disabled="!valid"
          depressed
          @click="onSave(formData)"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { required } from '~/utility/rules.js'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    dialog: {
      default: false,
    },
    onClose: {
      required: true,
      type: Function,
    },
    onSave: {
      required: false,
      type: Function,
    },
  },

  data() {
    debugger
    return {
      valid: false,
      required: [required],
      formData: this.item,
    }
  },
}
</script>
