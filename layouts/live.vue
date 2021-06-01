<template>
  <div>
    <jitsi />
  </div>
</template>
<script>
import jitsi from '../pages/apps/_app/live/_id'
export default {
  layout: 'live',
  components: {
    jitsi,
  },
  head() {
    return {
      title: this.$t('Common.AppTitle') + ' ' + this.$t('Common.Bitpod'),
    }
  },
}
</script>
