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
      e.data.split(';').map((i) => {
        const newCookie = i.trim() + '; path=/'
        document.cookie = newCookie
      })
      window.parent.postMessage('success', '*')
    },
  },
}
</script>
