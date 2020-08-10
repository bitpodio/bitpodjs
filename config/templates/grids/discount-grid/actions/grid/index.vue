<template>
  <div>
    <MakeCopy />
  </div>
</template>

<script>
import MakeCopy from './make-copy.vue'
export default {
  components: {
    MakeCopy,
  },
  data() {
    return {
      content: null,
    }
  },
  created() {},
}
</script>
