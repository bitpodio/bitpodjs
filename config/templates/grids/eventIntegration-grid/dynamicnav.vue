<template>
  <v-col class="px-0">
    <v-card>
      <v-card-title
        class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
      >
        <h2 class="black--text pt-10 pb-9">Edit Setting</h2>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon @click.native="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.AccessKey"
                label="Access Key *"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.RefreshToken"
                label="Refresh Token *"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.URL"
                label="URL *"
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
        <v-btn color="primary" depressed @click="onSave(formData)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
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
    // formData: {
    //   type: Object,
    //   default: () => {},
    //   required: false,
    // },
  },

  data() {
    return {
      formData: {
        AccessKey: '',
        RefreshToken: '',
        URL: '',
      },
    }
  },
}
</script>
