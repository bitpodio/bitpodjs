<template>
  <v-col class="px-0">
    <v-card>
      <v-card-title
        class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
      >
        <h2 class="black--text pt-5 pb-3 text-h5">
          <i18n path="Common.EditSetting" />
        </h2>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon @click.native="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
          id="new-bitpodsurvey-form"
          @submit.prevent="onSave(formData)"
        >
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model="formData.ConnectionURL"
                :label="$t('Common.ConnectionUrl')"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text
                class="mb-2 primary--text cursorPointer"
                @click="additionalSetting"
                ><i18n path="Common.AdditionalSetting"
              /></v-text>
              <v-text-field
                v-if="showField"
                v-model="formData.InvitationDBURL"
                :label="$t('Common.InvitationDbUrl')"
                outlined
                dense
                class="mt-4"
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
          depressed
          type="submit"
          form="new-bitpodsurvey-form"
          ><i18n path="Drawer.Save"
        /></v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    dialog: {
      default: false,
      type: Boolean,
    },
    onClose: {
      required: true,
      type: Function,
    },
    onSave: {
      required: false,
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      formData: { ...this.item },
      showField: false,
      lazy: false,
    }
  },
  methods: {
    additionalSetting() {
      this.showField = true
    },
  },
}
</script>
