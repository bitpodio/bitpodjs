<template>
  <div>
    <v-btn text small @click="dynamicnavdialog = true">
      Setup
    </v-btn>
    <v-dialog
      v-model="dynamicnavdialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <div>
        <component :is="serviceForm || null" :on-close="onClose" />
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { templateLoaderMixin } from '~/utility'
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
  },
  data() {
    return {
      serviceId: this.item.ServiceId,
      dynamicnavdialog: false,
      bitpodCRMdialog: false,
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
      this.dynamicnavdialog = false
    },
  },
}
</script>
