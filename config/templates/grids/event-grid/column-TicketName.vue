<template>
  <div>
    <v-chip
      v-for="value in value"
      :key="value"
      class="ma-2"
      small
      color="green"
      text-color="white"
      >{{ value }}</v-chip
    >
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
}
</script>
