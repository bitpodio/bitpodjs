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
          <v-btn icon @click.native="onClose($t('Common.EditSetting'))">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
        <v-form
          id="new-paytmbusiness-form"
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
          @submit.prevent="onSave(formData, $t('Common.EditSetting'))"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.URL"
                :label="$t('Common.ApiUrl')"
                :rules="[rules.required]"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.AccessKey"
                :label="$t('Common.MerchantKey')"
                :rules="[rules.required]"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.Token"
                :label="$t('Common.MerchantId')"
                :rules="[rules.required]"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.Website"
                :label="$t('Common.Website')"
                :rules="[rules.required]"
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
          type="submit"
          form="new-paytmbusiness-form"
          ><i18n path="Drawer.Save"
        /></v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { rules } from '~/utility/rules.js'
import { postGaData } from '~/utility/index.js'
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
      valid: false,
      rules: rules(this.$i18n),
      lazy: false,
      formData: { ...this.item },
    }
  },
  watch: {
    valid(newVal) {
      if (newVal) {
        postGaData('New', this.$t('Common.EditSetting'))
      }
    },
  },
}
</script>
