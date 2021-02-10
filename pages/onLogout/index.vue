<template>
  <div>
    <iframe
      id="print"
      ref="iframe"
      style="width: 0; position: absolute; height: 0;"
      :src="`https://${$config.axios.backendBaseUrl}${$config.basePublicPath}/clear-cookie`"
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
      console.log(
        'document.cookie that is passed to clear cookie',
        document.cookie
      )
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
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
