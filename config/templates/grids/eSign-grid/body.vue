<template>
  <div>
    <v-flex class="greybg">
      <v-col class="d-flex greybg pt-10 flex-row seatmap-inner align-center">
        <v-text class="text-h5"
          ><i18n path="Common.SignOrGetSignatures"
        /></v-text>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          max-width="64px"
          text
          depressed
          @click="handleNewTemplate"
          ><v-icon>mdi-plus</v-icon><i18n path="Common.New"
        /></v-btn>
      </v-col>
      <v-col class="d-flex flex-wrap greybg pa-0 pt-10 seatmap-inner">
        <v-col
          v-for="item in items"
          :key="item.id"
          class="pa-4 pl-0 pt-0 eventtiles ma-sm-4 ml-sm-0 mt-sm-0 mx-auto my-2"
        >
          <nuxt-link :to="eSignRoutes(item.id)" class="text-decoration-none">
            <v-card class="elevation-0 pa-0">
              <div class="positionRelative">
                <div class="overflow-h rounded-t">
                  <v-flex
                    class="tile-img tile-pattern rounded-0"
                    :style="{
                      'background-image': getRandomImage(item.Subject),
                    }"
                  ></v-flex>
                </div>
              </div>
              <v-flex class="tile-info pa-4 pb-0">
                <div class="text--secondary pa-2 pb-0 body-2 pl-0 pt-0">
                  {{ $d(new Date(item.createdDate), 'long', $i18n.locale) }}
                </div>
                <v-card-title
                  class="text-h5 grey--text text--darken-4 text-truncate d-block text-capitalize pa-2 pt-0 pb-1 pl-0"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ item.Subject }}
                </v-card-title>
                <v-chip
                  :class="{
                    'mb-2 mt-n2': true,
                    warning: item.Status === 'Inprogress',
                    success: item.Status === 'Completed',
                    error: item.Status === 'Declined',
                  }"
                  small
                >
                  {{ item.Status }}</v-chip
                >
              </v-flex>
              <v-card-actions class="pt-0 pl-4 tiles-action">
                <div class="text-truncate d-block">
                  <v-chip>
                    <v-avatar left color="warning" size="24">
                      <span class="white--text name-initial">{{
                        item.createdBy
                      }}</span>
                    </v-avatar>
                    <span>{{ item.createdBy }}</span>
                  </v-chip>
                </div>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-col>
    </v-flex>
    <div v-if="dialog">
      <ESignForm
        :new-template-dialog.sync="dialog"
        :refresh="refresh"
        template-name="ESign Offer Letter"
        :recipient-list="testRecipientList"
        :template-data="testTemplateData"
      />
    </div>
  </div>
</template>

<script>
import ESignForm from './ESignForm.vue'

export default {
  components: {
    ESignForm,
  },
  props: {
    items: { type: Array, default: () => [] },
    offset: { type: Boolean, default: false },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      dialog: false,
      testRecipientList: [
        { FullName: 'Test', Email: 'test@test.com', type: 'HR' },
        { FullName: 'Sample', Email: 'sample@sample.com', type: 'Candidate' },
      ],
      testTemplateData: {
        today: 'date',
        Employee: {
          FirstName: 'first',
          LastName: 'last',
          _CurrentAddress: { AddressLine: 'address' },
          Designation: 'new',
          Location: 'Pune',
        },
        ctc: '1000',
        joiningDate: '04/02/2000',
        acceptByDate: '09/04/2023',
        HR: { FirstName: 'HR', LastName: 'Last', Designation: 'HR' },
        basic_annual: '2000',
        basic: '200',
        hra_annual: '53798',
        hra: '8998',
        lta_annual: '42342',
        lta: '4232',
        ca_annual: '534543',
        ca: '534',
        mr_annual: '534',
        mr: '53434',
        sa_annual: '543534',
        sa: '534',
        total_annual: '534543',
        total: '435543',
        bonus: '3453',
        performanceBonus: '3534',
        pt_annual: '53453',
        pt: '534534',
        ctc_monthly: '45334',
        workaddress: 'Pune',
        organizationPhone: '432423',
      },
    }
  },
  methods: {
    handleNewTemplate() {
      this.dialog = true
    },
    eSignRoutes(id) {
      return this.localePath(`/apps/eSign/eSign/${id}`)
    },
    getRandomImage(name) {
      return window.GeoPattern.generate(name).toDataUrl()
    },
  },
}
</script>

<style scoped>
.seat-maps {
  height: 125px;
  width: 155px;
  max-width: 155px;
}
.seat-card {
  top: 12px;
}
.box-actions {
  bottom: 5px;
  right: 5px;
  display: none;
}
.seat-maps:hover .box-actions {
  display: block;
}
.seatmap-inner {
  max-width: 65%;
  margin: auto;
}
.tile-pattern {
  background-size: cover;
  height: 140px;
}
.tile-img {
  max-height: 140px;
  min-height: 140px;
  transition: transform 0.3s, opacity 0.3s ease-out;
  -moz-transition: transform 0.3s, opacity 0.3s ease-out;
  -webkit-transition: transform 0.3s, opacity 0.3s ease-out;
  -o-transition: transform 0.3s, opacity 0.3s ease-out;
}
.tile-img:focus,
.tile-img:hover {
  transform: scale(1.1);
  opacity: 1;
  overflow: hidden;
}
.eventtiles {
  max-width: 280px;
  min-width: 280px;
}
.tile-info {
  min-height: 92px;
}
.tiles-action {
  min-height: 36px;
}
.overflow-h {
  overflow: hidden;
}
@media (max-width: 600px) {
  .seatmap-inner {
    max-width: 100%;
  }
}
</style>
