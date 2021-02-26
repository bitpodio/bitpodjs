<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> <i18n path="Common.AddMember" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 text-h5">
            <i18n path="Common.AssociateMember" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 small-form">
          <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            id="new-discount-member-form"
            @submit.prevent="onSave"
          >
            <v-row>
              <v-col cols="12">
                <Lookup
                  v-model="customerId"
                  :field="customerProps"
                  :rules="[rules.required]"
                />
                <div
                  v-show="duplicateMessage !== ''"
                  class="red--text pa-3 pt-0 body-1 mt-n5"
                >
                  {{ duplicateMessage }}
                </div>
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
            :disabled="!valid || isSaveButtonDisabled"
            depressed
            type="submit"
            form="new-discount-member-form"
            ><i18n path="Drawer.Save"
          /></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import member from '~/config/apps/event/gql/member.gql'
import { rules } from '~/utility/rules.js'
export default {
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      customers: [],
      customerId: '',
      valid: false,
      rules: rules(this.$i18n),
      dialog: false,
      duplicateMessage: '',
      isSaveButtonDisabled: false,
      customerProps: {
        type: 'lookup',
        dataSource: {
          query: member,
          itemText: 'customField',
          itemValue: 'id',
          computed(data) {
            return {
              customField: `${data.CustomerName} ${data.Email}`,
            }
          },
          filter(data) {
            return {}
          },
        },
      },
    }
  },

  methods: {
    closeForm() {
      this.dialog = false
      this.duplicateMessage = ''
      this.$refs.form && this.$refs.form.reset()
    },
    async onSave() {
      if (this.valid) {
        this.duplicateMessage = ''
        this.isSaveButtonDisabled = true
        const offerCodeId = this.$route.params.id
        const baseUrl = this.$bitpod.getApiUrl()
        let res = null
        try {
          res = await this.$axios.$put(
            `${baseUrl}OfferCodes/${offerCodeId}/getMember/rel/${this.customerId}`
          )
        } catch (error) {
          this.isSaveButtonDisabled = false
          if (error.response.status === 422) {
            this.duplicateMessage = 'Already exist member!'
          }
          console.log(
            `Error in Discountcode grid add member on Save function - context: offercodeid - ${offerCodeId} , customerId - ${this.customerId}`
          )
        }
        if (res) {
          this.dialog = false
          this.refresh()
          this.$refs.form.reset()
          this.isSaveButtonDisabled = false
          return res
        }
      }
    },
  },
}
</script>
