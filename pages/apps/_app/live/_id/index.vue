<template>
  <div>
    <h1>Bitpod Meet</h1>
    <vue-jitsi-meet
      ref="jitsiRef"
      class="full-height full-width"
      domain="meet.bitpod.io"
      :options="jitsiOptions"
    ></vue-jitsi-meet>
  </div>
</template>

<script>
import { JitsiMeet } from '@mycure/vue-jitsi-meet'
export default {
  components: {
    VueJitsiMeet: JitsiMeet,
  },
  computed: {
    jitsiOptions() {
      return {
        roomName: this.$route.params.id,
        jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaHR0cHM6L2dyYXZhdGFyLmNvbS9hdmF0YXIvYWJjMTIzIiwibmFtZSI6IkFkYXJzaCBTaW5naCIsImVtYWlsIjoibG9rZXNoQGJpdHBvZC5pbyIsImlkIjoibXlpZCJ9fSwiYXVkIjoiYml0cG9kIiwiaXNzIjoiQTk3QUM1QUJGREZFMyIsInN1YiI6Im1lZXQuYml0cG9kLmlvIiwicm9vbSI6IioiLCJleHAiOjE2MDUwMDY5MjN9.3EX-ij2figu8y3_MK0sDHpPe3fnpekdZ_j2mjdBs4Fk',
        // noSSL: false,
        // userInfo: {
        //   email: 'user@email.com',
        //   displayName: '',
        // },
        configOverwrite: {
          enableNoisyMicDetection: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
        },
        onload: this.onIFrameLoad,
      }
    },
  },
  methods: {
    onIFrameLoad() {
      // do stuff
    },
  },
}
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.full-width {
  width: 100vw;
}
.full-height {
  height: 500px;
}
</style>
