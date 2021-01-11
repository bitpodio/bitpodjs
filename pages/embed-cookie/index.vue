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
      e.data.split('; ').map((i) => {
        document.cookie = i
      })
      window.parent.postMessage('success', '*')
    },
  },
}
</script>
