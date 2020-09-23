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
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> Add Member
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-10 pb-9">Associate Member</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12">
                <Lookup v-model="customerId" :field="customerProps" />
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
            @click.native="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
// import nuxtconfig from '~/nuxt.config'
import member from '~/config/apps/event/gql/member.gql'
import { required } from '~/utility/rules.js'
import { getApiUrl } from '~/utility/index.js'
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
      required: [required],
      dialog: false,
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
    async onSave() {
      const offerCodeId = this.$route.params.id
      const baseUrl = getApiUrl()
      let res = null
      try {
        res = await this.$axios.$put(
          `${baseUrl}OfferCodes/${offerCodeId}/getMember/rel/${this.customerId}`
        )
      } catch (e) {
        console.error('Error', e)
      }
      if (res) {
        this.dialog = false
        this.refresh()
        this.customerId = ''
        return res
      }
    },
  },
}
</script>
