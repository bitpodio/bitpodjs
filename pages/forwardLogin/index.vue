<template>
  <div>
    <p>This is an iframe section forwarded</p>
    <iframe
      id="print"
      ref="iframe"
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
    }
  },
  beforeMount() {
    const domain = this.$route.query.targetDomain
    console.log('Found the target domain', domain)
    if (domain) {
      this.orgName = domain
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
      document.cookie = 'bitpodUrl=test123333'
    //   document.getElementById('')
    //   this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
    },
    // messageReceived(e) {
    //   debugger
    //   console.log('in message received section', e)
    //   if (e.data === 'success') {
    //     console.log('inside setting cookies message received section', e.data)
    //     console.log('document cookie', document.cookie)
    //     location.href = `https://${this.orgName}-${this.$config.axios.backendBaseUrl}${this.$config.basePublicPath}/apps/event/list/Event/live-and-draft-event`
    //     // https://event.test.bitpod.io/forwardLogin
    //   }
    // },
  },
}
</script>
