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
export default {
  data() {
    return {
      orgName: '',
      loadIframe: false,
    }
  },
  beforeMount() {
    const domain = this.$route.query.targetDomain
    console.log('Found the target domain', domain)
    if (domain) {
      this.orgName = domain
      this.loadIframe = true
    }
  },
  mounted() {
    debugger
    window.addEventListener('message', this.messageReceived, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageReceived)
  },
  methods: {
    iframeLoaded() {
      console.log('all cookie while loading iframe', document.cookie)
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
    },
    messageReceived(e) {
      debugger
      console.log('in message received section', e)
      if (e.data === 'success') {
        console.log('inside setting cookies message received section', e.data)
        console.log('document cookie', document.cookie)
        location.href = `https://${this.orgName}-${this.$config.axios.backendBaseUrl}${this.$config.basePublicPath}/apps/event/list/Event/live-and-draft-event`
      }
    },
  },
}
</script>
