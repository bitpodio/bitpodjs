<template>
  <div>
    <iframe
      id="print"
      ref="iframe"
      style="width: 0; position: absolute; height: 0;"
      :src="`https://${orgName}-${$config.axios.backendBaseUrl}${$config.basePublicPath}/embed-cookie`"
      @load="iframeLoaded"
    >
    </iframe>
  </div>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
export default {
  data() {
    return {
      orgName: '',
      loadIframe: false,
    }
  },
  beforeMount() {
    const domain = this.$route.query.targetDomain
    if (domain) {
      this.orgName = domain
      this.loadIframe = true
    }
  },
  mounted() {
    window.addEventListener('message', this.messageReceived, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageReceived)
  },
  methods: {
    iframeLoaded() {
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
    },
    messageReceived(e) {
      if (e.data === 'success') {
        location.href = `https://${this.orgName}-${this.$config.axios.backendBaseUrl}${this.$config.basePublicPath}${nuxtconfig.auth.redirect.home}`
      }
    },
  },
}
</script>
