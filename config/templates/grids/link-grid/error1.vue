<template>
  <div>custom {{ errorMessage }}</div>
</template>

<script>
export default {
  props: {
    error: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      errorMessage: 'error message',
    }
  },
}
</script>
