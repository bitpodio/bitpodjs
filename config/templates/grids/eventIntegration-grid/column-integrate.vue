<template>
  <div>
    <v-btn v-if="status === ''" text @click="onSetup">Setup</v-btn>
    <v-btn
      v-if="status === 'Connected' || status === 'Disconnected'"
      icon
      @click="dialog = true"
      ><v-icon>fa-pencil</v-icon></v-btn
    >
    <v-btn
      v-if="status === 'Connected' || status === 'Disconnected'"
      icon
      @click="onDelete()"
      ><v-icon>fa-trash</v-icon></v-btn
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
      eventId: this.$route.query.event,
      status: this.item.Status || '',
      itemId: this.item.id,
      formEditData: this.item.MetaData,
      oauthType: this.item.MetaData.oauthType || '',
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
      debugger
      this.item = {}
      this.dialog = false
    },
    async onSave(formData) {
      debugger
      formData.Category = this.category
      formData.eventId = this.eventId
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
      debugger
      try {
        debugger
        const res = await this.$axios.$patch(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Connections`,
          connobj
        )
        if (res) {
          debugger
          this.refresh()
        }
      } catch (e) {
        console.log('Error', e)
      }
      this.dialog = false
    },

    async onDelete() {
      debugger
      console.log('+++data item+++', this.item)
      const id = this.item.id
      console.log('+++data item+++', this.item)
      debugger
      if (id) {
        try {
          debugger
          const res = await this.$axios.$delete(
            `https://${nuxtconfig.axios.eventUrl}/svc/api/Connections/${id}`
          )
          if (res) {
            debugger
            this.refresh()
          }
        } catch (e) {
          console.log('Error', e)
        }
      }
    },

    onSetup() {
      debugger
      if (this.oauthType === 'Oauth') {
        const options = {
          AccessType: 'private',
          isConnectionModelStore: true,
          Name: 'xero',
          ServiceId: 'xero',
          TenantId: 'event',
          bpmnServerURL: 'https://bitpod-event.test.bitpod.io/bpmn/',
          OwnerId: 'lokesh@bitpod.io',
          loginUser: 'lokesh@bitpod.io',
          OrgId: 1,
          accessToken:
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhEMkE0MTczM0QwN0JBNkU2RTYwNTZFRUJDRThDRkQyMDc0NThCMDUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJqU3BCY3owSHVtNXVZRmJ1dk9qUDBnZEZpd1UifQ.eyJuYmYiOjE2MDE4ODcxNzUsImV4cCI6MTYwMTk3MzU3NSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5iaXRwb2QuaW8vYXV0aCIsImF1ZCI6WyJodHRwczovL2xvZ2luLmJpdHBvZC5pby9hdXRoL3Jlc291cmNlcyIsIk5vdGlmaWNhdGlvbiIsIlNoYXJlZCJdLCJjbGllbnRfaWQiOiJndHYrcTA0bHUvbDVaZkt5MHZXRkpqRHI5RzdHc0RhV1BpVml3cEowWUpzPSIsInN1YiI6Imxva2VzaEBiaXRwb2QuaW8iLCJhdXRoX3RpbWUiOjE2MDE4ODU3MzcsImlkcCI6ImxvY2FsIiwic2NvcGUiOlsiTm90aWZpY2F0aW9uIiwib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwibm90aWZpY2F0aW9uIiwiYmFhcyIsIm9mZmxpbmVfYWNjZXNzIiwibm90aWZpY2F0aW9uIiwiYmFhcyIsIm9mZmxpbmVfYWNjZXNzIiwibm90aWZpY2F0aW9uIiwiYmFhcyIsIm9mZmxpbmVfYWNjZXNzIiwibm90aWZpY2F0aW9uIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.M1tHq7U6Gn96-miIB4tPwR2zKBQbJ57O-tdRe0DOe8qzIXrS4p2gRampIIfEF7CsYwnSqBXJ-vlwODIHqXio6Ifr2FUbCU8t3_-eGWox4uN6o5UhuNaE1ozfRJ5yQNjJvFbs3blI2slhbLEPwEatK4DebWk3FZcaJqbDxS-rgSCvbtSh4j6qiKpYn-lhvKil9uXl1cqqRRfOolOuMJRWRRMa6keMHlFdXwdpAKQd8fs4qTVehS-wSXOn7Fxq3zTWYSn-6XvJJloLJNnUzlrHlyf6AyE3y6S0b8NvzVxktRoWmJenvIzD-Mc-hL3RHlnFYvLsDZlsYVggK8yhXtUleA',
        }
        openAuthPopups(options, function (e) {
          console.log(e)
        })
      } else {
        this.dialog = true
      }
    },
  },
}
</script>
