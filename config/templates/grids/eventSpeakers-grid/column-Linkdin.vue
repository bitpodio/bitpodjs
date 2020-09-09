<template>
  <div>
    <div v-if="item.Linkdin">
      <v-icon @click="linkedin">mdi-linkedin</v-icon>
    </div>
    <div v-else>
      <v-icon></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  methods: {
    linkedin() {
      return `/${this.value}`
    },
  },
}
</script>
