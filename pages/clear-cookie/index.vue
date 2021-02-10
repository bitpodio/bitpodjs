<template>
  <div>Hello</div>
</template>
<script>
export default {
  mounted() {
    console.log('on mounted in clear-cookie')
    window.addEventListener('message', this.messageReceived, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageReceived)
  },
  methods: {
    messageReceived(e) {
      console.log('message received in clear cookie1', e)
      console.log('message received in clear cookie', e.data)
      if (e.data !== '') {
        console.log('got data in message received in clear cookie', e.data)
        e.data.split(';').forEach((c) => {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(
              /=.*/,
              '=;expires=' + new Date(0).toUTCString() + ';path=/'
            )
        })
        e.data.split(';').forEach((c) => {
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
