<template>
  <v-col class="px-0">
    <v-card>
      <v-card-title
        class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
      >
        <h2 class="black--text pt-5 pb-3 text-h5">
          <i18n path="Common.ManageWebhook" />
        </h2>
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
            <v-col cols="12" class="d-flex">
              <v-text-field
                v-model="formData.URL"
                :label="$t('Common.URLRecommended')"
                :rules="[rules.required]"
                outlined
                dense
                class="col-12 col-md-6"
              ></v-text-field>
              <v-btn color="primary" class="ml-2" depressed
                ><i18n path="Common.Test"
              /></v-btn>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="formData.Event"
                :items="[...eventDropdown]"
                :label="$t('Common.SelectEvents')"
                item-text="Title"
                item-value="id"
                multiple
                chips
                small-chips
                deletable-chips
                required
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="checkbox1"
                label="registration.created"
                dense
                height="20"
                class="ma-0 pa-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="checkbox2"
                label="registration.updated"
                dense
                height="20"
                class="ma-0 pa-0"
              ></v-checkbox>
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
          @click="onSaveButton"
          ><i18n path="Drawer.Save"
        /></v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import eventList from '~/config/apps/event/gql/eventlist.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { rules } from '~/utility/rules.js'
import { getIdFromAtob } from '~/utility'
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
      formData: { ...this.item },
      lazy: false,
      eventDropdown: [],
      Event: [],
      URL: '',
      checkbox1: false,
      checkbox2: false,
    }
  },
  async mounted() {
    try {
      const res = await this.getDropDownData()
      if (res) {
        this.eventDropdown = res.map(({ id, Title }) => ({
          id: getIdFromAtob(id),
          Title,
        }))
      }
    } catch (e) {
      console.log(
        `Error in config/templates/grid/eventIntegration-grid/webhook.vue while making a GQL call to Event model from method getDropDownData`,
        e
      )
    }
    if (this.formData.Actions && this.formData.Actions.length > 0) {
      this.formData.Actions.includes('registration.created')
        ? (this.checkbox1 = true)
        : (this.checkbox1 = false)
      this.formData.Actions.includes('registration.updated')
        ? (this.checkbox2 = true)
        : (this.checkbox2 = false)
    }
  },
  methods: {
    async getDropDownData() {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${eventList}
          `,
          variables: {
            filters: {},
            where: {},
          },
        })
        if (result) {
          const event = formatGQLResult(result.data, 'Event')
          return event
        }
      } catch (e) {
        console.log(
          `Error in config/templates/grid/eventIntegration-grid/webhook.vue while making a GQL call to Event model from method getDropDownData`,
          e
        )
      }
    },
    onSaveButton() {
      this.formData.Event = this.formData.Event.map((i) => i)
      this.formData.Actions = []
      if (this.checkbox1) {
        this.formData.Actions.push('registration.created')
      }
      if (this.checkbox2) {
        this.formData.Actions.push('registration.updated')
      }
      this.onSave(this.formData)
    },
  },
}
</script>
