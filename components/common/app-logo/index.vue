<template>
  <span class="bitpod-logo logo-ds px-3">
    <a href="/admin/apps/event/eventboard">
      <v-img
        v-if="!toggleFallbackImage"
        :src="$config.cdnUri + getDomain() + getSubDomain() + '/logo.svg'"
        class="logofull mr-2"
        @error="setAltImg"
      ></v-img>
      <v-img
        v-else
        :src="$config.cdnUri + 'bitpod-logo-blk2.svg'"
        class="logofull mr-2"
      ></v-img>
    </a>
  </span>
</template>
<script>
export default {
  props: {
    source: { type: String, default: '' },
  },
  data() {
    return {
      toggleFallbackImage: false,
    }
  },
  methods: {
    setAltImg() {
      this.toggleFallbackImage = true
    },
    getDomain() {
      if (process.client) {
        if (window && window.location) {
          const url = window.location.hostname.split('.').slice(-2).join('.')
          return url
        }
      }
    },
    getSubDomain() {
      if (process.client) {
        if (window && window.location) {
          const suburl = window.location.hostname.split('.')[0]
          const getSubDomain = suburl.split('-')[1]
          return getSubDomain ? '/' + getSubDomain : ''
        }
      }
    },
  },
}
</script>
