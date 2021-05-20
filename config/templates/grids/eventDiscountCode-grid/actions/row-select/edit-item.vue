<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ attrs }">
        <v-btn text small v-bind="attrs" @click="openDialog()">
          <v-icon left>fa-pencil</v-icon> {{ $t('Drawer.Edit') }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 text-h5">
            <i18n path="Common.EditDiscountCode" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click.native="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 small-form">
          <v-form
            :id="formName"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            @submit.prevent="onSave"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.codeTitle"
                  :label="$t('Common.CodeRequired')"
                  :rules="[rules.required]"
                  outlined
                  dense
                  :error-messages="uniqueCodeMessage"
                  @input="checkUniqueCode"
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.maxUsageCount"
                  :label="$t('Common.MaxUsageCount')"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.minApplicableOrderAmount"
                  :label="$t('Common.MinApplicableOrderAmount')"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.offerValue"
                  :label="$t('Common.OfferValueRequired')"
                  type="number"
                  :rules="[rules.required]"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-datetime-picker
                  v-model="formData.validTill"
                  :label="$t('Common.ValidTill')"
                  :text-field-props="discountValidTillProps"
                  time-format="hh:mm a"
                  date-format="MMMM dd, yyyy"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-checkbox
                  v-model="formData.isPercent"
                  :label="$t('Common.IsPercentCaption')"
                  class="mt-0"
                  height="20"
                ></v-checkbox>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.maxApplicableAmount"
                  :label="$t('Common.MaxApplicableAmount')"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-12">
                <RichText
                  v-model="formData.description"
                  class="mb-3"
                  :label="$t('Common.Description')"
                ></RichText>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveBtn
            v-if="dialog"
            color="primary"
            :label="this.$t('Drawer.Save')"
            :disabled="!valid || !isUniqueCode"
            depressed
            :action="onSave"
            :form-name="formName"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import SaveBtn from '~/components/common/saveButton'
import { rules } from '~/utility/rules.js'
import dicountCode from '~/config/apps/event/gql/offerCodeCount.gql'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    SaveBtn,
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      dialog: false,
      formName: 'new-event-discount-form',
      valid: false,
      rules: rules(this.$i18n),
      formData: { ...this.items[0] },
      isUniqueCode: true,
      uniqueCodeMessage: '',
    }
  },
  computed: {
    discountValidTillProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
      }
    },
  },
  methods: {
    closeForm() {
      this.dialog = false
    },
    async onSave() {
      const obj = {
        EventId: this.$route.params.id,
        codeTitle: this.formData.codeTitle,
        description: this.formData.description,
        isPercent: this.formData.isPercent,
        maxApplicableAmount: parseInt(this.formData.maxApplicableAmount),
        maxUsageCount: parseInt(this.formData.maxUsageCount),
        minApplicableOrderAmount: parseInt(
          this.formData.minApplicableOrderAmount
        ),
        offerValue: parseInt(this.formData.offerValue),
        validTill: this.formData.validTill.toISOString(),
      }

      try {
        const url = this.$bitpod.getApiUrl()
        const res = await this.$axios.$patch(
          `${url}OfferCodes/${this.items[0].id}`,
          obj
        )
        if (res) {
          this.closeForm()
          this.refresh()
        }
      } catch (error) {
        console.error(
          `Error in config/templates/grids/eventDiscountCode-grid/actions/edit-item.vue on onSave method context: ${url}OfferCodes/${this.items[0].id} `,
          error
        )
      }
    },
    async checkUniqueCode() {
      if (this.formData.codeTitle !== this.items[0].codeTitle) {
        try {
          const where = {
            and: [
              { EventId: this.$route.params.id },
              { codeTitle: this.formData.codeTitle },
            ],
          }
          const res = await this.$apollo.query({
            query: gql`
              ${dicountCode}
            `,
            variables: {
              where,
            },
            fetchPolicy: 'no-cache',
          })
          if (
            res.data &&
            res.data.OfferCode &&
            res.data.OfferCode.OfferCodeCount
          ) {
            this.isUniqueCode = false
            this.uniqueCodeMessage = 'Code is invalid'
          } else {
            this.isUniqueCode = true
            this.uniqueCodeMessage = ''
          }
        } catch (error) {
          console.error(
            `Error in config/templates/grids/eventDiscountCode-grid/actions/edit-item.vue while checking unique code context: OfferCode GQL, code: ${this.formData.codeTitle}`,
            error
          )
        }
      } else {
        this.isUniqueCode = true
        this.uniqueCodeMessage = ''
      }
    },
    openDialog() {
      this.formData = { ...this.items[0] }
      this.formData.validTill = this.formData.validTill
        ? new Date(this.items[0].validTill)
        : ''
      this.dialog = true
    },
  },
}
</script>
