<template>
  <div>
    <div v-if="item.isShowField === true">
      <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
    </div>
    <div v-else>
      <v-icon color="error">mdi-checkbox-blank-outline</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
}
</script>
