<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="dialog = true">
          <v-icon left>mdi-plus</v-icon> New
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start font-weight-regular"
        >
          <h2 class="black--text font-weight-regular pt-10 pb-9">
            Create Access Key
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" sm="10" md="8" class="pb-0">
                <v-datetime-picker
                  v-model="accessKeyDate"
                  label="Expires On"
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
          <v-btn color="primary" depressed @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { getApiUrl } from '~/utility'
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
    onReset() {
      this.$refs.form.reset()
    },
    onClose() {
      this.$refs.form.reset()
      this.dialog = false
    },
    async onSave() {
      const url = getApiUrl()
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
          this.refresh()
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/accessKey-grid/actions/grid/new-item.vue while making a POST call to Users model from method onSave context:-URL:-${url}\nformData:-${this.formData} `,
          e
        )
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
