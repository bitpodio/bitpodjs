<template>
  <div>Hello</div>
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
    messageReceived(e) {
      console.log('message received in clear cookie', e.data)
      if (e.data) {
        console.debug('got data in message received in clear cookie', e.data)
        document.cookie.split(';').forEach((c) => {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(
              /=.*/,
              '=;expires=' + new Date(0).toUTCString() + ';path=/'
            )
        })
        document.cooke.split(';').forEach((c) => {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(
              /=.*/,
              '=;expires=' +
                new Date(0).toUTCString() +
                `;path=${this.$config.basePublicPath}`
            )
        })
        localStorage.clear()
        window.parent.postMessage('success', '*')
      }
    },
  },
}
</script>
