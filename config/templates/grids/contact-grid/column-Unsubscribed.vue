<template>
  <div>
    <div v-if="item.Unsubscribed === true">
      <v-icon>mdi-emoticon-sad</v-icon>
    </div>
    <div v-else>
      <v-icon></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  computed: {},
}
</script>
