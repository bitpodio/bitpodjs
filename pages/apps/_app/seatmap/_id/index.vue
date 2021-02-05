<template>
  <div>
    <iframe id="seatmap-iframe" :src="iframe.src" @load="load()" />
    <v-snackbar v-model="snackbar" :timeout="timeout" top="true" width="2px">
      <div class="fs-16 text-center">{{ snackbarText }}</div>
    </v-snackbar>
    <confirm ref="confirm"></confirm>
  </div>
</template>
<script>
const layoutWithType = {
  shapes: [],
  groups: {
    gold: {
      color: '#FCB900',
      label: 'Gold',
      price: 100,
      data: {
        price: 100,
      },
    },
    silver: {
      color: '#00D084',
      label: 'Silver',
      price: 100,
      data: {
        price: 100,
      },
    },
    platinum: {
      color: '#FF6900',
      label: 'Platinum',
      price: 100,
      data: {
        price: 100,
      },
    },
  },
}

export default {
  layout: 'seatmap',
  data() {
    const seatmapUrl = this.$bitpod.getApiUrl().replace('svc/api/', '')
    return {
      snackbarText: '',
      snackbar: false,
      timeout: 1000,
      seatmapData: null,
      loading: false,
      iframe: { src: `${seatmapUrl}seatmap`, loaded: false },
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
              const url = this.$bitpod.getApiUrl()
              const seatmapId =
                this.$route.params.id === 'new' ? '' : this.$route.params.id
              layout.Name = layout.layoutProperties.seatMapName || 'untitled'
              try {
                const res = await this.$axios.$patch(
                  `${url}SeatMaps/${seatmapId || ''}`,
                  layout
                )
                if (res) {
                  this.snackbarText = this.$t(
                    'Messages.Success.SeatmapUpdateSuccess'
                  )
                  this.snackbar = true
                  if (this.$route.params.id === 'new') {
                    this.updateEvent(eventData, res)
                  }
                }
                this.snackbarText = this.$t(
                  'Messages.Success.SeatmapUpdateSuccess'
                )
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
            // eslint-disable-next-line no-lone-blocks
            {
              if (eventData.data.dirtyCheck) {
                const confirmRes = await this.$refs.confirm.open(
                  this.$t('Messages.Warn.SeatMapDefault'),
                  this.$t('Messages.Warn.SeatMapWarning'),
                  { color: 'warning' }
                )
                if (confirmRes) {
                  this.closeSeatMap()
                }
              } else {
                this.$eventBus.$emit('seat-map-triggered')
                this.$router.back()
              }
            }
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
      const url = this.$bitpod.getApiUrl()
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
    async updateEvent(eventData, response) {
      const layoutId = response.id
      let obj = {}
      let URL = ''
      if (this.$route.query.event) {
        obj = {
          LayoutId: layoutId,
          SeatReservation: true,
        }
        URL = `${this.$bitpod.getApiUrl()}Events/${this.$route.query.event}`
      } else {
        obj = {
          LayoutId: layoutId,
        }
        URL = `${this.$bitpod.getApiUrl()}Locations/${
          this.$route.query.location
        }`
      }
      try {
        const res = await this.$axios.$patch(URL, obj)
        if (res) {
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateEvent context: EventId:-${this.$route.params.id} \n URL:- ${URL} \n Object:- ${obj}`,
          e
        )
      }
    },
    closeSeatMap() {
      this.$router.back()
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
