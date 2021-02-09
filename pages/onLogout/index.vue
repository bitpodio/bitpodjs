<template>
  <div>
    <iframe
      id="print"
      ref="iframe"
      :src="`https://${$config.axios.backendBaseUrl}${$config.basePublicPath}/embed-cookie`"
      @load="iframecookieDeleted"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('message', this.messageReceived, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageReceived)
  },
  methods: {
    iframecookieDeleted() {
      debugger
      console.log(
        'document.cookie that is passed to embed cookie',
        document.cookie
      )
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
      this.$apolloHelpers.onLogout()
      this.$auth.logout()
    },
    messageReceived(e) {
      console.log('message received from the the iframe', e.data)
      if (e.data === 'success') {
        this.$auth.logout()
        this.$apolloHelpers.onLogout()
      }
    },
  },
}
</script>
