<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-btn text small @click="openDialog">
      <v-icon class="fs-18" left>{{
        isEdit ? 'fa-pencil' : 'mdi-plus'
      }}</v-icon>
      <div v-if="isEdit"><i18n path="Common.EditItem" /></div>
      <div v-if="isEdit === false"><i18n path="Common.New" /></div>
    </v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">
            <div v-if="isEdit === true">
              <i18n path="Common.EditDiscountCode" />
            </div>
            <div v-if="isEdit === false">
              <i18n path="Common.NewDiscountCode" />
            </div>
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form
            :id="formName"
            ref="form"
            v-model="valid"
            @submit.prevent="submitForm"
          >
            <v-row v-if="dialog">
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="formData.codeTitle"
                  data-test-id="Common.CodeRequired"
                  :label="$t('Common.CodeRequired')"
                  :rules="[rules.required]"
                  outlined
                  dense
                  :error-messages="uniqueCodeMessage"
                  @input="beforeCheckUniqueCode"
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-12">
                <RichText
                  v-model="formData.description"
                  test-id="Description-text-field"
                  class="mb-3"
                  :label="$t('Common.Description')"
                ></RichText>
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
                <v-checkbox
                  v-model="formData.isActive"
                  :label="$t('Common.IsActiveField')"
                  class="mt-0"
                  height="20"
                ></v-checkbox>
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
                <v-text-field
                  v-model="formData.maxApplicableAmount"
                  :label="$t('Common.MaxApplicableAmount')"
                  type="number"
                  min="1"
                  outlined
                  dense
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
                <Lookup
                  v-model="formData.EventId"
                  :field="eventProps"
                  @change="onEventChange"
                />
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
import Lookup from '~/components/common/form/lookup.vue'
import eventQuery from '~/config/apps/event/gql/eventNames.gql'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    SaveBtn,
    Lookup,
  },
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    item: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
      timeout: '3000',
      snackbarText: '',
      formData: {
        codeTitle: '',
        description: '',
        isPercent: false,
        isActive: false,
        maxUsageCount: '',
        maxApplicableAmount: '',
        validTill: '',
        minApplicableOrderAmount: '',
        offerValue: '',
        EventId: '',
      },
      formName: 'discount-form',
      valid: false,
      rules: rules(this.$i18n),
      uniqueCodeMessage: '',
      isUniqueCode: false,
      eventChanged: false,
      eventProps: {
        caption: this.$t('Common.EventApp'),
        type: 'lookup',
        dataSource: {
          query: eventQuery,
          itemText: 'Title',
          itemValue: 'id',
          filter(data) {
            return { HasTickets: true }
          },
        },
      },
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
    onEventChange() {
      this.eventChanged = true
      this.checkUniqueCode()
    },
    openDialog() {
      if (this.isEdit) {
        this.formData = { ...this.item[0] }

        this.formData.validTill = this.formData.validTill
          ? new Date(this.item[0].validTill)
          : ''
        this.isUniqueCode = true
      }
      setTimeout(() => {
        this.dialog = true
      }, 0)
    },
    closeForm() {
      this.dialog = false
      if (!this.isEdit) {
        this.formData = {
          codeTitle: '',
          description: '',
          isPercent: false,
          isActive: false,
          maxUsageCount: '',
          maxApplicableAmount: '',
          validTill: '',
          minApplicableOrderAmount: '',
          offerValue: '',
          EventId: '',
        }
        this.uniqueCodeMessage = ''
        this.isUniqueCode = false
      }
    },
    beforeCheckUniqueCode() {
      if (this.isEdit) {
        if (this.formData.codeTitle !== this.item[0].codeTitle) {
          this.checkUniqueCode()
        } else {
          this.isUniqueCode = true
          this.uniqueCodeMessage = ''
        }
      } else {
        this.checkUniqueCode()
      }
    },
    async checkUniqueCode() {
      try {
        const where = this.eventChanged
          ? {
              and: [
                { EventId: this.formData.EventId },
                { codeTitle: this.formData.codeTitle },
              ],
            }
          : {
              and: [
                { EventId: { exists: true } },
                { EventId: { neq: '' } },
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
          `Error in config/templates/grids/discount-grid/actions/form.vue while checking unique code context: OfferCode GQL, filter:${where}`,
          error
        )
      }
    },
    async onSave() {
      const obj = {
        EventId: this.formData.EventId,
        codeTitle: this.formData.codeTitle,
        description: this.formData.description,
        isPercent: this.formData.isPercent,
        maxApplicableAmount: parseInt(this.formData.maxApplicableAmount),
        maxUsageCount: parseInt(this.formData.maxUsageCount),
        minApplicableOrderAmount: parseInt(
          this.formData.minApplicableOrderAmount
        ),
        offerValue: parseInt(this.formData.offerValue),
        validTill: this.formData.validTill
          ? this.formData.validTill.toISOString()
          : '',
        isActive: this.formData.isActive,
      }
      let res
      try {
        if (this.isEdit) {
          obj.id = this.formData.id
          res = await this.$axios.$patch(
            `${this.$bitpod.getApiUrl()}OfferCodes/${this.formData.id}`,
            obj
          )
        } else {
          res = await this.$axios.$post(
            `${this.$bitpod.getApiUrl()}OfferCodes`,
            obj
          )
        }
        if (res) {
          this.closeForm()
          this.refresh()
          this.snackbarText = this.isEdit
            ? this.$t('Messages.Success.DiscountCodeUpdateSuccessfully')
            : this.$t('Messages.Success.DiscountCodeSuccessfully')
          this.snackbar = true
        }
      } catch (error) {
        console.error(
          `Error in config/templates/grids/discount-grid/actions/form.vue on onSave method`,
          error
        )
      }
    },
  },
}
</script>
