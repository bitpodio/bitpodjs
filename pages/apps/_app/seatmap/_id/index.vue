<template>
  <div>
    <iframe id="seatmap-iframe" :src="iframe.src" @load="load()" />
    <v-snackbar v-model="snackbar" :timeout="timeout" top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
  </div>
</template>
<script>
import { getApiUrl, getCurrentOrigin } from '~/utility'
const layoutWithType = {
  shapes: [],
  groups: {
    gold: {
      color: '#FCB900',
      label: 'Gold',
      data: {
        price: 100,
      },
    },
    silver: {
      color: '#00D084',
      label: 'Silver',
      data: {
        price: 100,
      },
    },
    platinum: {
      color: '#FF6900',
      label: 'Platinum',
      data: {
        price: 100,
      },
    },
  },
}

export default {
  layout: 'seatmap',
  data() {
    const seatmapUrl = getCurrentOrigin()
    return {
      snackbarText: '',
      snackbar: false,
      timeout: 1000,
      seatmapData: null,
      loading: false,
      iframe: { src: `${seatmapUrl}/seatmap`, loaded: false },
    }
  },
  mounted() {
    window.addEventListener('message', this.onMessage, false)
  },
  created() {
    if (this.$route.params.id && this.$route.params.id !== 'new') {
      this.loadSeatmap()
    }
  },
  beforeDestroy() {
    window.removeEventListener('message', this.onMessage, false)
  },
  methods: {
    async onMessage(event) {
      const eventData = event.data
      if (eventData) {
        const { event, data } = eventData
        switch (event) {
          case 'save':
            {
              const { layout } = data
              const url = getApiUrl()
              const seatmapId =
                this.$route.params.id === 'new' ? '' : this.$route.params.id
              layout.Name = layout.layoutProperties.seatMapName || 'untitled'
              try {
                await this.$axios.$patch(
                  `${url}SeatMaps/${seatmapId || ''}`,
                  layout
                )
                this.snackbarText = 'Seatmap Updated Successfully'
                this.snackbar = true
              } catch (e) {
                console.error(
                  `Error while updating seatmap with ${this.$route.params.id}`,
                  e
                )
              }
            }
            break
          case 'close':
            break
        }
      }
    },
    load() {
      this.iframe.loaded = true
      if (this.seatmapData) {
        this.sendMessage(this.seatmapData)
      }
      if (!this.$route.params.id || this.$route.params.id === 'new') {
        this.sendMessage(layoutWithType)
      }
    },
    sendMessage(seatmapData) {
      const layoutInfo = {
        event: 'data',
        data: {
          layout: seatmapData,
        },
      }
      document
        .getElementById('seatmap-iframe')
        .contentWindow.postMessage(layoutInfo, '*')
    },
    async loadSeatmap() {
      let res = null
      const url = getApiUrl()
      const seatmapId = this.$route.params.id
      try {
        res = await this.$axios.get(`${url}SeatMaps/${seatmapId || ''}`)
        this.seatmapData = res.data
      } catch (e) {
        console.error(
          `Error while fetching seatmap with ${this.$route.params.id}`,
          e
        )
      }
    },
  },
}
</script>
<style scoped>
iframe {
  width: 100%;
  height: calc(100vh - 60px);
  border: none;
}
</style>
