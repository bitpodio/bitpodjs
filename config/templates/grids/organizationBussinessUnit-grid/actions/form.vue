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
              <i18n path="Common.EditBusinessUnit" />
            </div>
            <div v-if="isEdit === false">
              <i18n path="Common.NewBusinessUnit" />
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
                  v-model="formData.Name"
                  :label="$t('Common.NameRequired')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-12">
                <RichText
                  v-model="formData.Description"
                  test-id="Description-text-field"
                  class="mb-3"
                  :label="$t('Common.Description')"
                ></RichText>
              </v-col>
              <v-col cols="12" class="pb-6 positionRelative">
                <div
                  v-if="addressClicked || !!venueAddress.AddressLine"
                  class="address-legend"
                >
                  {{ $t('Common.AddressRequired') }}
                </div>
                <no-ssr>
                  <vue-google-autocomplete
                    id="map"
                    ref="venueAddress.AddressLine"
                    v-model="venueAddress.AddressLine"
                    class="form-control pa-5 d-block rounded"
                    :placeholder="
                      !addressClicked && $t('Common.AddressRequired')
                    "
                    :required="true"
                    @placechanged="getAddressData"
                    @focus="removeSearchAddress(true)"
                    @change="changeAddressData($event)"
                    @blur="focusOut"
                  ></vue-google-autocomplete>
                </no-ssr>
                <div
                  v-show="addresslineMessage"
                  class="red--text pa-3 pt-0 pb-0 body-2 positionAbsolute"
                >
                  {{ $t('Messages.Error.ThisFieldRequired') }}
                </div>
              </v-col>

              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="venueAddress.City"
                  :label="$t('Common.City')"
                  outlined
                  dense
                  @change="changeAddress()"
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="venueAddress.State"
                  :label="$t('Common.State')"
                  outlined
                  dense
                  @change="changeAddress()"
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="venueAddress.Country"
                  :label="$t('Common.Country')"
                  outlined
                  dense
                  @change="changeAddress()"
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="venueAddress.PostalCode"
                  :label="$t('Common.ZipCode')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.Email"
                  :label="$t('Common.EmailCaption')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.Phone"
                  :label="$t('Common.Phone')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <Lookup
                  v-model="formData.Type"
                  :field="typeProps"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col class="col-12 col-md-6">
                <Lookup v-model="formData.ParentId" :field="parentIdProps" />
              </v-col>
              <v-col class="col-12 col-md-6">
                <Lookup
                  v-model="formData.PrimeContactId"
                  :field="contactListProps"
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
            :disabled="!valid"
            depressed
            :reset="resetBtn"
            :action="onSave"
            :form-name="formName"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import SaveBtn from '~/components/common/saveButton'
