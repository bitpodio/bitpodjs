<template>
  <v-flex class="greybg seatmap-inner">
    <div v-for="c in Category" :key="c">
      <div class="ma-5">{{ c }}</div>
      <div class="d-flex flex-wrap ml-5 mt-5">
        <div v-for="(item, index) in items" :key="item.MetaData.Category">
          <v-hover
            v-if="item.MetaData.Category === c"
            v-slot:default="{ hover }"
            open-delay="200"
          >
            <v-card
              :key="index"
              :elevation="hover ? 1 : 0"
              class="ma-3 ma-md-10 ml-0 mt-0 ml-md-0 mt-md-0 seat-maps"
              :class="
                !item.Status && !hover
                  ? 'on-hover'
                  : !item.Status && hover
                  ? ''
                  : item.Status
                  ? item.Status === 'Connected'
                    ? 'active-connection'
                    : 'inactive-connection'
                  : ''
              "
            >
              <v-card-text class="text-center">
                <div class="d-flex justify-center">
                  <v-img
                    :src="item.MetaData.Image"
                    aspect-ratio="0.75"
                    height="70"
                    max-height="70"
                    position="center"
                    max-width="70"
                    contain
                  ></v-img>
                </div>
                <v-divider class="mt-2 mb-2"></v-divider>
                <div>
                  <v-btn
                    v-if="!item.Status && hover"
                    text
                    depressed
                    small
                    color="grey"
                    @click="onSetup(item)"
                  >
                    {{ $t('Drawer.Setup') }}</v-btn
                  >

                  <div
                    v-if="!item.Status && !hover"
                    class="body-1 grey--text text--darken-1 d-block text-truncate mt-1"
                  >
                    {{ item.ProfileName }}
                  </div>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on"
                        ><div
                          v-if="item.Status"
                          class="body-1 grey--text text--darken-1 d-block text-truncate service-text mt-1"
                        >
                          {{ item.ProfileName }}
                        </div></span
                      >
                    </template>
                    <span>{{ item.ProfileName }}</span>
                  </v-tooltip>
                </div>
              </v-card-text>
              <v-card-actions v-if="item.Status" class="pa-0 ma-0 pb-1">
                <div></div>
                <v-spacer></v-spacer>
                <div class="box-actions pa-1 pb-0 mt-n14">
                  <v-menu
                    left
                    bottom
                    :offset-y="offset"
                    transition="slide-y-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        small
                        v-bind="attrs"
                        v-on="on"
                        @click="onDots(item.ServiceId)"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-list dense>
                      <v-list-item
                        v-if="
                          item.Status === 'Connected' ||
                          item.Status === 'Disconnected'
                        "
                        @click="editForm(item.ServiceId)"
                      >
                        <v-list-item-icon class="mr-2">
                          <i
                            class="fa fa-pencil-square-o mt-1"
                            aria-hidden="true"
                          ></i>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{
                            $t('Drawer.Edit')
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        v-if="
                          item.Status === 'Connected' ||
                          item.Status === 'Disconnected'
                        "
                        @click="onDelete(item)"
                      >
                        <v-list-item-icon class="mr-2">
                          <i class="fa fa-trash mt-1" aria-hidden="true"></i>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{
                            $t('Drawer.Delete')
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        v-if="
                          item.Status === 'Connected' ||
                          item.Status === 'Disconnected'
                        "
                      >
                        <v-checkbox
                          v-model="connectionStatus[selectedServiceId]"
                          label="Status"
                          color="green"
                          dense
                          class="mr-2 mt-1 black--text"
                          @click="updateConnection(item)"
                        ></v-checkbox>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-card-actions>
            </v-card>
          </v-hover>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <div v-if="dialog">
        <component
          :is="component[selectedServiceId]"
          :on-close="onClose"
          :on-save="onSave"
          :item="formEditData"
        />
      </div>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
    <v-dialog v-model="dialogBox" top max-width="400">
      <v-card>
        <v-card-text class="pt-4 pb-0 body-1">
          {{ dialogText }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="dialogBox = false">
            <i18n path="Common.Ok" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { templateLoaderMixin } from '~/utility'
import { openAuthPopups } from '~/utility/oauth'
export default {
  mixins: [templateLoaderMixin],
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
      Category: [],
      dialog: false,
      selectedServiceId: '',
      component: [],
      editformData: [],
      formEditData: '',
      connectionData: [],
      eventId: this.$route.query.event || '',
      checkbox: false,
      connectionStatus: [],
      snackbar: false,
      snackbarText: '',
      timeout: 1000,
      dialogBox: false,
      dialogText: '',
    }
  },
  mounted() {
    this.items.forEach(async (e) => {
      if (!this.Category.includes(e.MetaData.Category)) {
        this.Category.push(e.MetaData.Category)
      }
      const serviceFormName = e.ServiceId && e.ServiceId.toLowerCase()
      this.component[serviceFormName] = await this.loadTemplate([
        `templates/grids/eventIntegration-grid/${serviceFormName}.vue`,
        `templates/grids/eventIntegration-grid/index.vue`,
      ])
      this.editformData[serviceFormName] = e.MetaData
      this.connectionData[serviceFormName] = e
      if (e.Status === 'Connected') {
        this.connectionStatus[serviceFormName] = true
      } else {
        this.connectionStatus[serviceFormName] = false
      }
    })
  },
  methods: {
    editForm(serviceId) {
      this.selectedServiceId = serviceId && serviceId.toLowerCase()
      this.formEditData = this.editformData[this.selectedServiceId]
      this.dialog = true
    },
    onClose() {
      this.formEditData = {}
      this.dialog = false
    },
    async onSave(formData) {
      const itemObj = this.connectionData[this.selectedServiceId]
      formData.Category = itemObj.MetaData.Category
      if (this.eventId) {
        formData.eventId = this.eventId
      }
      const connobj = {}
      connobj.ServiceId = itemObj.ServiceId
      connobj.Status = 'Connected'
      connobj.ProfileId = itemObj.ProfileId
      connobj.ProfileName = itemObj.ProfileName
      connobj.MetaData = formData
      if (itemObj.id) {
        connobj.id = itemObj.id
      }
      try {
        const url = this.$bitpod.getApiUrl()
        const res = await this.$axios.$patch(`${url}Connections`, connobj)
        if (res) {
          this.connectionStatus[this.selectedServiceId] = true
          this.refresh()
          this.snackbarText = this.$t('Messages.Success.ConnectionSuccessfully')
          this.snackbar = true
        }
      } catch (e) {
        console.error(
          'Error in config/templates/grid/eventIntegration-grid/column-integrate.vue while making a axios call to Connection model from method onSave',
          e
        )
      }
      this.dialog = false
    },
    onSetup(item) {
      if (item.MetaData.oauthType === 'Oauth') {
        const options = {
          AccessType: 'private',
          isConnectionModelStore: true,
          Name: item.ServiceId,
          ServiceId: item.ServiceId,
          TenantId: 'event',
          bpmnServerURL: `https://${this.$config.axios.backendBaseUrl}/bpmn/`,
          OwnerId: this.$auth.$state.user.data.email,
          loginUser: this.$auth.$state.user.data.email,
          OrgId: this.$store.state.currentOrg.id,
          accessToken: this.$apolloHelpers.getToken(),
          MetaData: `{"eventId":"${this.$route.query.event || ''}"}`,
        }
        openAuthPopups(options, (e) => {
          console.error('openAuthPopups response', e)
          this.refresh()
          this.snackbarText = this.$t(
            'Messages.Success.ConnectionSetupSuccessfully'
          )
          this.snackbar = true
        })
      } else {
        this.selectedServiceId = item.ServiceId && item.ServiceId.toLowerCase()
        this.item = {}
        this.dialog = true
      }
    },
    async onDelete(item) {
      const id = item.id
      if (id) {
        try {
          const url = this.$bitpod.getApiUrl()
          const res = await this.$axios.$delete(`${url}Connections/${id}`)
          if (res) {
            this.snackbarText = this.$t(
              'Messages.Success.ConnectionDeletedSuccessfully'
            )
            this.snackbar = true
            this.refresh()
          }
        } catch (e) {
          console.error(
            'Error in config/templates/grid/eventIntegration-grid/column-integrate.vue while making a axios call to Connection model from method onDelete',
            e
          )
        }
      }
    },
    onDots(serviceId) {
      this.selectedServiceId = serviceId && serviceId.toLowerCase()
    },
    async updateConnection(item) {
      const id = item.id
      if (id && item.Status) {
        const category = item.MetaData.Category
        const url = `${this.$bitpod.getApiUrl()}Connections/${id}`
        if (this.connectionStatus[item.ServiceId.toLowerCase()]) {
          const data = { Status: 'Disconnected' }
          try {
            const res = await this.$axios.$put(url, data)
            if (res) {
              this.connectionStatus[this.selectedServiceId] = false
              this.refresh()
              this.snackbarText = this.$t(
                'Messages.Success.ConnectionSuccessfully'
              )
              this.snackbar = true
            }
          } catch (e) {
            console.error(
              'Errors in config/templates/grid/eventIntegration-grid/column-status.vue while making a axios call to Connection model from method updateConnection',
              e
            )
          }
        } else {
          const filter = {
            where: {
              and: [
                { Status: 'Connected' },
                { 'MetaData.Category': 'Payment' },
              ],
            },
          }
          const filterurl = `${this.$bitpod.getApiUrl()}Connections?filter=${JSON.stringify(
            filter
          )}`
          const data = { Status: 'Connected' }
          if (category === 'Payment') {
            try {
              const res = await this.$axios.$get(filterurl, data)
              if (res) {
                if (res.length) {
                  this.dialogText =
                    'Only one Payment connection can be connected.'
                  this.dialogBox = true
                } else {
                  try {
                    const res = await this.$axios.$put(url, data)
                    if (res) {
                      this.connectionStatus[this.selectedServiceId] = true
                      this.snackbarText = this.$t(
                        'Messages.Success.ConnectionSuccessfully'
                      )
                      this.refresh()
                      this.snackbar = true
                    }
                  } catch (e) {
                    console.error(
                      'Errors in config/templates/grid/eventIntegration-grid/column-status.vue while making a axios call to Connection model from method updateConnection',
                      e
                    )
                  }
                }
              }
            } catch (e) {
              console.error(
                'Errors in config/templates/grid/eventIntegration-grid/column-status.vue while making a axios call to Connection model from method updateConnection',
                e
              )
            }
          } else {
            try {
              const res = await this.$axios.$put(url, data)
              if (res) {
                this.connectionStatus[this.selectedServiceId] = true
                this.snackbarText = this.$t(
                  'Messages.Success.ConnectionSuccessfully'
                )
                this.refresh()
                this.snackbar = true
              }
            } catch (e) {
              console.error(
                'Errors in config/templates/grid/eventIntegration-grid/column-status.vue while making a axios call to Connection model from method updateConnection',
                e
              )
            }
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.seat-maps {
  height: 135px;
  width: 165px;
  max-width: 155px;
}
.seat-card {
  top: 12px;
}
.box-actions {
  bottom: 15px;
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
.on-hover {
  background: #bdbdbd;
}
.service-text {
  width: 110px;
}
.active-connection {
  border-bottom: 2px solid green;
}
.inactive-connection {
  border-bottom: 2px solid grey;
}
@media (max-width: 600px) {
  .seatmap-inner {
    max-width: 100%;
  }
  .seat-maps {
    width: 150px;
    max-width: 150px;
  }
}
</style>
