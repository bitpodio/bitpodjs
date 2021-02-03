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
      console.log('message received in embed cookie', e.data)
      if (e.data !== '') {
        e.data.split(';').map((i) => {
          const newCookie = i.trim() + '; path=/'
          document.cookie = newCookie.includes(
            `auth.redirect=${this.$config.basePublicPath}/get-started`
          )
            ? ''
            : newCookie
        })
        window.parent.postMessage('success', '*')
      }
    },
  },
}
</script>
