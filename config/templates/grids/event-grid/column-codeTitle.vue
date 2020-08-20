<template>
  <div>
    <v-chip class="ma-2" small color="green" text-color="white">
      {{ value }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  computed: {},
}
</script>
