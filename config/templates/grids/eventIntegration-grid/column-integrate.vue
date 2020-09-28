<template>
  <div>
    <v-menu left :offset-y="offset" transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon small v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item v-if="status != 'Connected'" @click="dialog = true">
          <v-list-item-content>
            <v-list-item-title>Setup</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="status === 'Connected'" @click="dialog = true">
          <v-list-item-content>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="status === 'Connected'" @click="onDelete()">
          <v-list-item-content>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
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
      status: this.item.Status,
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
