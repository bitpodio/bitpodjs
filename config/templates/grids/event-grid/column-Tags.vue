<template>
  <div class="text-truncate">
    <v-chip v-for="Tags in value" :key="Tags" small class="ma-1">
      {{ Tags }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
}
</script>
