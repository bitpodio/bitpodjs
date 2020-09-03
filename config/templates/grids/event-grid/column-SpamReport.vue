<template>
  <div>
    <div v-if="item.SpamReport === true">
      <v-icon>mdi-information-outline</v-icon>
    </div>
    <div v-else>
      <v-icon></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
}
</script>
