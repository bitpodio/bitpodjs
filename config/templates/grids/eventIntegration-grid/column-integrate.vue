<template>
  <div>
    <v-btn text small @click="onClick(serviceId)">
      Setup
    </v-btn>

    <dynamicnav :dynamicnavdialog.sync="dynamicnavdialog" />
    <bitpodCRM :bitpod-c-r-mdialog.sync="bitpodCRMdialog" />
  </div>
</template>

<script>
import dynamicnav from './dynamicnav.vue'
import bitpodCRM from './bitpodcrm.vue'
export default {
  components: {
    dynamicnav,
    bitpodCRM,
  },
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

  methods: {
    onClick(serviceId) {
      debugger
      if (serviceId === 'dynamicNAV') {
        this.dynamicnavdialog = true
      } else if (serviceId === 'bitpod') {
        this.bitpodCRMdialog = true
      }
    },
  },
}
</script>