import Lookup from '~/components/common/form/lookup.vue'
import generalConfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import contactList from '~/config/apps/event/gql/contact.gql'
import businessUnit from '~/config/apps/admin/gql/businessUnit.gql'
import { rules } from '~/utility/rules.js'
import nuxtconfig from '~/nuxt.config'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    SaveBtn,
    Lookup,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
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
      resetBtn: false,
      addresslineMessage: false,
      rules: rules(this.$i18n),
      valid: false,
      dialog: false,
      snackbar: false,
      timeout: '3000',
      snackbarText: '',
      formName: 'businessUnit-form',
      formData: {
        Name: '',
        Description: '',
        Email: '',
        Phone: '',
        Type: '',
        ParentId: '',
        PrimeContactId: '',
      },
      addressClicked: false,
      venueAddress: {
        AddressLine: '',
        City: '',
        State: '',
        Country: '',
        PostalCode: '',
        LatLng: {
          lat: 0.0,
          lng: 0.0,
        },
      },
      typeProps: {
        caption: this.$t('Common.Type'),
        type: 'lookup',
        dataSource: {
          query: generalConfiguration,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return { type: 'BusinessTypeLocation' }
          },
        },
      },
      parentIdProps: {
        caption: this.$t('Common.ParentBusinessUnit'),
        type: 'lookup',
        dataSource: {
          query: businessUnit,
          itemText: 'Name',
          itemValue: 'id',
          filter(data) {
            return {}
          },
        },
      },
      contactListProps: {
        caption: this.$t('Common.Contact'),
        type: 'lookup',
        dataSource: {
          query: contactList,
          itemText: 'FullName',
          itemValue: 'id',
          filter(data) {
            return {}
          },
        },
      },
    }
  },

  methods: {
    closeForm() {
      this.formData = {
        Name: '',
        Description: '',
        Email: '',
        Phone: '',
        Type: '',
        ParentId: '',
        PrimeContactId: '',
      }
      this.venueAddress = {
        AddressLine: '',
        City: '',
        State: '',
        Country: '',
        PostalCode: '',
        LatLng: {
          lat: 0.0,
          lng: 0.0,
        },
      }
      this.dialog = false
    },
    openDialog() {
      if (this.isEdit) {
        this.formData.Name = this.item[0].Name
        this.formData.Description = this.item[0].Description
        this.formData.Email = this.item[0].Email
        this.formData.Phone = this.item[0].Phone
        this.formData.Type = this.item[0].Type
        this.formData.ParentId = this.item[0].ParentId
        this.formData.PrimeContactId = this.item[0].PrimeContactId
        this.venueAddress.AddressLine = this.item[0]._CurrentAddress.AddressLine
        this.venueAddress.City = this.item[0]._CurrentAddress.City
        this.venueAddress.State = this.item[0]._CurrentAddress.State
        this.venueAddress.Country = this.item[0]._CurrentAddress.Country
        this.venueAddress.PostalCode = this.item[0]._CurrentAddress.PostalCode
        this.venueAddress.LatLng.lat =
          (this.item[0]._CurrentAddress.LatLng &&
            this.item[0]._CurrentAddress.LatLng.lat) ||
          ''
        this.venueAddress.LatLng.lng =
          (this.item[0]._CurrentAddress.LatLng &&
            this.item[0]._CurrentAddress.LatLng.lng) ||
          ''
      }
      this.dialog = true
    },
    async onSave() {
      if (this.venueAddress.AddressLine === '') {
        this.addresslineMessage = true
        this.resetBtn = true
      } else {
        const data = this.formData
        data._CurrentAddress = this.venueAddress

        let url
        if (this.isEdit) {
          url = `${this.$bitpod.getApiUrl()}Locations/${this.item[0].id}`
        } else {
          url = `${this.$bitpod.getApiUrl()}Locations`
        }
        try {
          let res
          if (this.isEdit) {
            res = await this.$axios.$patch(url, data)
          } else {
            res = await this.$axios.$post(url, data)
          }
          if (res) {
            this.dialog = false
            this.refresh()
          }
        } catch (error) {
          console.error(
            `Error in templates/grid/organizationBussinessUnit-grid/actions/form.vue in onSave method context URL:${url}`,
            error
          )
        }
      }
    },
    getAddressData(addressData, placeResultData, id) {
      this.venueAddress.AddressLine =
        addressData.route ||
        '' + ', ' + addressData.administrative_area_level_1 ||
        ''
      this.venueAddress.Country = addressData.country || ''
      this.venueAddress.City = addressData.locality || ''
      this.venueAddress.State = addressData.administrative_area_level_1 || ''
      this.venueAddress.LatLng.lat = addressData.latitude || ''
      this.venueAddress.LatLng.lng = addressData.longitude || ''
      const latlng = {}
      latlng.lat = addressData.latitude
      latlng.lng = addressData.longitude
      latlng.name =
        addressData.route +
        ' ' +
        addressData.locality +
        ' ' +
        addressData.country
    },
    removeSearchAddress(isAddressClicked) {
      if (isAddressClicked) {
        this.addressClicked = true
      }
      setTimeout(() => {
        Object.values(
          document.getElementsByClassName('pac-container pac-logo')
        ).map((i) => {
          i.style.display = 'none'
        })
      }, 1000)
    },
    changeAddressData(value) {
      this.removeSearchAddress()
      this.addresslineMessage =
        value === '' ? this.$t('Messages.Error.ThisFieldRequired') : ''
      this.venueAddress.AddressLine = value
    },
    focusOut() {
      this.addressClicked = false
    },
    changeAddress() {
      this.removeSearchAddress()
      const { City, State, Country, PostalCode } = this.venueAddress
      const AddressLine = this.$refs['venueAddress.AddressLine'].$data
        .autocompleteText
      if (
        AddressLine !== '' &&
        (City !== '' || State !== '' || Country !== '')
      ) {
        const addressObj = `${AddressLine},${City},${State},${Country},${PostalCode}`
        const key = nuxtconfig.generalConfig.googleGeocodeMapKey
        const customAxiosInstance = this.$axios.create({
          headers: {},
        })
        customAxiosInstance.setToken(false)
        customAxiosInstance
          .get(
            `${nuxtconfig.generalConfig.googleMapGeocodeApi}?address=${addressObj}&key=${key}`
          )
          .then((res) => {
            this.venueAddress.AddressLine = AddressLine || ''
            this.venueAddress.Country = Country || ''
            this.venueAddress.City = City || ''
            this.venueAddress.State = State || ''
            const latlng = { lat: 0.0, lng: 0.0 }
            latlng.lat =
              res.data.results.length > 0
                ? res.data.results[0].geometry.location.lat
                : 0.0
            latlng.lng =
              res.data.results.length > 0
                ? res.data.results[0].geometry.location.lng
                : 0.0
            this.venueAddress.LatLng.lat = latlng.lat || 0.0
            this.venueAddress.LatLng.lng = latlng.lng || 0.0

            return res
          })
          .catch((e) => {
            console.error(
              `Error in changeAddress function of form.vue when place search address , context: place search address, addressObj: ${addressObj} key: ${key} baseUrl: ${nuxtconfig.generalConfig.googleMapGeocodeApi}?address=${addressObj}&key=${key}, error: ${e}`
            )
          })
      }
    },
  },
}
</script>
<style scoped>
.form-control {
  border: 1px solid #9a9a9a;
  width: 100%;
  max-height: 40px;
}
.vs-notification {
  box-shadow: 0 1px 2px 0 hsla(0, 0%, 0%, 0.25) !important;
}
.steper-fixed {
  position: fixed;
  top: 55px;
}
.event-inner {
  min-height: 410px;
}
.map-contain {
  height: 400px;
  max-height: 400px;
}
.address-legend {
  position: absolute;
  background: white;
  font-size: 13px !important;
  left: 20px !important;
  padding: 0 5px;
  top: 3px;
  color: grey;
}
.form-control:focus {
  border: 2px solid #1a73e8 !important;
  outline: #1a73e8;
}
.mxw-150 {
  max-width: 150px;
  width: 150px;
}
.mxw-100 {
  max-width: 100px;
  width: 100px;
}
</style>
