<template>
  <div>custom {{ errorMessage }}</div>
</template>

<script>
export default {
  props: ['error'],
  data() {
    return {
      errorMessage: 'error message',
    }
  },
}
</script>
