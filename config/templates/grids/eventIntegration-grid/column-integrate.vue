<template>
  <div>
    <v-btn v-if="status === ''" text small @click="onSetup">Setup</v-btn>
    <v-btn
      v-if="status === 'Connected' || status === 'Disconnected'"
      icon
      @click="dialog = true"
      ><v-icon small color="red">fa-pencil</v-icon></v-btn
    >
    <v-btn
      v-if="status === 'Connected' || status === 'Disconnected'"
      icon
      @click="onDelete()"
      ><v-icon small color="red">fa-trash</v-icon></v-btn
    >
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <div>
        <component
          :is="serviceForm || null"
          :on-close="onClose"
          :on-save="onSave"
          :item="formEditData"
        />
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { templateLoaderMixin } from '~/utility'
import nuxtconfig from '~/nuxt.config'
import { openAuthPopups } from '~/utility/oauth'
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
    onClose() {
      this.item = {}
      this.dialog = false
    },
    async onSave(formData) {
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
      console.log('--data=', connobj)
      try {
        const res = await this.$axios.$patch(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Connections`,
          connobj
        )
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.log('Error', e)
      }
      this.dialog = false
    },

    async onDelete() {
      console.log('+++data item+++', this.item)
      const id = this.item.id
      console.log('+++data item+++', this.item)
      if (id) {
        try {
          const res = await this.$axios.$delete(
            `https://${nuxtconfig.axios.eventUrl}/svc/api/Connections/${id}`
          )
          if (res) {
            this.refresh()
          }
        } catch (e) {
          console.log('Error', e)
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
          bpmnServerURL: 'https://bitpod-event.test.bitpod.io/bpmn/',
          OwnerId: this.profileId,
          loginUser: this.profileId,
          OrgId: 1,
          accessToken: this.accessToken,
        }
        openAuthPopups(options, function (e) {
          console.log('openAuthPopups response', e)
          this.refresh()
        })
      } else {
        this.dialog = true
      }
    },
  },
}
</script>
