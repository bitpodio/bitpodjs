<template>
  <div>
    <v-autocomplete v-model="value" :items="items" single-line></v-autocomplete>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ['foo', 'bar', 'fizz', 'buzz'],
    isLoading: false,
    value: null,
    search: null,
  }),
}
</script>
