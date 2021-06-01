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
  head: {
    title: 'Event',
  },
}
</script>
