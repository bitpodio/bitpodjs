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
        this.$cookies.removeAll()
        window.parent.postMessage('success', '*')
      }
    },
  },
}
</script>
