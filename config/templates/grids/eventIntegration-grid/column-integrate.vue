<template>
  <div>
    <v-btn v-if="status === ''" text small @click="onSetup"
      ><i18n path="Drawer.Setup"
    /></v-btn>
    <v-btn
      v-if="status === 'Connected' || status === 'Disconnected'"
      icon
      @click="onEdit()"
      ><v-icon small>fa-pencil</v-icon></v-btn
    >
    <v-btn
      v-if="status === 'Connected' || status === 'Disconnected'"
      icon
      @click="onDelete()"
      ><v-icon small>fa-trash</v-icon></v-btn
    >
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <div v-if="dialog">
        <component
          :is="serviceForm || null"
          :on-close="onClose"
          :on-save="onSave"
          :item="formEditData"
        />
      </div>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true"
      ><div class="text-center">{{ snackbarText }}</div></v-snackbar
    >
  </div>
</template>

<script>
import { templateLoaderMixin } from '~/utility'
import { openAuthPopups } from '~/utility/oauth'
import { postGaData } from '~/utility/index.js'
export default {
  mixins: [templateLoaderMixin],
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
    formData: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      snackbar: false,
      timeout: 1000,
      snackbarText: '',
      category: this.item.MetaData.Category,
      serviceId: this.item.ServiceId,
      dialog: false,
      profileName: this.item.ProfileName,
      profileId: this.$auth.$state.user.data.email,
      eventId: this.$route.query.event || '',
      status: this.item.Status || '',
      itemId: this.item.id,
      formEditData: this.item.MetaData,
      oauthType: this.item.MetaData.oauthType || '',
      accessToken: this.$apolloHelpers.getToken(),
      serviceForm: '',
    }
  },
  computed: {
    _components() {
      const serviceFormName = this.serviceId && this.serviceId.toLowerCase()
      return {
        serviceForm: {
          locations: [
            `templates/grids/eventIntegration-grid/${serviceFormName}.vue`,
            `templates/grids/eventIntegration-grid/index.vue`,
          ],
        },
      }
    },
  },

  methods: {
    onClose(formLabel) {
      this.formEditData = {}
      this.dialog = false

      postGaData('Close', formLabel)
    },
    async onSave(formData, formLabel) {
      postGaData(this.$t('Drawer.Save'), formLabel)
      formData.Category = this.category
      if (this.eventId) {
        formData.eventId = this.eventId
      }
      const connobj = {}
      connobj.ServiceId = this.serviceId
      connobj.Status = 'Connected'
      connobj.ProfileId = this.profileId
      connobj.ProfileName = this.profileName
      connobj.MetaData = formData
      if (this.item.id) {
        connobj.id = this.item.id
      }
      try {
        const url = this.$bitpod.getApiUrl()
        const res = await this.$axios.$patch(`${url}Connections`, connobj)
        if (res) {
          this.refresh()
          this.snackbarText = this.$t('Messages.Success.ConnectionSuccessfully')
          this.snackbar = true
        }
      } catch (e) {
        console.log(
          'Error in config/templates/grid/eventIntegration-grid/column-integrate.vue while making a axios call to Connection model from method onSave',
          e
        )
      }
      this.dialog = false
    },

    async onDelete() {
      const id = this.item.id
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
          console.log(
            'Error in config/templates/grid/eventIntegration-grid/column-integrate.vue while making a axios call to Connection model from method onDelete',
            e
          )
        }
      }
    },

    onSetup() {
      if (this.oauthType === 'Oauth') {
        const options = {
          AccessType: 'private',
          isConnectionModelStore: true,
          Name: this.serviceId,
          ServiceId: this.serviceId,
          TenantId: 'event',
          bpmnServerURL: `https://${this.$config.axios.backendBaseUrl}/bpmn/`,
          OwnerId: this.profileId,
          loginUser: this.profileId,
          OrgId: this.$store.state.currentOrg.id,
          accessToken: this.accessToken,
          MetaData: `{"eventId":"${this.eventId}"}`,
        }
        openAuthPopups(options, (e) => {
          console.log('openAuthPopups response', e)
          this.refresh()
          this.snackbarText = this.$t(
            'Messages.Success.ConnectionSetupSuccessfully'
          )
          this.snackbar = true
        })
      } else {
        this.item = {}
        this.dialog = true
      }
    },
    onEdit() {
      this.formEditData = this.item.MetaData
      this.dialog = true
    },
  },
}
</script>
