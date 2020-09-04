<template>
  <div>
    <div v-if="item.isRegistered === true">
      <v-icon>mdi-thumb-up-outline</v-icon>
    </div>
    <div v-else>
      <v-icon color="error"></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
}
</script>
