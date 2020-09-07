<template>
  <div>
    <div v-if="item.Twitter">
      <v-icon @click="twitter">mdi-twitter</v-icon>
    </div>
    <div v-else>
      <v-icon></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  computed: {
    twitter() {
      return `/${this.value}`
    },
  },
}
</script>
