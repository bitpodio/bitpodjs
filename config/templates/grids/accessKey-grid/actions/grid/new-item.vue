<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="onNew">
          <v-icon left>mdi-plus</v-icon> <i18n path="Common.New" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.CreateAccessKey" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form
            id="new-accessKey-form"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            @submit.prevent="onSave"
          >
            <v-row>
              <v-col cols="12" sm="10" md="8" class="pb-0">
                <v-datetime-picker
                  v-model="accessKeyDate"
                  :label="$t('Common.ExpiresOn')"
                  :text-field-props="startDateTextFieldProps"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
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
            form="new-accessKey-form"
            ><i18n path="Drawer.Save"
          /></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { postGaData } from '~/utility/index.js'

export default {
  props: {
    refresh: {
      type: Function,
      default: () => false,
    },
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      accessKeyDate: '',
      formData: {},
      dialog: false,
      value: '',
      valid: false,
      snackbar: false,
      snackbarText: '',
      timeout: 3000,
    }
  },
  computed: {
    startDateTextFieldProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const scheduledDate = v && new Date(v)
            if (scheduledDate && scheduledDate > this.formData.EndDate) {
              this.valid = false
              return 'Ticket start date should be less than Ticket end date'
            } else {
              this.valid = true
              return true
            }
          },
        ],
      }
    },
  },
  methods: {
    onNew() {
      this.dialog = true
      postGaData('New', this.$t('Common.CreateAccessKey'))
    },
    onReset() {
      this.$refs.form.reset()
    },
    onClose() {
      this.$refs.form.reset()
      this.dialog = false
      postGaData('Close', this.$t('Common.CreateAccessKey'))
    },
    async onSave() {
      postGaData(this.$t('Drawer.Save'), this.$t('Common.CreateAccessKey'))
      if (this.valid) {
        const url = this.$bitpod.getApiUrl()
        this.formData.expiresat = this.accessKeyDate
        const userId = this.$auth.$state.user.data.email
        try {
          const res = await this.$axios.$post(
            `${url}Users/${userId}/Accesskey`,
            this.formData
          )
          if (res) {
            this.dialog = false
            this.onReset()
            this.snackbarText = this.$t('Messages.Success.RecordCreateSuccess')
            this.snackbar = true
            this.refresh()
          }
        } catch (e) {
          console.log(
            `Error in templates/grids/accessKey-grid/actions/grid/new-item.vue while making a POST call to Users model from method onSave context:-URL:-${url}\nformData:-${this.formData} `,
            e
          )
        }
      }
    },
  },
}
</script>
<style scoped>
.v-picker {
  border-radius: 0;
}
</style>
