<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="1000" :top="true">
      <div class="font-weight-regular text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <div v-if="jwtAcquired">
      <vue-jitsi-meet
        ref="jitsiRef"
        class="full-height full-width"
        :domain="getDomain"
        :options="jitsiOptions"
      ></vue-jitsi-meet>
    </div>
  </div>
</template>
<script>
import { JitsiMeet } from '@mycure/vue-jitsi-meet'
export default {
  layout: 'live',
  components: {
    VueJitsiMeet: JitsiMeet,
  },
  props: {
    eventId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      jwtAcquired: false,
      jwtToken: '',
      snackbar: false,
      snackbarText: '',
      participantsBackup: {},
      chatToken: '',
    }
  },
  computed: {
    getDomain() {
      return this.$config.integrationLinks.BITOPD_VIRTUAL_LINK
    },
    jitsiOptions() {
      return {
        roomName: this.$route.params.id,
        jwt: this.jwtToken,
        configOverwrite: {
          enableNoisyMicDetection: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          CHAT_TOKEN: this.authChatToken(),
          CHAT_CHANNEL: this.$route.query.o,
          RTMP_URL: this.$route.query.p,
        },
        onload: this.onIFrameLoad,
      }
    },
  },
  async mounted() {
    try {
      const res = await this.$axios.get(
        `${this.$bitpod.getApiUrl()}Events/getToken?room=${
          this.$route.params.id
        }`
      )
      this.jwtToken = res.data[1]
      this.jwtAcquired = true
    } catch (err) {
      console.error(`Error while fetching JWT`, err)
      this.snackbarText = this.$t('Messages.Success.FailedFetchToken')
    }
  },
  methods: {
    async authChatToken() {
      try {
        const url = `${this.$bitpod.getApiUrl()}Events/getChatToken?channelName=${
          this.$route.query.o
        }`
        const response = await this.$axios.get(url)
        if (response) {
          this.chatToken = response.data.authToken
          return this.chatToken
        }
      } catch (err) {
        console.error(`Error while fetching chat Token`, err)
      }
    },
    uploadComment(e, message) {
      const info = this.participantsBackup[e.id]
      const note = `${info.displayName || info.formattedDisplayName} ${
        info.email ? '[' + info.email + ']' : ''
      }has ${message} Room ${this.$route.params.id}`
      this.$axios.post(
        `${this.$bitpod.getApiUrl()}Events/${this.$route.query.e}/Comments`,
        {
          Notes: note,
        }
      )
    },
    onIFrameLoad() {
      const jitsi = this.$refs.jitsiRef
      if (this.$route.query.n) {
        jitsi.executeCommand('subject', this.$route.query.n)
      }
      jitsi.addEventListener('participantRoleChanged', (e) => {
        if (e.role === 'moderator') {
          // below line used for enable password in start live stream
          jitsi.executeCommand('password', this.$route.params.id.split('-')[2])
          jitsi.executeCommand('toggleLobby', true)
          jitsi.addEventListener('participantJoined', (e) => {
            this.participantsBackup = { ...jitsi.jitsiApi._participants }
            this.uploadComment(e, 'joined')
          })
          jitsi.addEventListener('participantKickedOut', (e) => {
            this.uploadComment(e, 'been kicked from')
            this.participantsBackup = { ...jitsi.jitsiApi._participants }
          })
          jitsi.addEventListener('participantLeft', (e) => {
            this.uploadComment(e, 'left')
            this.participantsBackup = { ...jitsi.jitsiApi._participants }
          })
        } else {
          jitsi.jitsiApi.removeEventListeners([
            'participantJoined',
            'participantLeft',
            'participantKickedOut',
          ])
        }
      })
    },
  },
}
</script>
<style>
.full-width {
  width: 100vw !important;
}
.full-height {
  height: 100vh !important;
}
</style>
