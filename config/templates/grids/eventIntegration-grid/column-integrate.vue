<template>
  <div>
    <v-btn v-if="status === ''" text @click="dialog = true">Setup</v-btn>
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
    debugger
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
      this.item={}
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
  },
}
</script>
