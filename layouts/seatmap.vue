<template>
  <div class="seatmap">
    <adminLayout :sidebar="false" />
  </div>
</template>

<script>
import adminLayout from '~/components/admin'
export default {
  components: {
    adminLayout,
  },
}
</script>

<style scoped>
.seatmap .container.container--fluid {
  padding: 0;
}
</style>
