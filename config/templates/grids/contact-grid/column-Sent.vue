<template>
  <div>
    <div v-if="item.Sent === true">
      <v-icon>mdi-email-outline</v-icon>
    </div>
    <div v-else>
      <v-icon>mdi-email-outline</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  computed: {},
}
</script>
